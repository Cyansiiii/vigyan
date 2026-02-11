
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://harsh:Buddy700@cluster0.jtele7g.mongodb.net/vigyanprep?retryWrites=true&w=majority&appName=Cluster0';

async function deepDiagnostic() {
    try {
        await mongoose.connect(MONGODB_URI);
        const emails = ['theonlysam82@gmail.com', 'anandharsh437@gmail.com'];

        for (const email of emails) {
            console.log(`\n🔍 DIAGNOSTIC for: ${email}`);

            // 1. Check studentpayments
            const spCollection = mongoose.connection.db.collection('studentpayments');
            const sp = await spCollection.findOne({ email });
            console.log('\n--- studentpayments ---');
            if (sp) {
                console.log('Record:', JSON.stringify(sp, null, 2));
                console.log('Roll Number Type:', typeof sp.roll_number);

                // Try combined find
                const combined = await spCollection.findOne({ email, roll_number: sp.roll_number });
                console.log('Combined Find:', combined ? '✅ SUCCESS' : '❌ FAILED');
            } else {
                console.log('❌ NOT FOUND by email');
            }

            // 2. Check students
            const sCollection = mongoose.connection.db.collection('students');
            const s = await sCollection.findOne({ email });
            console.log('\n--- students ---');
            if (s) {
                console.log('Record:', JSON.stringify(s, null, 2));
            } else {
                console.log('❌ NOT FOUND');
            }
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

deepDiagnostic();
