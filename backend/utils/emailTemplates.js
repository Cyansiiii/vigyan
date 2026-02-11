/**
 * 📧 VIGYAN.PREP PREMIUM EMAIL TEMPLATES
 * Featuring: Golden Aesthetics, Roman/Cursive Typography, Dark Mode Support
 */

const GOLDEN_GRADIENT = "linear-gradient(135deg, #fef3c7 0%, #fcd34d 50%, #d97706 100%)";
const DARK_BG = "#0a0a0f";
const LIGHT_BG = "#ffffff";
const GOLD_TEXT = "#d97706";

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
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enrollment Confirmed - Vigyan.prep</title>
    <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
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
            background-color: #f4f4f7;
        }

        img {
            border: 0;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        table {
            border-collapse: collapse !important;
        }

        /* DARK MODE STYLES */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: ${DARK_BG} !important;
            }
            .content-box {
                background-color: #161620 !important;
                border-color: #2a2a35 !important;
            }
            .text-main {
                color: #e2e8f0 !important;
            }
            .text-muted {
                color: #94a3b8 !important;
            }
            .footer {
                background-color: #050508 !important;
                border-top-color: #1a1a25 !important;
            }
        }

        /* Outlook Specific Dark Mode */
        [data-ogsc] .email-container { background-color: ${DARK_BG} !important; }
        [data-ogsc] .content-box { background-color: #161620 !important; }
        [data-ogsc] .text-main { color: #e2e8f0 !important; }
    </style>
</head>
<body style="background-color: #f4f4f7; padding: 20px 0;">
    <table width="100%" border="0" cellpadding="0" cellspacing="0" class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
        
        <!-- HEADER / LOGO -->
        <tr>
            <td style="padding: 40px 0; text-align: center; background: linear-gradient(180deg, #000000 0%, #111111 100%);">
                <div style="font-family: 'Cormorant Garamond', serif; font-weight: 700; font-style: italic; font-size: 32px; letter-spacing: 2px; text-transform: uppercase;">
                    <span style="color: #fcd34d;">Vigyan</span><span style="color: rgba(255,255,255,0.4);">.</span><span style="color: rgba(255,255,255,0.3); font-family: 'Inter', sans-serif; font-weight: 400; font-size: 14px; font-style: normal; letter-spacing: 1px;">prep</span>
                </div>
                <div style="height: 1px; width: 80px; background: linear-gradient(90deg, transparent, #fcd34d, transparent); margin: 15px auto 0;"></div>
            </td>
        </tr>

        <!-- CONTENT AREA -->
        <tr>
            <td style="padding: 50px 40px;" class="content-box">
                <!-- Greeting -->
                <p style="margin: 0; font-family: 'Dancing Script', cursive; font-size: 28px; color: ${GOLD_TEXT};">Dear ${formatDisplayName(fullName)},</p>
                
                <h1 style="margin: 20px 0; font-family: 'Cormorant Garamond', serif; font-size: 36px; line-height: 1.2; color: #1a1a1a; font-weight: 600;" class="text-main">
                    Your scientific journey <br>
                    <span style="color: ${GOLD_TEXT};">begins here.</span>
                </h1>

                <p style="margin: 0 0 30px 0; font-size: 16px; color: #4b5563; line-height: 1.6;" class="text-muted">
                    We are honored to confirm your enrollment in the <strong>${testSeriesName}</strong>. This series is designed to push the boundaries of your preparation and lead you toward scientific excellence.
                </p>

                <!-- ROLL NUMBER CARD -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background: #fafafc; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 40px;" class="content-box">
                    <tr>
                        <td style="padding: 30px; text-align: center;">
                            <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: 700; letter-spacing: 3px; color: #9ca3af; text-transform: uppercase;">Official Roll Number</p>
                            <div style="font-family: 'Inter', Arial, sans-serif; font-weight: 800; font-size: 42px; color: #111827; letter-spacing: 5px;" class="text-main">
                                ${rollNumber}
                            </div>
                            <div style="margin-top: 15px; display: inline-block; padding: 4px 12px; background: rgba(217, 119, 6, 0.1); border: 1px solid rgba(217, 119, 6, 0.2); border-radius: 4px; font-size: 10px; font-weight: 700; color: ${GOLD_TEXT}; letter-spacing: 1px;">
                                VERIFIED ACCOUNT
                            </div>
                        </td>
                    </tr>
                </table>

                <!-- ACTION BUTTON -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center">
                            <a href="https://vigyanprep.com/testfirstpage.html" style="display: inline-block; background: #000000; color: #ffffff; text-decoration: none; padding: 18px 45px; border-radius: 8px; font-weight: 700; font-size: 14px; letter-spacing: 1.5px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                                Enter Student Portal
                            </a>
                        </td>
                    </tr>
                </table>

                <p style="margin: 40px 0 0 0; text-align: center; font-size: 13px; color: #94a3b8; line-height: 1.6;" class="text-muted">
                    Please keep this roll number confidential. You will require it along with your registered email to access your examinations and reports.
                </p>
            </td>
        </tr>

        <!-- FOOTER -->
        <tr>
            <td style="padding: 40px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;" class="footer">
                <div style="margin-bottom: 20px;">
                    <a href="https://instagram.com/vigyan.prep" style="color: ${GOLD_TEXT}; text-decoration: none; margin: 0 10px; font-size: 12px; font-weight: 600;">INSTAGRAM</a>
                    <span style="color: #cbd5e1;">|</span>
                    <a href="https://vigyanprep.com" style="color: ${GOLD_TEXT}; text-decoration: none; margin: 0 10px; font-size: 12px; font-weight: 600;">WEBSITE</a>
                    <span style="color: #cbd5e1;">|</span>
                    <a href="mailto:contact@vigyanprep.com" style="color: ${GOLD_TEXT}; text-decoration: none; margin: 0 10px; font-size: 12px; font-weight: 600;">SUPPORT</a>
                </div>
                <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.8;" class="text-muted">
                    This is an official communication from Vigyan.prep Exams. <br>
                    Designed for future IISER & NISER researchers. <br>
                    © ${new Date().getFullYear()} Vigyan.prep. All rights reserved.
                </p>
            </td>
        </tr>

    </table>
    
    <!-- SUB-FOOTER -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto 0;">
        <tr>
            <td style="text-align: center; padding-bottom: 30px;">
                <p style="margin: 0; font-size: 10px; color: #cbd5e1; text-transform: uppercase; letter-spacing: 1px;">
                    Vigyan.prep • S-11, Science Park, Delhi, India
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
    const formattedName = formatDisplayName(name);

    // Build section rows with premium styling
    const sections = ['Biology', 'Chemistry', 'Physics', 'Mathematics'];
    const sectionRows = sections.map(s => {
        const d = sectionScores[s] || { score: 0, correct: 0, wrong: 0 };
        return `
            <tr>
                <td style="padding: 15px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${s}</td>
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
            .table-head { background-color: #1a1a25 !important; color: #fcd34d !important; }
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
                    <span style="color: #fcd34d;">Vigyan</span><span style="color: rgba(255,255,255,0.4);">.</span><span style="color: rgba(255,255,255,0.3); font-family: 'Inter', sans-serif; font-weight: 400; font-size: 12px; font-style: normal;">prep</span>
                </div>
            </td>
        </tr>

        <!-- HERO SECTION -->
        <tr>
            <td style="padding: 40px; text-align: center; background: linear-gradient(180deg, #fffbeb 0%, #ffffff 100%);" class="content-box">
                <p style="margin: 0; font-family: 'Dancing Script', cursive; font-size: 24px; color: ${GOLD_TEXT};">Dear ${formattedName},</p>
                <h1 style="margin: 15px 0; font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #1e293b;" class="text-main">Your NISER ${examYear} <br><span style="color: ${GOLD_TEXT};">Score Report</span></h1>
                
                <!-- TOTAL SCORE CARD -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background: #000000; border-radius: 12px; margin: 20px 0;">
                    <tr>
                        <td style="padding: 25px; text-align: center;">
                            <p style="margin: 0 0 5px 0; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.5); letter-spacing: 2px; text-transform: uppercase;">Merit Proficiency Score</p>
                            <div style="font-size: 48px; font-weight: 800; color: #fcd34d;">${meritScore}</div>
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
