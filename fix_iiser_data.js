const fs = require('fs');
const path = '/Users/harshanand/vigyan/frontend/data/iiser/2025';
const subjects = ['biology', 'chemistry', 'mathematics', 'physics'];

subjects.forEach(subject => {
    // Fix Questions (_q.json)
    const qPath = `${path}/${subject}_q.json`;
    if (fs.existsSync(qPath)) {
        try {
            const raw = fs.readFileSync(qPath, 'utf8');
            // Check if it's already fixed (Array)
            if (raw.trim().startsWith('[')) {
                console.log(`${subject}_q.json is already an array.`);
            } else {
                const data = JSON.parse(raw);
                // Extract the array from the wrapper key (e.g., "Biology")
                const key = Object.keys(data)[0];
                if (Array.isArray(data[key])) {
                    fs.writeFileSync(qPath, JSON.stringify(data[key], null, 4));
                    console.log(`Fixed ${subject}_q.json`);
                } else {
                    console.error(`Could not find array in ${subject}_q.json`);
                }
            }
        } catch (e) {
            console.error(`Error processing ${subject}_q.json:`, e.message);
        }
    }

    // Fix Keys (_k.json)
    const kPath = `${path}/${subject}_k.json`;
    if (fs.existsSync(kPath)) {
        try {
            const raw = fs.readFileSync(kPath, 'utf8');
            // Check if it's already potentially fixed (flat object with "0" key)
            if (raw.includes('"0":')) {
                console.log(`${subject}_k.json seems to be valid already.`);
            } else {
                const data = JSON.parse(raw);
                const key = Object.keys(data)[0];
                const keyArray = data[key];

                if (Array.isArray(keyArray)) {
                    const newKeys = {};
                    keyArray.forEach((item, index) => {
                        // Map 0-based index to the ans.
                        // Assuming the array order matches the question order.
                        // User IDs started at 1, but engine uses array index.
                        newKeys[index.toString()] = item.ans;
                    });
                    fs.writeFileSync(kPath, JSON.stringify(newKeys, null, 4));
                    console.log(`Fixed ${subject}_k.json`);
                } else {
                    console.error(`Could not find array in ${subject}_k.json`);
                }
            }
        } catch (e) {
            console.error(`Error processing ${subject}_k.json:`, e.message);
        }
    }
});
