const axios = require('axios');

const API_URL = 'https://api.fennecapp.io';

async function testTeamMemberLogin() {
    console.log('Testing Team Member Login...');

    try {
        const response = await axios.post(`${API_URL}/admin/auth/login`, {
            email: 'johndoe@email.com',
            password: '12345678'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ SUCCESS!');
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('❌ FAILED!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
        }
    }
}

testTeamMemberLogin();
