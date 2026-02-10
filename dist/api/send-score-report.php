<?php
/**
 * NISER Score Report Email Sender
 * Uses PHPMailer for reliable SMTP delivery
 */

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/email_error.log');

// CORS headers
header('Access-Control-Allow-Origin: https://vigyanprep.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'POST required']);
    exit;
}

// Load PHPMailer classes manually
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit;
}

// Extract data
$name = htmlspecialchars($input['name'] ?? 'Student');
$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$examYear = htmlspecialchars($input['examYear'] ?? '2025');
$sectionScores = $input['sectionScores'] ?? [];
$meritScore = intval($input['meritScore'] ?? 0);
$totalScore = intval($input['totalScore'] ?? 0);
$totalCorrect = intval($input['totalCorrect'] ?? 0);
$totalWrong = intval($input['totalWrong'] ?? 0);
$totalQuestions = intval($input['totalQuestions'] ?? 80);

if (!$email) {
    echo json_encode(['success' => false, 'message' => 'Valid email required']);
    exit;
}

// Build section rows (same HTML logic as before)
$sectionRows = '';
$sections = ['Biology', 'Chemistry', 'Physics', 'Mathematics'];
foreach ($sections as $s) {
    $data = $sectionScores[$s] ?? ['score' => 0, 'correct' => 0, 'wrong' => 0];
    $score = intval($data['score']);
    $correct = intval($data['correct']);
    $wrong = intval($data['wrong']);
    $scoreColor = $score >= 0 ? '#059669' : '#dc2626';
    $scorePrefix = $score >= 0 ? '+' : '';
    
    $sectionRows .= "
        <tr>
            <td style='padding: 12px 15px; border-bottom: 1px solid #e5e7eb; font-size: 14px;'>$s</td>
            <td style='padding: 12px 15px; border-bottom: 1px solid #e5e7eb; text-align: center; font-weight: 600; color: $scoreColor;'>$scorePrefix$score</td>
            <td style='padding: 12px 15px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #059669;'>✓ $correct</td>
            <td style='padding: 12px 15px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #dc2626;'>✗ $wrong</td>
        </tr>
    ";
}

$skipped = $totalQuestions - $totalCorrect - $totalWrong;
$year = date('Y');

// HTML Template
$emailHtml = <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: #0d0d0d; padding: 25px 40px; border-bottom: 3px solid #d4af37;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: left;">
                                        <span style="font-family: 'Georgia', serif; font-size: 28px; font-weight: 400; letter-spacing: 2px; color: #d4af37;">VIGYAN</span><span style="font-family: 'Georgia', serif; font-size: 20px; font-weight: 300; color: #9ca3af;">.prep</span>
                                    </td>
                                    <td style="text-align: right;">
                                        <span style="font-size: 11px; color: #6b7280; letter-spacing: 1px;">SCORE REPORT</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Score Hero -->
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(180deg, #fefce8 0%, #ffffff 100%);">
                            <p style="margin: 0 0 5px 0; color: #92400e; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">🎯 Your NISER $examYear Score Report</p>
                            <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 500;">Hello, <strong>$name</strong>!</h2>
                            
                            <!-- Merit Score Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 3px solid #d4af37; border-radius: 12px; margin-bottom: 10px;">
                                <tr>
                                    <td style="padding: 30px; text-align: center;">
                                        <p style="margin: 0 0 8px 0; color: #92400e; font-size: 11px; font-weight: 700; letter-spacing: 2px;">⭐ Merit Score (Best 3 Subjects)</p>
                                        <p style="margin: 0; font-size: 56px; font-weight: 900; color: #78350f;">$meritScore<span style="font-size: 24px; font-weight: 400; color: #92400e;">/180</span></p>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin: 0; font-size: 13px; color: #6b7280;">Total Score (All 4 Subjects): <strong>$totalScore</strong></p>
                        </td>
                    </tr>

                    <!-- Subject Breakdown -->
                    <tr>
                        <td style="padding: 20px 40px 30px;">
                            <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px; font-weight: 600;">📊 Subject-wise Breakdown</h3>
                            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                                <tr style="background: #f9fafb;">
                                    <th style="padding: 12px 15px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280;">Subject</th>
                                    <th style="padding: 12px 15px; text-align: center; font-size: 12px; font-weight: 600; color: #6b7280;">Score</th>
                                    <th style="padding: 12px 15px; text-align: center; font-size: 12px; font-weight: 600; color: #6b7280;">Correct</th>
                                    <th style="padding: 12px 15px; text-align: center; font-size: 12px; font-weight: 600; color: #6b7280;">Wrong</th>
                                </tr>
                                $sectionRows
                            </table>
                            
                            <!-- Stats -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 15px;">
                                <tr>
                                    <td style="padding: 10px; text-align: center; background: #ecfdf5; border-radius: 8px;">
                                        <p style="margin: 0; font-size: 20px; font-weight: 700; color: #059669;">$totalCorrect</p>
                                        <p style="margin: 2px 0 0 0; font-size: 11px; color: #047857;">Correct</p>
                                    </td>
                                    <td style="width: 10px;"></td>
                                    <td style="padding: 10px; text-align: center; background: #fef2f2; border-radius: 8px;">
                                        <p style="margin: 0; font-size: 20px; font-weight: 700; color: #dc2626;">$totalWrong</p>
                                        <p style="margin: 2px 0 0 0; font-size: 11px; color: #b91c1c;">Wrong</p>
                                    </td>
                                    <td style="width: 10px;"></td>
                                    <td style="padding: 10px; text-align: center; background: #f3f4f6; border-radius: 8px;">
                                        <p style="margin: 0; font-size: 20px; font-weight: 700; color: #6b7280;">$skipped</p>
                                        <p style="margin: 2px 0 0 0; font-size: 11px; color: #4b5563;">Skipped</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- CTA -->
                    <tr>
                        <td style="padding: 0 40px 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%); border-radius: 12px;">
                                <tr>
                                    <td style="padding: 30px; text-align: center;">
                                        <p style="margin: 0 0 8px 0; color: #c7d2fe; font-size: 11px; font-weight: 600; letter-spacing: 2px;">🚀 Want to Improve?</p>
                                        <h3 style="margin: 0 0 10px 0; color: #ffffff; font-size: 22px; font-weight: 700;">Get the Complete NISER Test Series</h3>
                                        <p style="margin: 0 0 20px 0; color: #a5b4fc; font-size: 14px;">10+ Full-Length Mock Tests with Detailed Solutions</p>
                                        <a href="https://vigyanprep.com/testfirstpage.html" style="display: inline-block; background: #d4af37; color: #000000; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-weight: 700; font-size: 16px;">BUY NOW @ ₹199 →</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #f9fafb; padding: 25px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280;">Keep practicing and aim for excellence!</p>
                            <p style="margin: 0; font-size: 11px; color: #9ca3af;">© $year Vigyan.prep • All rights reserved</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;

// Send email using mail() - Hostinger's built-in
$to = $email;
$subject = "🎯 Your NISER $examYear Score Report - Merit: $meritScore/180";
// Email headers
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Vigyan.prep Exams <noreply@vigyanprep.com>\r\n";
$headers .= "Reply-To: noreply@vigyanprep.com\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Use -f parameter to set Envelope Sender (critical for delivery)
$params = "-f noreply@vigyanprep.com";

// Logging
$logFile = __DIR__ . '/email.log';
$logEntry = date('[Y-m-d H:i:s] ') . "Attempting to send to $to... ";

if (mail($to, $subject, $emailHtml, $headers, $params)) {
    $logEntry .= "SUCCESS\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND);
    echo json_encode(['success' => true, 'message' => 'Score report sent', 'email' => $email]);
} else {
    $error = error_get_last()['message'] ?? 'Unknown error';
    $logEntry .= "FAILED: $error\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND);
    echo json_encode(['success' => false, 'message' => 'Email sending failed', 'error' => $error]);
}
?>
