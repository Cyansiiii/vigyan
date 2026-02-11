
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://harsh:Buddy700@cluster0.jtele7g.mongodb.net/vigyanprep?retryWrites=true&w=majority&appName=Cluster0';

const TransactionSchema = new mongoose.Schema({
    email: String,
    razorpay_payment_id: String,
    status: String,
    amount: Number,
    created_at: { type: Date, default: Date.now }
}, { collection: 'paymenttransactions' });

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

async function checkTransactions() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        console.log('Fetching last 5 transactions...');
        const logs = await Transaction.find().sort({ created_at: -1 }).limit(5);

        if (logs.length > 0) {
            logs.forEach(log => {
                console.log(`[${log.created_at.toISOString()}] Email: ${log.email} | ID: ${log.razorpay_payment_id} | Status: ${log.status} | Amt: ${log.amount}`);
            });
        } else {
            console.log('No transactions found.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

checkTransactions();
