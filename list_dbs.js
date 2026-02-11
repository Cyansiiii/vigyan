
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://harsh:Buddy700@cluster0.jtele7g.mongodb.net/vigyanprep?retryWrites=true&w=majority&appName=Cluster0';

async function listDatabases() {
    try {
        await mongoose.connect(MONGODB_URI);
        const admin = mongoose.connection.db.admin();
        const result = await admin.listDatabases();

        console.log('Databases on Cluster:');
        result.databases.forEach(db => {
            console.log(` - ${db.name} (${db.sizeOnDisk} bytes)`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

listDatabases();
