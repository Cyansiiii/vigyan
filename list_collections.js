
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://harsh:Buddy700@cluster0.jtele7g.mongodb.net/vigyanprep?retryWrites=true&w=majority&appName=Cluster0';

async function listCollections() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections in database:');
        collections.forEach(c => console.log(` - ${c.name}`));

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected');
    }
}

listCollections();
