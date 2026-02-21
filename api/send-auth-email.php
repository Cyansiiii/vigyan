<?php
/**
 * 📧 VIGYAN.PREP EMAIL GATEWAY (Hostinger)
 * Secure endpoint to proxy email requests from Railway (Node.js) to Hostinger native mail().
 * Avoids SMTP blocks entirely by using the local mail server.
 */

// Disable error display to prevent JSON corruption
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_error.log');

// CORS configuration (in case it's hit directly)
header('Access-Control-Allow-Origin: https://api.vigyanprep.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Vigyan-Timestamp, X-Vigyan-Signature');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// 1. CONFIGURATION
// Note: We avoid loading heavy Dotenv libraries here. We assume the secret is injected via Hostinger env.
$GATEWAY_SECRET = $_ENV['EMAIL_GATEWAY_SECRET'] ?? getenv('EMAIL_GATEWAY_SECRET');
$SUPPORT_EMAIL = "support@vigyanprep.com";
$FROM_EMAIL = "noreply@vigyanprep.com";

// 2. SECURITY VALIDATION
$headers = getallheaders();
$timestamp = isset($headers['X-Vigyan-Timestamp']) ? (int)$headers['X-Vigyan-Timestamp'] : 0;
$signature = isset($headers['X-Vigyan-Signature']) ? $headers['X-Vigyan-Signature'] : '';

// A. Check Timestamp Drift (±5 minutes)
$currentTime = time();
if (abs($currentTime - $timestamp) > 300) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Timestamp expired or invalid drift.']);
    exit;
}

// B. Check HMAC Signature
$rawBody = file_get_contents('php://input');
$expectedSignature = hash_hmac('sha256', $rawBody, $GATEWAY_SECRET);

if (!hash_equals($expectedSignature, $signature)) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Invalid signature verification failed.']);
    exit;
}

// 3. PARSE REQUEST
$data = json_decode($rawBody, true);
if (!$data || !isset($data['to']) || !isset($data['subject']) || !isset($data['html'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid payload format.']);
    exit;
}

// 4. PREPARE NATIVE MAIL() HEADERS
$to = filter_var($data['to'], FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars($data['subject']);
$emailHtml = $data['html'];

// Strict headers for native mail()
$mailHeaders = "MIME-Version: 1.0\r\n";
$mailHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";
$mailHeaders .= "From: Vigyan.prep Admin <" . $FROM_EMAIL . ">\r\n";
$mailHeaders .= "Reply-To: " . $SUPPORT_EMAIL . "\r\n";
$mailHeaders .= "X-Mailer: PHP/" . phpversion();

// Use -f parameter to set Envelope Sender (critical for Hostinger delivery)
$params = "-f " . $FROM_EMAIL;

// 5. SEND EMAIL AND LOG
$logFile = __DIR__ . '/email_delivery.log';
$logEntry = date('[Y-m-d H:i:s] ') . "Auth Reset Email -> $to... ";

if (mail($to, $subject, $emailHtml, $mailHeaders, $params)) {
    $logEntry .= "SUCCESS\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND);
    http_response_code(200);
    echo json_encode(['success' => true]);
} else {
    $error = error_get_last()['message'] ?? 'Native mail() function failed internally';
    $logEntry .= "FAILED: $error\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND);
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $error]);
}
?>
