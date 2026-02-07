import nodemailer from "nodemailer";

// Create Nodemailer transporter with Hostinger SMTP
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.EMAIL_PORT) || 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Verify transporter on load
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    transporter.verify((error, success) => {
        if (error) {
            console.error('❌ Email transporter (examReport) verification failed:', error.message);
        } else {
            console.log('✅ Email server ready for score reports');
        }
    });
}

/**
 * Send NISER Exam Score Report via Email
 * POST /api/exam/send-report
 */
export const sendScoreReport = async (req, res) => {
    console.log('📧 ========== SCORE REPORT EMAIL REQUEST ==========');

    try {
        const { name, email, examYear, sectionScores, meritScore, totalScore, totalCorrect, totalWrong, totalQuestions } = req.body;

        // Validate required fields
        if (!name || !email || !email.includes('@')) {
            return res.status(400).json({ success: false, message: 'Valid name and email required' });
        }

        if (!sectionScores || typeof sectionScores !== 'object') {
            return res.status(400).json({ success: false, message: 'Section scores required' });
        }

        console.log(`📧 Sending score report to: ${email}`);
        console.log(`   Name: ${name}`);
        console.log(`   Exam Year: ${examYear}`);
        console.log(`   Merit Score: ${meritScore}`);

        // Build section rows for email
        const sections = ['Biology', 'Chemistry', 'Physics', 'Mathematics'];
        const sectionRows = sections.map(s => {
            const data = sectionScores[s] || { score: 0, correct: 0, wrong: 0 };
            const totalQ = data.correct + data.wrong + (20 - data.correct - data.wrong); // Assuming 20 questions per section
            return `
        <tr>
          <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb; font-size: 14px;">${s}</td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb; text-align: center; font-weight: 600; color: ${data.score >= 0 ? '#059669' : '#dc2626'};">${data.score >= 0 ? '+' : ''}${data.score}</td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #059669;">✓ ${data.correct}</td>
          <td style="padding: 12px 15px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #dc2626;">✗ ${data.wrong}</td>
        </tr>
      `;
        }).join('');

        // Branded HTML Email Template
        const emailHtml = `
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
                    
                    <!-- Header with Gold Accent -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%); padding: 35px 40px; text-align: center; border-bottom: 4px solid #d4af37;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 1px;">VIGYAN<span style="color: #d4af37; font-weight: 300; font-size: 20px;">.prep</span></h1>
                            <p style="margin: 10px 0 0 0; color: #94a3b8; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">National Examination Authority</p>
                        </td>
                    </tr>

                    <!-- Score Hero Section -->
                    <tr>
                        <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(180deg, #fefce8 0%, #ffffff 100%);">
                            <p style="margin: 0 0 5px 0; color: #92400e; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">🎯 Your NISER ${examYear} Score Report</p>
                            <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 500;">Hello, <strong>${name}</strong>!</h2>
                            
                            <!-- Merit Score Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 3px solid #d4af37; border-radius: 12px; margin-bottom: 10px;">
                                <tr>
                                    <td style="padding: 30px; text-align: center;">
                                        <p style="margin: 0 0 8px 0; color: #92400e; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">⭐ Merit Score (Best 3 Subjects)</p>
                                        <p style="margin: 0; font-size: 56px; font-weight: 900; color: #78350f; letter-spacing: -2px;">${meritScore}<span style="font-size: 24px; font-weight: 400; color: #92400e;">/180</span></p>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin: 0; font-size: 13px; color: #6b7280;">Total Score (All 4 Subjects): <strong>${totalScore}</strong></p>
                        </td>
                    </tr>

                    <!-- Subject Breakdown Table -->
                    <tr>
                        <td style="padding: 20px 40px 30px;">
                            <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px; font-weight: 600;">📊 Subject-wise Breakdown</h3>
                            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                                <tr style="background: #f9fafb;">
                                    <th style="padding: 12px 15px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Subject</th>
                                    <th style="padding: 12px 15px; text-align: center; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Score</th>
                                    <th style="padding: 12px 15px; text-align: center; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Correct</th>
                                    <th style="padding: 12px 15px; text-align: center; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Wrong</th>
                                </tr>
                                ${sectionRows}
                            </table>
                            
                            <!-- Stats Summary -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 15px;">
                                <tr>
                                    <td style="padding: 10px; text-align: center; background: #ecfdf5; border-radius: 8px;">
                                        <p style="margin: 0; font-size: 20px; font-weight: 700; color: #059669;">${totalCorrect}</p>
                                        <p style="margin: 2px 0 0 0; font-size: 11px; color: #047857;">Correct</p>
                                    </td>
                                    <td style="width: 10px;"></td>
                                    <td style="padding: 10px; text-align: center; background: #fef2f2; border-radius: 8px;">
                                        <p style="margin: 0; font-size: 20px; font-weight: 700; color: #dc2626;">${totalWrong}</p>
                                        <p style="margin: 2px 0 0 0; font-size: 11px; color: #b91c1c;">Wrong</p>
                                    </td>
                                    <td style="width: 10px;"></td>
                                    <td style="padding: 10px; text-align: center; background: #f3f4f6; border-radius: 8px;">
                                        <p style="margin: 0; font-size: 20px; font-weight: 700; color: #6b7280;">${totalQuestions - totalCorrect - totalWrong}</p>
                                        <p style="margin: 2px 0 0 0; font-size: 11px; color: #4b5563;">Skipped</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- CTA Section - Test Series Promo -->
                    <tr>
                        <td style="padding: 0 40px 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%); border-radius: 12px; overflow: hidden;">
                                <tr>
                                    <td style="padding: 30px; text-align: center;">
                                        <p style="margin: 0 0 8px 0; color: #c7d2fe; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">🚀 Want to Improve?</p>
                                        <h3 style="margin: 0 0 10px 0; color: #ffffff; font-size: 22px; font-weight: 700;">Get the Complete NISER Test Series</h3>
                                        <p style="margin: 0 0 20px 0; color: #a5b4fc; font-size: 14px;">10+ Full-Length Mock Tests with Detailed Solutions</p>
                                        <a href="https://vigyanprep.com/testfirstpage.html" style="display: inline-block; background: #d4af37; color: #000000; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-weight: 700; font-size: 16px; letter-spacing: 0.5px;">BUY NOW @ ₹199 →</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #f9fafb; padding: 25px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280;">Keep practicing and aim for excellence!</p>
                            <p style="margin: 0 0 15px 0; font-size: 12px; color: #9ca3af;">Questions? Reply to this email or visit <a href="https://vigyanprep.com" style="color: #2563eb;">vigyanprep.com</a></p>
                            <p style="margin: 0; font-size: 11px; color: #9ca3af;">© ${new Date().getFullYear()} Vigyan.prep • All rights reserved</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;

        // Send email
        if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
            const mailOptions = {
                from: `"Vigyan.prep Exams" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: `🎯 Your NISER ${examYear} Score Report - Merit: ${meritScore}/180`,
                html: emailHtml,
            };

            await transporter.sendMail(mailOptions);
            console.log(`✅ Score report sent successfully to ${email}`);

            res.status(200).json({
                success: true,
                message: 'Score report sent successfully',
                email: email
            });
        } else {
            console.warn('⚠️ Email credentials not configured');
            res.status(200).json({
                success: true,
                message: 'Score calculated (email disabled)',
                warning: 'Email service not configured'
            });
        }

    } catch (error) {
        console.error('❌ Error sending score report:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to send score report',
            error: error.message
        });
    }
};
