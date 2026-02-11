import './backend/config/env.js';
import nodemailer from "nodemailer";
import { getEnrollmentEmailHtml } from "./backend/utils/emailTemplates.js";
import mongoose from "mongoose";

const emailPort = parseInt(process.env.EMAIL_PORT) || 587;
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
    port: emailPort,
    secure: emailPort === 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function speedTest() {
    const start = Date.now();
    console.log(`⏱️  START: Speed Test initiated at ${new Date(start).toLocaleTimeString()}`);

    try {
        const student = {
            email: "anandharsh437@gmail.com",
            fullName: "Alok (Speed Test)",
            rollNumber: "TEST_" + Math.floor(Math.random() * 100000),
            testId: "isi"
        };

        const emailHtml = getEnrollmentEmailHtml(student.fullName, student.rollNumber, "ISI Series");

        const mailOptions = {
            from: `"Vigyan.prep" <${process.env.EMAIL_USER}>`,
            to: student.email,
            subject: "🚀 Speed Test: Instant Enrollment",
            html: emailHtml
        };

        console.log(`📡 Sending email to ${student.email}...`);

        // This simulates the background send in paymentController.js
        const sendStart = Date.now();
        transporter.sendMail(mailOptions).then(info => {
            const end = Date.now();
            console.log(`✅ SUCCESS: Email delivered in ${end - sendStart}ms`);
            console.log(`🆔 Message ID: ${info.messageId}`);
            process.exit(0);
        }).catch(err => {
            console.error(`❌ FAILED: ${err.message}`);
            process.exit(1);
        });

        console.log(`⚡ TRIGGERED: Background send started. Main thread continued in ${Date.now() - start}ms`);

    } catch (error) {
        console.error("❌ FAULT:", error.message);
        process.exit(1);
    }
}

speedTest();
