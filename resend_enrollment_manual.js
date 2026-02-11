
import nodemailer from 'nodemailer';
import { getEnrollmentEmailHtml } from './backend/utils/emailTemplates.js';

async function resendEmail() {
    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587,
        secure: false,
        auth: {
            user: 'noreply@vigyanprep.com',
            pass: 'Buddy700@@@@',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const email = 'anandharsh437@gmail.com';
    const rollNumber = '56936725';
    const testId = 'NEST/ISI (Combined)';
    const fullName = 'Harsh Anand'; // Based on query previous turns

    try {
        console.log('Generating template...');
        const html = getEnrollmentEmailHtml(fullName, rollNumber, testId);

        console.log('Sending re-enrollment email...');
        await transporter.sendMail({
            from: '"Vigyan.prep Exams" <noreply@vigyanprep.com>',
            to: email,
            subject: `✅ Registration Confirmed - ${testId} Test Series`,
            html: html,
        });
        console.log('✅ Email resent successfully!');
    } catch (error) {
        console.error('❌ Resend Error:', error);
    }
}

resendEmail();
