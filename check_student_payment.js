
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://harsh:Buddy700@cluster0.jtele7g.mongodb.net/vigyanprep?retryWrites=true&w=majority&appName=Cluster0';

const StudentPaymentSchema = new mongoose.Schema({
    email: String,
    roll_number: String,
    created_at: { type: Date, default: Date.now }
}, { collection: 'studentpayments' });

const StudentPayment = mongoose.models.StudentPayment || mongoose.model('StudentPayment', StudentPaymentSchema);

async function checkStudent() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        const student = await StudentPayment.findOne({ email: 'anandharsh437@gmail.com' });

        if (student) {
            console.log(`Found Student: ${student.email} | Roll: ${student.roll_number} | Created: ${student.created_at}`);
        } else {
            console.log('Student not found in studentpayments.');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

checkStudent();
