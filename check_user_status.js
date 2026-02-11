
import mongoose from 'mongoose';

// Connection string from .env
const MONGODB_URI = 'mongodb+srv://harsh:Buddy700@cluster0.jtele7g.mongodb.net/vigyanprep?retryWrites=true&w=majority&appName=Cluster0';

const StudentSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    fullName: String,
    rollNumber: String
});

// Use existing model or compile new one
const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

async function checkUser() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        const email = 'anandharsh437@gmail.com';
        console.log(`Checking for user: ${email}`);

        const user = await Student.findOne({ email });

        if (user) {
            console.log('❌ USER FOUND IN DATABASE (Not Deleted!)');
            console.log('Details:', {
                id: user._id,
                email: user.email,
                rollNumber: user.rollNumber
            });
        } else {
            console.log('✅ USER NOT FOUND (Deleted Successfully)');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

checkUser();
