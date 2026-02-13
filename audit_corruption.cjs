const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
}

const QuestionSchema = new mongoose.Schema({}, { strict: false, collection: 'questions' });
const Question = mongoose.model('AuditQuestion', QuestionSchema);

async function run() {
    try {
        const uri = process.env.MONGODB_URI || "mongodb+srv://harsh:Buddy700@cluster0.jtele7g.mongodb.net/?appName=Cluster0";
        await mongoose.connect(uri);
        console.log("✅ Connected for Audit");

        const corruptedDocs = await Question.find({
            options: { $elemMatch: { $eq: "[object Object]" } }
        }).lean();

        console.log(`\n📊 CORRUPTION REPORT:`);
        console.log(`- Found ${corruptedDocs.length} questions with "[object Object]" in options.`);

        if (corruptedDocs.length > 0) {
            const byTest = {};
            corruptedDocs.forEach(d => {
                const tid = d.testId || d.test_id || 'Unknown';
                byTest[tid] = (byTest[tid] || 0) + 1;
            });
            console.log(`- Breakdown by Test ID:`, JSON.stringify(byTest, null, 2));

            console.log(`\n📄 SAMPLE CORRUPTED DOC (${corruptedDocs[0]._id}):`);
            console.log(JSON.stringify(corruptedDocs[0], null, 2));
        }

        const missingOptions = await Question.find({
            $or: [
                { options: { $exists: false } },
                { options: { $size: 0 } }
            ]
        }).limit(5).lean();

        console.log(`\n- Found ${missingOptions.length} (sample) questions with MISSING or EMPTY options.`);
        missingOptions.forEach(d => {
            console.log(`  - ${d._id} (${d.testId || d.test_id})`);
        });

        process.exit(0);
    } catch (err) {
        console.error("❌ Audit Error:", err);
        process.exit(1);
    }
}
run();
