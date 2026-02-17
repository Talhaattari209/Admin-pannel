const axios = require('axios');

const API_URL = 'https://api.fennecapp.io';
const ENDPOINT = '/admin/auth/login';

const email = 'superadmin@mailinator.com';
const password = 'go6Qnri&cQ1Rj1$N';

async function testLogin() {
    console.log(`Attempting login to ${API_URL}${ENDPOINT} with garbage token`);
    console.log(`Email: ${email}`);

    try {
        const response = await axios.post(`${API_URL}${ENDPOINT}`, {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer garbage_token_example'
            }
        });

        console.log('Login Success (even with garbage token)!');
        console.log('Status:', response.status);

    } catch (error) {
        console.error('Login Failed with garbage token!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
        }
    }
}

testLogin();
