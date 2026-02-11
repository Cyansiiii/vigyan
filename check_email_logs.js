import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, 'backend/.env') });

const MONGODB_URI = process.env.MONGODB_URI;

// Define EmailLog Schema
const emailLogSchema = new mongoose.Schema({
    email: String,
    type: String,
    status: String,
    error: String,
    sentAt: Date
});

const EmailLog = mongoose.model('EmailLog', emailLogSchema);

async function checkLogs() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const logs = await EmailLog.find().sort({ sentAt: -1 }).limit(10);

        console.log('\n--- LATEST EMAIL LOGS ---');
        if (logs.length === 0) {
            console.log('No logs found.');
        } else {
            logs.forEach(log => {
                console.log(`[${log.sentAt.toISOString()}] ${log.email} | Status: ${log.status.toUpperCase()} ${log.error ? '| Error: ' + log.error : ''}`);
            });
        }
        console.log('-------------------------\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

checkLogs();
