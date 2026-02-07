
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadDir = path.join(__dirname, 'public/assets/scientists');

if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
}

const scientists = [
    { name: 'kalam', url: 'https://commons.wikimedia.org/wiki/File:A._P._J._Abdul_Kalam.jpg' },
    { name: 'bhabha', url: 'https://commons.wikimedia.org/wiki/File:Homi_Jehangir_Bhabha_1960s.jpg' },
    { name: 'sarabhai', url: 'https://commons.wikimedia.org/wiki/File:Vikram_Sarabhai.jpg' },
    { name: 'raman', url: 'https://commons.wikimedia.org/wiki/File:Sir_CV_Raman.JPG' },
    { name: 'bose-sn', url: 'https://commons.wikimedia.org/wiki/File:SatyenBose1925.jpg' },
    { name: 'ramanujan', url: 'https://commons.wikimedia.org/wiki/File:Srinivasa_Ramanujan_-_OPC_-_1.jpg' },
    { name: 'bose-jc', url: 'https://commons.wikimedia.org/wiki/File:Jagadish_Chandra_Bose_1926.jpg' },
    { name: 'kalpana', url: 'https://commons.wikimedia.org/wiki/File:Kalpana_Chawla,_NASA_photo_portrait_in_orange_suit.jpg' },
    { name: 'venki', url: 'https://commons.wikimedia.org/wiki/File:Venki_Ramakrishnan.jpg' },
    { name: 'chandrasekhar', url: 'https://commons.wikimedia.org/wiki/File:Subrahmanyan_Chandrasekhar.jpg' },
    { name: 'tessy', url: 'https://commons.wikimedia.org/wiki/File:Tessy_thomas.png' },
    { name: 'visvesvaraya', url: 'https://commons.wikimedia.org/wiki/File:Vishveshvarayya_in_his_30%27s.jpg' }
];

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else {
                reject(`Failed to download: ${response.statusCode}`);
            }
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err.message);
        });
    });
}

async function processScientist(scientist) {
    console.log(`Processing ${scientist.name}...`);
    try {
        const html = await fetchUrl(scientist.url);
        // Extract og:image
        const match = html.match(/<meta property="og:image" content="([^"]+)"/);
        if (match && match[1]) {
            const imageUrl = match[1];
            console.log(`Found image URL: ${imageUrl}`);
            // Fix file extension if needed (Tessy is png)
            let filename = `${scientist.name}.jpg`;
            if (imageUrl.toLowerCase().endsWith('.png')) {
                filename = `${scientist.name}.png`;
            }
            if (imageUrl.toLowerCase().endsWith('.jpeg')) {
                filename = `${scientist.name}.jpg`;
            }
            await downloadImage(imageUrl, path.join(downloadDir, filename));
            console.log(`Downloaded ${filename}`);
        } else {
            console.error(`Could not find og:image for ${scientist.name}`);
        }
    } catch (error) {
        console.error(`Error processing ${scientist.name}: ${error}`);
    }
}

async function main() {
    for (const scientist of scientists) {
        await processScientist(scientist);
    }
}

main();
