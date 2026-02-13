const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
}

async function run() {
    try {
        const uri = process.env.MONGODB_URI || "mongodb+srv://harsh:Buddy700@cluster0.jtele7g.mongodb.net/?appName=Cluster0";
        await mongoose.connect(uri);
        console.log("✅ Connected");

        const db = mongoose.connection.db;
        const collection = db.collection('questions');

        const testIds = await collection.distinct('testId');
        const test_ids = await collection.distinct('test_id');

        console.log("\n📊 UNIQUE TEST IDs (camelCase):");
        console.log(testIds);

        console.log("\n📊 UNIQUE TEST IDs (snake_case):");
        console.log(test_ids);

        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
}
run();
