/**
 * 📧 VIGYAN.PREP PREMIUM EMAIL TEMPLATES
 * Featuring: Golden Aesthetics, Roman/Cursive Typography, Dark Mode Support
 */

const GOLDEN_GRADIENT = "linear-gradient(135deg, #fdfcf0 0%, #D4AF37 50%, #996515 100%)";
const DARK_BG = "#0a0a0f";
const LIGHT_BG = "#ffffff";
const GOLD_TEXT = "#D4AF37";

/**
 * 🛡️ XSS Protection: Escape HTML special characters
 */
export const escapeHtml = (s = '') =>
    String(s).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    }[c]));

/**
 * Format name to Title Case (e.g., "ALOK" -> "Alok")
 */
const formatDisplayName = (name) => {
    if (!name) return "";
    return name.trim().toLowerCase().split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

/**
 * Generate the enrollment confirmation email
 */
export const getEnrollmentEmailHtml = (fullName, rollNumber, testSeriesName) => {
    const safeName = escapeHtml(formatDisplayName(fullName));
    const safeRoll = escapeHtml(rollNumber);
    const safeSeries = escapeHtml(testSeriesName);

    return `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <title>Enrollment Confirmed - Vigyan.prep</title>
    <!--[if mso]>
    <xml>
    <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Dancing+Script:wght@600&family=Inter:wght@400;700&display=swap');
        
        :root {
            color-scheme: light dark;
            supported-color-schemes: light dark;
        }

        body {
            margin: 0;
            padding: 0;
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            font-family: 'Inter', Arial, sans-serif;
            background-color: #f8f9fa;
        }

        /* DARK MODE STYLES */
        @media (prefers-color-scheme: dark) {
            .body-bg { background-color: #050508 !important; }
            .email-container { background-color: #0d0d14 !important; }
            .content-box { background-color: #0d0d14 !important; border-color: #1a1a25 !important; }
            .text-main { color: #f8fafc !important; }
            .text-muted { color: #94a3b8 !important; }
            .roll-number-box { background: #161622 !important; border-color: #2a2a38 !important; }
            .footer { background-color: #050508 !important; border-top-color: #1a1a25 !important; }
        }

        /* Responsive */
        @media only screen and (max-width: 600px) {
            .padding-mobile { padding: 30px 20px !important; }
            .logo-text { font-size: 24px !important; }
        }
    </style>
</head>
<body class="body-bg" style="background-color: #f8f9fa; padding: 20px 0;">
    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.08);" class="email-container">
        
        <!-- HEADER / BRAND IDENTITY -->
        <tr>
            <td style="padding: 60px 40px; text-align: center; background: #000000; color: #ffffff;">
                <!-- Golden Box Logo Style -->
                <div style="display: inline-block; padding-bottom: 5px;">
                    <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                        <tr>
                            <td style="background-color: ${GOLD_TEXT}; padding: 8px 20px; border-radius: 4px;">
                                <span style="font-family: 'Cormorant Garamond', serif; font-weight: 700; font-style: italic; font-size: 28px; letter-spacing: 2px; color: #000000; text-transform: uppercase;">VIGYAN</span>
                            </td>
                            <td style="padding-left: 10px;">
                                <span style="font-family: 'Inter', sans-serif; font-weight: 400; font-size: 16px; color: rgba(255,255,255,0.7); letter-spacing: 2px; text-transform: uppercase;">. PREP</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- Golden Divider -->
                <div style="height: 1px; width: 120px; background: linear-gradient(90deg, transparent, ${GOLD_TEXT}, transparent); margin: 25px auto 0;"></div>
            </td>
        </tr>

        <!-- MAIN CONTENT AREA -->
        <tr>
            <td style="padding: 50px 50px;" class="content-box padding-mobile">
                <!-- Greeting -->
                <p style="margin: 0; font-family: 'Dancing Script', cursive; font-size: 32px; color: ${GOLD_TEXT};">Dear ${safeName},</p>
                
                <h1 style="margin: 25px 0; font-family: 'Cormorant Garamond', serif; font-size: 44px; line-height: 1.1; color: #000000; font-weight: 700;" class="text-main">
                    Your scientific journey <br>
                    <span style="color: ${GOLD_TEXT};">begins here.</span>
                </h1>

                <p style="margin: 0 0 35px 0; font-size: 17px; color: #374151; line-height: 1.7;" class="text-muted">
                    We are honored to confirm your enrollment in the <strong style="color: #000000;" class="text-main">${safeSeries}</strong>. This series is crafted to elevate your preparation and guide you toward scientific excellence.
                </p>

                <!-- ROLL NUMBER SECTION -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background: #fdfdfd; border: 1px solid #f1f5f9; border-radius: 16px; margin-bottom: 40px;" class="roll-number-box">
                    <tr>
                        <td style="padding: 35px; text-align: center;">
                            <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 700; letter-spacing: 4px; color: #94a3b8; text-transform: uppercase;">Official Roll Number</p>
                            <div style="font-family: 'Inter', Arial, sans-serif; font-weight: 800; font-size: 48px; color: #000000; letter-spacing: 6px;" class="text-main">
                                ${safeRoll}
                            </div>
                            <table border="0" cellpadding="0" cellspacing="0" style="margin: 20px auto 0;">
                                <tr>
                                    <td style="padding: 6px 16px; border: 1.5px solid ${GOLD_TEXT}; border-radius: 100px; font-size: 11px; font-weight: 800; color: ${GOLD_TEXT}; letter-spacing: 1.5px; text-transform: uppercase;">
                                        Verified Researcher Access
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- CTA BUTTON -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center">
                            <a href="https://vigyanprep.com/testfirstpage.html" style="display: inline-block; background: #000000; color: #ffffff; text-decoration: none; padding: 20px 50px; border-radius: 10px; font-weight: 700; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; box-shadow: 0 10px 25px rgba(0,0,0,0.15);">
                                Access Learning Portal
                            </a>
                        </td>
                    </tr>
                </table>

                <p style="margin: 45px 0 0 0; text-align: center; font-size: 13px; color: #64748b; line-height: 1.6;" class="text-muted">
                    Your roll number is your unique identifier. Please store it securely for authentication during your academic assessments.
                </p>
            </td>
        </tr>

        <!-- FOOTER SECTION -->
        <tr>
            <td style="padding: 45px; background-color: #000000; text-align: center;" class="footer">
                <div style="margin-bottom: 25px;">
                    <a href="https://vigyanprep.com" style="color: ${GOLD_TEXT}; text-decoration: none; margin: 0 15px; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">Website</a>
                    <a href="mailto:support@vigyanprep.com" style="color: ${GOLD_TEXT}; text-decoration: none; margin: 0 15px; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">Contact Support</a>
                    <a href="https://instagram.com/vigyan.prep" style="color: ${GOLD_TEXT}; text-decoration: none; margin: 0 15px; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">Instagram</a>
                </div>
                <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.4); line-height: 1.8;">
                    Vigyan.prep Platform • Precision in Science Education <br>
                    © ${new Date().getFullYear()} Vigyan.prep. All rights reserved.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};

/**
 * Generate the exam score report email
 */
export const getScoreReportEmailHtml = (data) => {
    const { name, examYear, sectionScores, meritScore, totalScore, totalCorrect, totalWrong, totalQuestions } = data;
    const safeName = escapeHtml(formatDisplayName(name));
    const safeYear = escapeHtml(examYear);

    // Build section rows with premium styling
    const sections = ['Biology', 'Chemistry', 'Physics', 'Mathematics'];
    const sectionRows = sections.map(s => {
        const d = sectionScores[s] || { score: 0, correct: 0, wrong: 0 };
        return `
            <tr>
                <td style="padding: 15px; border-bottom: 1px solid #f1f5f9; font-size: 14px;" class="row-td text-main">${s}</td>
                <td style="padding: 15px; border-bottom: 1px solid #f1f5f9; text-align: center; font-weight: 700; color: ${d.score >= 0 ? '#10b981' : '#ef4444'};">${d.score >= 0 ? '+' : ''}${d.score}</td>
                <td style="padding: 15px; border-bottom: 1px solid #f1f5f9; text-align: center; color: #10b981; font-size: 13px;">✓ ${d.correct}</td>
                <td style="padding: 15px; border-bottom: 1px solid #f1f5f9; text-align: center; color: #ef4444; font-size: 13px;">✗ ${d.wrong}</td>
            </tr>
        `;
    }).join('');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Dancing+Script:wght@600&family=Inter:wght@400;700&display=swap');
        @media (prefers-color-scheme: dark) {
            .email-container { background-color: ${DARK_BG} !important; }
            .content-box { background-color: #161620 !important; border-color: #2a2a35 !important; }
            .text-main { color: #e2e8f0 !important; }
            .text-muted { color: #94a3b8 !important; }
            .table-head { background-color: #1a1a25 !important; color: ${GOLD_TEXT} !important; }
            .row-td { border-bottom-color: #2a2a35 !important; color: #cbd5e1 !important; }
        }
    </style>
</head>
<body style="background-color: #f4f4f7; padding: 20px 0; font-family: 'Inter', sans-serif;">
    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);" class="email-container">
        
        <!-- HEADER -->
        <tr>
            <td style="padding: 35px 0; text-align: center; background: #000000;">
                <div style="font-family: 'Cormorant Garamond', serif; font-weight: 700; font-style: italic; font-size: 28px; letter-spacing: 2px; text-transform: uppercase;">
                    <span style="color: ${GOLD_TEXT};">Vigyan</span><span style="color: rgba(255,255,255,0.4);">.</span><span style="color: rgba(255,255,255,0.3); font-family: 'Inter', sans-serif; font-weight: 400; font-size: 12px; font-style: normal;">prep</span>
                </div>
            </td>
        </tr>

        <!-- HERO SECTION -->
        <tr>
            <td style="padding: 40px; text-align: center; background: linear-gradient(180deg, #fffbeb 0%, #ffffff 100%);" class="content-box">
                <p style="margin: 0; font-family: 'Dancing Script', cursive; font-size: 24px; color: ${GOLD_TEXT};">Dear ${safeName},</p>
                <h1 style="margin: 15px 0; font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #1e293b;" class="text-main">Your NISER ${safeYear} <br><span style="color: ${GOLD_TEXT};">Score Report</span></h1>
                
                <!-- TOTAL SCORE CARD -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background: #000000; border-radius: 12px; margin: 20px 0;">
                    <tr>
                        <td style="padding: 25px; text-align: center;">
                            <p style="margin: 0 0 5px 0; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.5); letter-spacing: 2px; text-transform: uppercase;">Merit Proficiency Score</p>
                            <div style="font-size: 48px; font-weight: 800; color: ${GOLD_TEXT};">${meritScore}</div>
                            <p style="margin: 10px 0 0 0; font-size: 12px; color: rgba(255,255,255,0.4);">Verified Performance Index</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- SCORE BREAKDOWN -->
        <tr>
            <td style="padding: 0 40px 40px;" class="content-box">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border: 1px solid #f1f5f9; border-radius: 8px; overflow: hidden;">
                    <tr style="background-color: #f8fafc;" class="table-head">
                        <th style="padding: 12px 15px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">Subject</th>
                        <th style="padding: 12px 15px; text-align: center; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">Score</th>
                        <th style="padding: 12px 15px; text-align: center; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">Correct</th>
                        <th style="padding: 12px 15px; text-align: center; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b;">Wrong</th>
                    </tr>
                    ${sectionRows}
                </table>

                <div style="margin-top: 30px; text-align: center;">
                    <a href="https://vigyanprep.com" style="display: inline-block; background: ${GOLD_TEXT}; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-weight: 700; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">Analyze Full Mock</a>
                </div>
            </td>
        </tr>

        <!-- FOOTER -->
        <tr>
            <td style="padding: 30px; background-color: #000000; text-align: center;">
                <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.3);">© ${new Date().getFullYear()} Vigyan.prep Exams • Excellence in Research Education</p>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};
