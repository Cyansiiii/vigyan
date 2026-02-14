<?php
/**
 * 📧 VIGYAN.PREP EMAIL GATEWAY (Hostinger)
 * Secure endpoint to proxy email requests from Railway (Node.js) to Hostinger (SMTP).
 */

// Load .env variables if vendor/autoload.php exists
if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    require_once __DIR__ . '/../vendor/autoload.php';
    if (class_exists('Dotenv\Dotenv')) {
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
        $dotenv->safeLoad();
    }
}

// Disable error display to prevent JSON corruption
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_error.log');

header('Content-Type: application/json');

// 1. CONFIGURATION
$GATEWAY_SECRET = $_ENV['EMAIL_GATEWAY_SECRET'] ?? getenv('EMAIL_GATEWAY_SECRET');
$SMTP_CONFIG = [
    'host' => ($_ENV['EMAIL_HOST'] ?? getenv('EMAIL_HOST')) ?: 'smtp.hostinger.com',
    'port' => ($_ENV['EMAIL_PORT'] ?? getenv('EMAIL_PORT')) ?: 465,
    'user' => ($_ENV['EMAIL_USER'] ?? getenv('EMAIL_USER')) ?: 'noreply@vigyanprep.com',
    'pass' => $_ENV['EMAIL_PASSWORD'] ?? getenv('EMAIL_PASSWORD'),
];

if (!$GATEWAY_SECRET || !$SMTP_CONFIG['pass']) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Critical server configuration missing.', 'debug_env' => count($_ENV)]);
    exit;
}

// 2. PHPMailer Inclusion
// Assuming PHPMailer is installed via composer or uploaded in a 'PHPMailer' folder
// Modify the path as needed for your specific Hostinger setup
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (file_exists(__DIR__ . '/PHPMailer/Exception.php')) {
    require __DIR__ . '/PHPMailer/Exception.php';
    require __DIR__ . '/PHPMailer/PHPMailer.php';
    require __DIR__ . '/PHPMailer/SMTP.php';
} else if (file_exists(__DIR__ . '/PHPMailer/src/Exception.php')) {
    require __DIR__ . '/PHPMailer/src/Exception.php';
    require __DIR__ . '/PHPMailer/src/PHPMailer.php';
    require __DIR__ . '/PHPMailer/src/SMTP.php';
} else if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    require __DIR__ . '/../vendor/autoload.php';
}

// 3. SECURITY VALIDATION
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

// 4. PARSE REQUEST
$data = json_decode($rawBody, true);
if (!$data || !isset($data['to']) || !isset($data['subject']) || !isset($data['html'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid payload format.']);
    exit;
}

// 5. SEND EMAIL
try {
    $mail = new PHPMailer(true);
    
    // Server settings
    $mail->isSMTP();
    $mail->Host       = $SMTP_CONFIG['host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $SMTP_CONFIG['user'];
    $mail->Password   = $SMTP_CONFIG['pass'];
    $mail->SMTPSecure = $SMTP_CONFIG['port'] == 465 ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $SMTP_CONFIG['port'];

    // Recipients
    $mail->setFrom($SMTP_CONFIG['user'], 'Vigyan.prep Exams');
    $mail->addAddress($data['to']);
    
    // Content
    $mail->isHTML(true);
    $mail->Subject = $data['subject'];
    $mail->Body    = $data['html'];
    $mail->AltBody = strip_tags($data['html']);

    $mail->send();
    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => "Mailer Error: {$mail->ErrorInfo}"]);
}
