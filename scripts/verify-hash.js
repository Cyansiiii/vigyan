/**
 * 🛠️ VIGYAN.PREP DIAGNOSTIC TOOL
 * Use this to verify your password against the hash in Railway.
 * Run locally with: node scripts/verify-hash.js
 */

import bcrypt from 'bcryptjs';

// PASTE YOUR RAILWAY HASH HERE
const HASH_FROM_RAILWAY = '$2b$10$zY/M9S0z2vD1xIkPUCtDN.km4N0VrQCgZuhQebLPLPEqSSynDujgm';

// PASTE THE PASSWORD YOU ARE TRYING TO USE HERE
const PASSWORD_TO_TEST = 'ENTER_PASSWORD_HERE';

async function runTest() {
    console.log('🔍 Starting local hash verification...');
    console.log(`📡 Hash: ${HASH_FROM_RAILWAY}`);
    console.log(`🔑 Password to test: ${PASSWORD_TO_TEST}`);

    if (PASSWORD_TO_TEST === 'ENTER_PASSWORD_HERE') {
        console.warn('⚠️ Please edit this file and replace ENTER_PASSWORD_HERE with your actual password.');
        return;
    }

    try {
        const isMatch = await bcrypt.compare(PASSWORD_TO_TEST, HASH_FROM_RAILWAY);

        if (isMatch) {
            console.log('✅ SUCCESS! The password matches the hash.');
            console.log('👉 Action: Ensure your Railway variable for ADMIN_USERNAME is exactly "admin" with NO spaces.');
        } else {
            console.error('❌ FAILURE! The password does NOT match the hash.');
            console.error('👉 Action: Generate a new hash and update Railway.');

            const newHash = await bcrypt.hash(PASSWORD_TO_TEST, 10);
            console.log('\n✨ Here is a new hash for your password:');
            console.log(newHash);
        }
    } catch (err) {
        console.error('❌ Error during verification:', err.message);
    }
}

runTest();
