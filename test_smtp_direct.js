
import nodemailer from 'nodemailer';

async function testEmail() {
    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587,
        secure: false, // port 587 is STARTTLS
        auth: {
            user: 'noreply@vigyanprep.com',
            pass: 'Buddy700@@@@',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('Verifying transporter...');
        await transporter.verify();
        console.log('✅ SMTP verified!');

        console.log('Sending test email...');
        const info = await transporter.sendMail({
            from: '"Vigyan.prep Test" <noreply@vigyanprep.com>',
            to: 'anandharsh437@gmail.com',
            subject: 'SMTP Test - Vigyan.prep',
            text: 'If you see this, SMTP is working from target network.',
        });
        console.log('✅ Email sent:', info.messageId);
    } catch (error) {
        console.error('❌ SMTP Error:', error);
    }
}

testEmail();
