<?php
header("Access-Control-Allow-Origin: https://vigyanprep.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Upload-Signature, X-Upload-Timestamp");
header("Content-Type: application/json");

// Load Environment Variables (for Secret)
require __DIR__ . '/vendor/autoload.php';
use Dotenv\Dotenv;

if (file_exists(__DIR__ . '/.env')) {
    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();
}

$GATEWAY_SECRET = $_ENV['EMAIL_GATEWAY_SECRET'] ?? 'fallback_secret_change_me';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit;
}

// 🛡️ SECURITY CHECK: HMAC Signature
$signature = $_SERVER['HTTP_X_UPLOAD_SIGNATURE'] ?? '';
$timestamp = $_SERVER['HTTP_X_UPLOAD_TIMESTAMP'] ?? '';

if (empty($signature) || empty($timestamp)) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Auth headers missing']);
    exit;
}

// Check timestamp drift (5 mins)
if (abs(time() - (int)$timestamp) > 300) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Request expired']);
    exit;
}

$expectedSignature = hash_hmac('sha256', $timestamp, $GATEWAY_SECRET);
if (!hash_equals($expectedSignature, $signature)) {
    http_response_code(403);
    echo json_encode(['success' => false, 'error' => 'Invalid signature']);
    exit;
}

// 📁 FILE UPLOAD LOGIC
if (!isset($_FILES['image'])) {
    echo json_encode(['success' => false, 'error' => 'No image file uploaded']);
    exit;
}

$file = $_FILES['image'];
$fileName = $file['name'];
$fileTmp = $file['tmp_name'];
$fileSize = $file['size'];
$fileError = $file['error'];

// Validate extension
$ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
$allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

if (!in_array($ext, $allowed)) {
    echo json_encode(['success' => false, 'error' => 'Invalid file type. Allowed: ' . implode(', ', $allowed)]);
    exit;
}

// Max 5MB
if ($fileSize > 5 * 1024 * 1024) {
    echo json_encode(['success' => false, 'error' => 'File too large (max 5MB)']);
    exit;
}

if ($fileError !== 0) {
    echo json_encode(['success' => false, 'error' => 'Upload error: ' . $fileError]);
    exit;
}

// Generate unique filename
$newFileName = 'q_' . bin2hex(random_bytes(8)) . '_' . time() . '.' . $ext;
$uploadDir = __DIR__ . '/../uploads/questions/';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$targetPath = $uploadDir . $newFileName;

if (move_uploaded_file($fileTmp, $targetPath)) {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $baseUrl = $protocol . "://" . $_SERVER['HTTP_HOST'];
    $imageUrl = $baseUrl . "/uploads/questions/" . $newFileName;
    
    echo json_encode([
        'success' => true,
        'message' => 'Image uploaded successfully',
        'url' => $imageUrl
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to save file on server']);
}
