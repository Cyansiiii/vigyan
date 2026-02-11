
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://harsh:Buddy700@cluster0.jtele7g.mongodb.net/vigyanprep?retryWrites=true&w=majority&appName=Cluster0';

async function checkUserEmailStatus() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        const email = 'theonlysam82@gmail.com';

        console.log(`\n🔍 Checking status for: ${email}`);

        // 1. Check Student Record
        const studentCollection = mongoose.connection.db.collection('studentpayments');
        const student = await studentCollection.findOne({ email });
        if (student) {
            console.log(`✅ Student Record Found!`);
            console.log(`   Roll: ${student.roll_number}`);
            console.log(`   Created: ${student.created_at}`);
        } else {
            console.log(`❌ No Student Record found for this email.`);
        }

        // 2. Check Purchase Record
        const purchaseCollection = mongoose.connection.db.collection('purchasedtests');
        const purchases = await purchaseCollection.find({ email }).toArray();
        if (purchases.length > 0) {
            console.log(`✅ Purchase Records Found (${purchases.length}):`);
            purchases.forEach(p => console.log(`   - ${p.test_id} (Purchased: ${p.purchased_at})`));
        }

        // 3. Check Email Logs
        const logCollection = mongoose.connection.db.collection('emaillogs');
        const logs = await logCollection.find({ email }).sort({ sentAt: -1 }).toArray();

        if (logs.length > 0) {
            console.log(`\n📧 Email Logs Found (${logs.length}):`);
            logs.forEach(log => {
                console.log(`[${log.sentAt}] Status: ${log.status} | Type: ${log.type} | Subject: ${log.subject || 'N/A'}`);
                if (log.error) console.log(`   Error: ${log.error}`);
            });
        } else {
            console.log(`\n❌ No Email Logs found for this email.`);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected');
    }
}

checkUserEmailStatus();
