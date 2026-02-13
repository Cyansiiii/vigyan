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

        console.log("\n📊 AUDITING OPTIONS FOR 'iat' AND 'nest'...");

        const problemDocs = await collection.find({
            $or: [
                { options: { $exists: false } },
                { options: { $size: 0 } },
                { options: null },
                { options: { $elemMatch: { $eq: "" } } }
            ]
        }).toArray();

        console.log(`Found ${problemDocs.length} questions with potential option issues.`);

        if (problemDocs.length > 0) {
            const byTest = {};
            problemDocs.forEach(d => {
                const tid = d.testId || d.test_id || 'Unknown';
                byTest[tid] = (byTest[tid] || 0) + 1;
            });
            console.log(`Breakdown by Test ID:`, JSON.stringify(byTest, null, 2));

            console.log(`\n📄 SAMPLE PROBLEM DOC (${problemDocs[0]._id}):`);
            console.log(JSON.stringify(problemDocs[0], null, 2));
        }

        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
}
run();
