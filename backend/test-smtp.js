import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function testSMTP() {
    console.log('Testing SMTP connection to Hostinger...');
    console.log('Host:', process.env.EMAIL_HOST || 'smtp.hostinger.com');
    console.log('Port:', process.env.EMAIL_PORT || 465);
    console.log('User:', process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
        port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000
    });

    try {
        const result = await transporter.verify();
        console.log('✅ Connection Successful:', result);
    } catch (error) {
        console.error('❌ Connection Failed:', error);
    }
}

testSMTP();
