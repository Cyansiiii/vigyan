
import axios from 'axios';

const API_BASE_URL = 'https://vigyan-production.up.railway.app';

async function testLogins() {
    const users = [
        { email: 'theonlysam82@gmail.com', rollNumber: '82841903' },
        { email: 'anandharsh437@gmail.com', rollNumber: '56936725' }
    ];

    for (const user of users) {
        console.log(`\n🚀 Testing login for ${user.email}...`);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/exam/start`, user, {
                timeout: 10000,
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('✅ Status:', response.status);
            console.log('✅ Response:', JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error(`❌ FAILED for ${user.email}`);
            if (error.response) {
                console.error('   Status:', error.response.status);
                console.error('   Data:', JSON.stringify(error.response.data, null, 2));
            } else {
                console.error('   Message:', error.message);
            }
        }
    }
}

testLogins();
