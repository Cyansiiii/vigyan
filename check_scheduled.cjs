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
        const collection = db.collection('scheduledtests');

        const tests = await collection.find().toArray();
        console.log(`\n📊 SCHEDULED TESTS (${tests.length}):`);
        tests.forEach(t => {
            console.log(`- ID: ${t._id}, Name: ${t.testName || t.test_name}, Status: ${t.status}`);
            if (t.sections) {
                console.log(`  - Sections: ${t.sections.length}`);
                t.sections.forEach(s => {
                    const qCount = s.questions ? s.questions.length : 0;
                    console.log(`    - ${s.subjectName || s.sectionName}: ${qCount} questions`);
                });
            }
        });

        if (tests.length > 0) {
            console.log("\n📄 SAMPLE TEST DATA:");
            console.log(JSON.stringify(tests[0], null, 2));
        }

        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
}
run();
