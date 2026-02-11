
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://harsh:Buddy700@cluster0.jtele7g.mongodb.net/vigyanprep?retryWrites=true&w=majority&appName=Cluster0';

async function checkAllLogs() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        const collection = mongoose.connection.db.collection('emaillogs');
        const count = await collection.countDocuments();
        console.log(`Total documents in emaillogs: ${count}`);

        if (count > 0) {
            const logs = await collection.find().sort({ sentAt: -1 }).limit(10).toArray();
            logs.forEach(log => {
                console.log(JSON.stringify(log, null, 2));
            });
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

checkAllLogs();
