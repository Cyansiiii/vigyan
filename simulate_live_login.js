
import axios from 'axios';

const API_BASE_URL = 'https://vigyan-production.up.railway.app';

async function simulateLogin() {
    const payload = {
        email: 'theonlysam82@gmail.com',
        rollNumber: '82841903'
    };

    console.log(`🚀 Attempting login for ${payload.email} at ${API_BASE_URL}/api/exam/start...`);

    try {
        const response = await axios.post(`${API_BASE_URL}/api/exam/start`, payload, {
            timeout: 15000,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ Status Code:', response.status);
        console.log('✅ Response Body:', JSON.stringify(response.data, null, 2));

        if (response.data.success) {
            console.log('🎉 Login successful at API level!');
        } else {
            console.log('⚠️ API returned success: false');
        }
    } catch (error) {
        console.error('❌ Login Error:');
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('   Message:', error.message);
        }
    }
}

simulateLogin();
