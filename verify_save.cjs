const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Try to load env from .env
if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
}

// MUST use the exact same schema as the project
const QuestionSchema = new mongoose.Schema(
    {
        testId: String,
        questionNumber: Number,
        questionText: String,
        options: [String],
        correctAnswer: String,
        section: String
    },
    { collection: 'questions' }
);
const Question = mongoose.model('TestSaveQuestion', QuestionSchema);

async function check() {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error("MONGODB_URI not found");

        await mongoose.connect(uri);
        console.log("✅ Connected");

        const testId = "TEST_SAVE_001";
        console.log("🛠️ Attempting to save question with options...");

        const newQ = new Question({
            testId: testId,
            questionNumber: 999,
            questionText: "Which of these is a test question?",
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            correctAnswer: "Option 1",
            section: "General"
        });

        const saved = await newQ.save();
        console.log("✅ Question saved with ID:", saved._id);
        console.log("📦 Options in saved doc:", saved.options);

        const fetched = await Question.findById(saved._id).lean();
        console.log("🔍 Fetched from DB:", JSON.stringify(fetched, null, 2));

        if (fetched.options && fetched.options.length === 4) {
            console.log("\n🎊 SUCCESS: Options are being stored correctly!");
        } else {
            console.log("\n❌ FAILURE: Options were LOST or malformed!");
        }

        // Clean up
        await Question.deleteOne({ _id: saved._id });
        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
}
check();
