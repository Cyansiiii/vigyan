const fs = require('fs');
const path = require('path');

const years = ['2024_s1', '2024_s2', '2025'];
const subjects = ['biology', 'chemistry', 'mathematics', 'physics'];

years.forEach(year => {
    const dir = path.join(__dirname, '../frontend/data/niser', year);
    if (!fs.existsSync(dir)) return;

    const data = { questions: {}, keys: {} };
    let totalQuestions = 0;

    subjects.forEach(sub => {
        const qFile = path.join(dir, `${sub}_q.json`);
        const kFile = path.join(dir, `${sub}_k.json`);

        const subCapitalized = sub.charAt(0).toUpperCase() + sub.slice(1);

        if (fs.existsSync(qFile)) {
            try {
                data.questions[subCapitalized] = JSON.parse(fs.readFileSync(qFile, 'utf8'));
                totalQuestions += data.questions[subCapitalized].length;
            } catch (e) {
                console.error(`Error parsing ${qFile}:`, e.message);
                data.questions[subCapitalized] = [];
            }
        } else {
            data.questions[subCapitalized] = [];
        }

        if (fs.existsSync(kFile)) {
            try {
                data.keys[subCapitalized] = JSON.parse(fs.readFileSync(kFile, 'utf8'));
            } catch (e) {
                console.error(`Error parsing ${kFile}:`, e.message);
                data.keys[subCapitalized] = [];
            }
        } else {
            data.keys[subCapitalized] = [];
        }
    });

    const outPath = path.join(dir, 'questions.json');
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
    console.log(`Merged ${year} -> ${outPath} (${totalQuestions} questions total)`);
});
