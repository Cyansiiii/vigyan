const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Try to load env from .env
if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
}

const QuestionSchema = new mongoose.Schema({}, { strict: false, collection: 'questions' });
const Question = mongoose.model('DiagnosticQuestion', QuestionSchema);

async function check() {
    try {
        const uri = process.env.MONGODB_URI || "mongodb://u255161845:Buddy700%40@31.97.101.169:27017/u255161845_vigyan?authSource=admin";
        console.log("🔗 Connecting to MongoDB...");

        await mongoose.connect(uri);
        console.log("✅ Connected");

        console.log("\n--- LAST 5 DOCUMENTS IN 'questions' ---");
        const last5 = await Question.find().sort({ _id: -1 }).limit(5).lean();
        last5.forEach((doc, i) => {
            console.log(`\n📄 Doc ${i + 1} (${doc._id}):`);
            const keys = Object.keys(doc);
            console.log("   Keys:", keys.join(', '));
            if (doc.options) {
                console.log("   Options (raw):", doc.options);
            } else if (doc.options_text) {
                console.log("   options_text found:", doc.options_text);
            } else {
                console.log("   ❌ NO options field found");
            }
            console.log("   testId field:", doc.testId || doc.test_id || "NOT FOUND");
        });

        console.log("\n--- NEST MOCK 1 AUDIT ---");
        const nestQuestions = await Question.find({
            $or: [{ testId: "NEST_MOCK_1" }, { test_id: "NEST_MOCK_1" }]
        }).limit(5).lean();

        if (nestQuestions.length > 0) {
            console.log(`Found ${nestQuestions.length} samples for NEST_MOCK_1`);
            nestQuestions.forEach((doc, i) => {
                console.log(`\nSample ${i + 1}:`);
                console.log("   testId/test_id:", doc.testId || doc.test_id);
                console.log("   Keys:", Object.keys(doc).join(', '));
                console.log("   Options field:", doc.options ? "Present" : "MISSING");
                if (doc.options) console.log("   Options value:", doc.options);
            });
        } else {
            console.log("No documents found for NEST_MOCK_1");
        }

        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
}
check();
