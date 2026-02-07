import fs from 'fs';
import path from 'path';

const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];
const baseDir = '/Users/harshanand/vigyan';
const outputBaseDir = path.join(baseDir, 'frontend/data/niser');

const b64Encode = (str) => Buffer.from(str).toString('base64');

years.forEach(year => {
    const filePath = path.join(baseDir, `frontend/js-exam/niser_exam_${year}.js`);
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Extract everything between const questionBank = { and the closing };
    // This is a bit naive but should work for the current structure
    const startTag = 'const questionBank = {';
    const startIndex = content.indexOf(startTag);
    if (startIndex === -1) {
        console.error(`Could not find questionBank in ${year}`);
        return;
    }

    // Find the matching closing brace for the questionBank object
    // Since we know the structure is fairly standard, we can find the end of the object
    // by looking for the next }; after a large block of content
    let braceCount = 1;
    let i = startIndex + startTag.length;
    let objectContent = '{';

    while (braceCount > 0 && i < content.length) {
        const char = content[i];
        objectContent += char;
        if (char === '{') braceCount++;
        if (char === '}') braceCount--;
        i++;
    }

    // Now we have the object literal as a string. 
    // To treat it as data, we'll strip 'const questionBank = ' and eval it in a restricted context
    try {
        // Use a function constructor to safely eval the object literal
        const getBank = new Function(`return ${objectContent}`);
        const questionBank = getBank();

        const yearDir = path.join(outputBaseDir, year.toString());
        if (!fs.existsSync(yearDir)) fs.mkdirSync(yearDir, { recursive: true });

        Object.keys(questionBank).forEach(section => {
            const questions = questionBank[section];
            const qData = [];
            const kData = {};

            questions.forEach((q, idx) => {
                // standardized Q format
                qData.push({
                    id: idx + 1,
                    text: q.text,
                    options: q.options
                });

                // standardized K format (Base64 capital letter)
                const letter = String.fromCharCode(65 + q.correct);
                kData[idx.toString()] = b64Encode(letter);
            });

            const subject = section.toLowerCase();
            fs.writeFileSync(path.join(yearDir, `${subject}_q.json`), JSON.stringify(qData, null, 4));
            fs.writeFileSync(path.join(yearDir, `${subject}_k.json`), JSON.stringify(kData, null, 4));
        });

        console.log(`✅ Successfully migrated NISER ${year}`);
    } catch (err) {
        console.error(`❌ Error parsing ${year}:`, err.message);
    }
});
