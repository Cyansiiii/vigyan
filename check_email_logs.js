
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://harsh:Buddy700@cluster0.jtele7g.mongodb.net/vigyanprep?retryWrites=true&w=majority&appName=Cluster0';

const EmailLogSchema = new mongoose.Schema({
    email: String,
    subject: String,
    status: String,
    error: String,
    sentAt: { type: Date, default: Date.now }
}, { collection: 'emaillogs' }); // Adjust if the collection name is different

const EmailLog = mongoose.models.EmailLog || mongoose.model('EmailLog', EmailLogSchema);

async function checkEmails() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        console.log('Fetching last 10 email logs...');
        const logs = await EmailLog.find().sort({ sentAt: -1 }).limit(10);

        if (logs.length > 0) {
            logs.forEach(log => {
                console.log(`[${log.sentAt.toISOString()}] To: ${log.email} | Subject: ${log.subject} | Status: ${log.status}`);
                if (log.error) console.log(`   Error: ${log.error}`);
            });
        } else {
            console.log('No email logs found.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

checkEmails();
