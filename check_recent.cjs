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

        console.log("\n📊 TEST SERIES LIST:");
        const tests = await db.collection('testseries').find().toArray();
        tests.forEach(t => {
            console.log(`- ${t.testId || t.test_id || t._id} (${t.title || t.name})`);
        });

        console.log("\n📊 LAST 20 QUESTIONS:");
        const questions = await db.collection('questions').find().sort({ _id: -1 }).limit(20).toArray();
        questions.forEach(q => {
            console.log(`- ID: ${q._id}, testId: ${q.testId}, Quest: ${q.questionText ? q.questionText.substring(0, 30) : 'N/A'}..., Options: ${q.options ? q.options.length : 'MISSING'}`);
        });

        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
}
run();
