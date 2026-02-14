/**
 * 📧 VIGYAN.PREP PREMIUM EMAIL TEMPLATES
 * Featuring: Golden Aesthetics, Roman/Cursive Typography, Dark Mode Support
 */

const GOLDEN_GRADIENT = "linear-gradient(135deg, #fef3c7 0%, #D4AF37 50%, #996515 100%)";
const DARK_BG = "#050508";
const LIGHT_BG = "#ffffff";
const GOLD_TEXT = "#fcd34d"; // Amber-400 for better contrast
const BRAND_GOLD = "#f59e0b"; // True Brand Gold

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
            .email-container { background-color: #0d0d14 !important; border-color: #1a1a25 !important; }
            .content-box { background-color: #0d0d14 !important; border-color: #1a1a25 !important; }
            .text-main { color: #f8fafc !important; }
            .text-muted { color: #94a3b8 !important; }
            .roll-number-box { background: #161622 !important; border-color: #2a2a38 !important; }
            .footer { background-color: #050508 !important; border-top-color: #1a1a25 !important; }
            h1, h2, h3, p, span, td { color: inherit !important; }
            .gold-text-fix { color: #fcd34d !important; }
        }

        /* GMAIL DARK MODE HACKS */
        [data-ogsc] .body-bg { background-color: #050508 !important; }
        [data-ogsc] .email-container { background-color: #0d0d14 !important; }
        [data-ogsc] .text-main { color: #f8fafc !important; }
        [data-ogsc] .gold-text-fix { color: #fcd34d !important; }

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
                <!-- Exact Website Logo Style -->
                <div style="display: inline-block;">
                    <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                        <tr>
                            <td style="padding: 0;">
                                <span style="font-family: 'Cormorant Garamond', serif; font-weight: 700; font-style: italic; font-size: 38px; letter-spacing: 2px; color: ${GOLD_TEXT}; text-transform: uppercase;">VIGYAN</span>
                            </td>
                            <td style="padding-left: 8px; vertical-align: baseline; padding-bottom: 5px;">
                                <span style="font-family: 'Inter', sans-serif; font-weight: 400; font-size: 16px; color: #94a3b8; letter-spacing: 2px; text-transform: lowercase;">. prep</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- Premium Decorative Underline -->
                <div style="height: 1px; width: 160px; background: linear-gradient(90deg, transparent, ${GOLD_TEXT}, transparent); margin: 20px auto 0;"></div>
            </td>
        </tr>

        <!-- MAIN CONTENT AREA -->
        <tr>
            <td style="padding: 50px 50px;" class="content-box padding-mobile">
                <!-- Greeting - Cursive & Title Case -->
                <p style="margin: 0; font-family: 'Dancing Script', cursive; font-size: 34px; color: ${GOLD_TEXT};" class="gold-text-fix">Dear ${safeName},</p>
                
                <h1 style="margin: 25px 0; font-family: 'Cormorant Garamond', serif; font-size: 44px; line-height: 1.1; color: #000000; font-weight: 700;" class="text-main">
                    Your scientific journey <br>
                    <span style="color: ${GOLD_TEXT};" class="gold-text-fix">begins here.</span>
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
    const { name, examYear, examType, sectionScores, meritScore, totalScore, totalCorrect, totalWrong, totalQuestions } = data;
    const safeName = escapeHtml(formatDisplayName(name));
    const safeYear = escapeHtml(examYear);
    const safeType = (examType || 'NISER').toUpperCase();

    // Logic for score labeling
    const isIISER = safeType === 'IISER';
    const scoreTitle = isIISER ? 'Total Score (All Subjects)' : 'Merit Score (Best 3 Subjects)';
    const maxScore = isIISER ? 240 : 180;
    const secondaryLabel = isIISER ? 'Official Result' : `Total (All 4): ${totalScore}`;
    const primaryDisplayScore = isIISER ? totalScore : meritScore;

    // Promotional Text Logic
    const promoTitle = `Get the Complete ${safeType} Test Series`;
    const promoDesc = `10+ Full-Length Mock Tests with Detailed Solutions for ${safeType} 2025.`;

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
            <td style="padding: 40px; text-align: center; background: #000000; color: #ffffff;">
                <div style="display: inline-block;">
                    <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                        <tr>
                            <td style="padding: 0;">
                                <span style="font-family: 'Cormorant Garamond', serif; font-weight: 700; font-style: italic; font-size: 32px; letter-spacing: 2px; color: ${GOLD_TEXT}; text-transform: uppercase;">VIGYAN</span>
                            </td>
                            <td style="padding-left: 8px; vertical-align: baseline; padding-bottom: 5px;">
                                <span style="font-family: 'Inter', sans-serif; font-weight: 400; font-size: 14px; color: #94a3b8; letter-spacing: 2px; text-transform: lowercase;">. prep</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
        </tr>

        <!-- HERO SECTION -->
        <tr>
            <td style="padding: 40px; text-align: center; background: #ffffff;" class="content-box">
                <p style="margin: 0; font-family: 'Dancing Script', cursive; font-size: 26px; color: ${GOLD_TEXT};">Hello, ${safeName}!</p>
                <h1 style="margin: 15px 0; font-family: 'Cormorant Garamond', serif; font-size: 32px; color: #1e293b;" class="text-main">Your ${safeType} ${safeYear} <br><span style="color: ${GOLD_TEXT};">Score Report</span></h1>
                
                <!-- TOTAL SCORE CARD -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background: #fef3c7; border: 2px solid ${GOLD_TEXT}; border-radius: 12px; margin: 20px 0;">
                    <tr>
                        <td style="padding: 30px; text-align: center;">
                            <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: 700; color: ${BRAND_GOLD}; letter-spacing: 1px; text-transform: uppercase;">⭐ ${scoreTitle}</p>
                            <div style="font-size: 54px; font-weight: 800; color: #854d0e;">${primaryDisplayScore}<span style="font-size: 24px; color: #b45309; opacity: 0.6;">/${maxScore}</span></div>
                            <p style="margin: 10px 0 0 0; font-size: 12px; color: #92400e; font-weight: 500;">${secondaryLabel}</p>
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

        <!-- FOOTER PROMO -->
        <tr>
            <td style="padding: 0 40px 40px;" class="content-box">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background: #312e81; border-radius: 12px; overflow: hidden;">
                    <tr>
                        <td style="padding: 30px; text-align: center;">
                            <p style="margin: 0; color: #e0e7ff; font-size: 12px; font-weight: 600;">🚀 Want to improve?</p>
                            <h2 style="margin: 10px 0; color: #ffffff; font-size: 20px; font-family: 'Cormorant Garamond', serif;">${promoTitle}</h2>
                            <p style="margin: 0 0 20px 0; color: #c7d2fe; font-size: 13px;">${promoDesc}</p>
                            <a href="https://vigyanprep.com" style="display: inline-block; background: ${GOLD_TEXT}; color: #1e1b4b; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 700; font-size: 12px; text-transform: uppercase;">Upgrade Now</a>
                        </td>
                    </tr>
                </table>
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
