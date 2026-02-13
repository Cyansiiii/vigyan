console.log("📍 Current Directory:", process.cwd());
console.log("📦 Module Paths:", module.paths);
console.log("🌍 Sub-folders in current dir:", require('fs').readdirSync('.'));
if (require('fs').existsSync('node_modules')) {
    console.log("✅ node_modules folder exists here");
} else {
    console.log("❌ node_modules folder NOT found in current dir");
}
