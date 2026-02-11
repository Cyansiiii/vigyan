const nodemailer = require('nodemailer');
require('dotenv').config({ path: 'backend/.env' });

async function testEmail(port, secure) {
    console.log(`\n--- TESTING SMTP | Port: ${port} | Secure: ${secure} ---`);

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
        port: port,
        secure: secure,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        await transporter.verify();
        console.log(`✅ SUCCESS: Port ${port} is reachable and auth works.`);
        return true;
    } catch (err) {
        console.error(`❌ FAILED: Port ${port} error:`, err.message);
        return false;
    }
}

async function runTests() {
    await testEmail(465, true);
    await testEmail(587, false);
    process.exit(0);
}

runTests();
