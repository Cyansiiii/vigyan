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
        const collections = await db.listCollections().toArray();
        console.log("\n📊 COLLECTIONS IN DATABASE:");
        console.log(collections.map(c => c.name));

        process.exit(0);
    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
}
run();
