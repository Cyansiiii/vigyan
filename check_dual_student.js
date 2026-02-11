
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://harsh:Buddy700@cluster0.jtele7g.mongodb.net/vigyanprep?retryWrites=true&w=majority&appName=Cluster0';

async function checkStudentCollections() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        const email = 'theonlysam82@gmail.com';

        console.log(`\n🔍 Checking collections for: ${email}`);

        // 1. Check studentpayments
        const spCollection = mongoose.connection.db.collection('studentpayments');
        const spResult = await spCollection.findOne({ email });
        console.log('studentpayments record:', spResult ? '✅ FOUND' : '❌ NOT FOUND');

        // 2. Check students (Dashboard model)
        const sCollection = mongoose.connection.db.collection('students');
        const sResult = await sCollection.findOne({ email });
        console.log('students record:', sResult ? '✅ FOUND' : '❌ NOT FOUND');

        if (sResult) {
            console.log('Student Data:', JSON.stringify(sResult, null, 2));
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected');
    }
}

checkStudentCollections();
