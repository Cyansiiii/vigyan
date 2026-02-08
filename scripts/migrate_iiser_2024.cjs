const fs = require('fs');
const path = require('path');

// 1. Read the input JS file (Format: const questionBank = { ... })
const inputPath = path.join(__dirname, '../frontend/js-exam/exam_2024.js');
const outputDir = path.join(__dirname, '../frontend/data/iiser/2024');

// Read file content
let content = fs.readFileSync(inputPath, 'utf8');

// 2. Extract the object safely
// Find the start of "const questionBank =" and the start of "document.addEventListener"
// We will extract the substring between them, or just use regex to match the object.
// Since the object is large and nested, simple regex might be fragile. 
// Better approach: remove everything after the object definition.
// The file structure is: 
// const questionBank = { ... };
// ... DOM code ...

const startIndex = content.indexOf('const questionBank =');
const endIndex = content.indexOf('// 2. EXAM ENGINE LOGIC'); // Or start of DOM code

if (startIndex === -1) {
    console.error('Could not find questionBank');
    process.exit(1);
}

let objectCode;
if (endIndex !== -1) {
    objectCode = content.substring(startIndex, endIndex);
} else {
    // If we can't find the separator, try to find the end of the object logic?
    // Let's assume the object ends before "let currentSection" or "document."
    const splitIndex = content.search(/(let currentSection|document\.)/);
    if (splitIndex !== -1) {
        objectCode = content.substring(startIndex, splitIndex);
    } else {
        objectCode = content;
    }
}

// Clean up: remove "const questionBank =" and trailing semicolon
objectCode = objectCode.replace(/const\s+questionBank\s*=\s*/, '').trim();
// Remove trailing semicolon if present
if (objectCode.endsWith(';')) {
    objectCode = objectCode.slice(0, -1);
}

// Evaluate securely (in sandbox/function)
const extractData = new Function(`
    return ${objectCode};
`);

const questionBank = extractData();

// 3. Process each section
const subjects = ['Biology', 'Chemistry', 'Mathematics', 'Physics'];

subjects.forEach(subject => {
    if (questionBank[subject]) {
        // Questions
        const questions = questionBank[subject].map(q => ({
            id: q.id,
            question: q.text,
            options: q.options
        }));

        // Keys (Base64 encoded correct answer index converted to letter? No, engine expects A/B/C/D encoded)
        // correct: 0 -> A, 1 -> B, etc.
        const keys = questionBank[subject].map(q => {
            const letter = String.fromCharCode(65 + q.correct); // 0->A
            return Buffer.from(letter).toString('base64');
        });

        // Write files
        fs.writeFileSync(path.join(outputDir, `${subject.toLowerCase()}_q.json`), JSON.stringify(questions, null, 4));
        fs.writeFileSync(path.join(outputDir, `${subject.toLowerCase()}_k.json`), JSON.stringify(keys, null, 4));

        console.log(`✅ Generated ${subject} JSONs`);
    }
});
