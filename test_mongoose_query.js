
import mongoose from 'mongoose';

const studentPaymentSchema = new mongoose.Schema({
    email: { type: String, required: true },
    roll_number: { type: String, required: true }
}, { collection: 'studentpayments' });

const StudentPayment = mongoose.model('StudentPayment', studentPaymentSchema);

const MONGODB_URI = 'mongodb+srv://harsh:Buddy700@cluster0.jtele7g.mongodb.net/vigyanprep?retryWrites=true&w=majority&appName=Cluster0';

async function testMongooseQuery() {
    try {
        await mongoose.connect(MONGODB_URI);

        const email = 'theonlysam82@gmail.com';
        const rollNumber = '82841903';

        console.log(`\n🔍 Mongoose Query for: ${email} / ${rollNumber}`);

        const student = await StudentPayment.findOne({
            email: email.toLowerCase().trim(),
            roll_number: rollNumber
        });

        if (student) {
            console.log('✅ FOUND with Mongoose!');
            console.log('Data:', JSON.stringify(student, null, 2));
        } else {
            console.log('❌ NOT FOUND with Mongoose!');

            // Try find with ONLY email
            const byEmail = await StudentPayment.findOne({ email: email.toLowerCase().trim() });
            console.log('By Email Only:', byEmail ? '✅ FOUND' : '❌ NOT FOUND');
            if (byEmail) console.log('DB Roll Number:', byEmail.roll_number);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

testMongooseQuery();
