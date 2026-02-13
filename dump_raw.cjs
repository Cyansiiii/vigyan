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

        console.log("\n--- RAW DOCUMENTS FOR NEST_MOCK_1 ---");
        const doc = await collection.findOne({
            $or: [{ testId: "NEST_MOCK_1" }, { test_id: "NEST_MOCK_1" }]
        });

        if (doc) {
            console.log(JSON.stringify(doc, null, 2));
        } else {
            console.log("No document found for NEST_MOCK_1");

            console.log("\n--- RECENT QUESTIONS (ANY) ---");
            const recent = await collection.find().sort({ _id: -1 }).limit(1).toArray();
            console.log(JSON.stringify(recent, null, 2));
        }

        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
}
run();
