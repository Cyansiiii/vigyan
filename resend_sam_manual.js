
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
        },
        connectionTimeout: 15000,
        greetingTimeout: 15000
    });

    const email = 'theonlysam82@gmail.com';
    const rollNumber = '82841903';
    const testId = 'NEST Test Series';
    const fullName = 'Student'; // Default if not found

    try {
        console.log('Generating template...');
        const html = getEnrollmentEmailHtml(fullName, rollNumber, testId);

        console.log('Sending re-enrollment email...');
        await transporter.sendMail({
            from: '"Vigyan.prep Exams" <noreply@vigyanprep.com>',
            to: email,
            subject: `✅ Registration Confirmed - ${testId}`,
            html: html,
        });
        console.log('✅ Email resent successfully!');
    } catch (error) {
        console.error('❌ Resend Error:', error);
    }
}

resendEmail();
