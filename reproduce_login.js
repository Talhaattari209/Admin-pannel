const axios = require('axios');

const API_URL = 'https://api.fennecapp.io';
const ENDPOINT = '/admin/auth/login';

const email = 'superadmin@mailinator.com';
const password = 'go6Qnri&cQ1Rj1$N';

async function testLogin() {
    console.log(`Attempting login to ${API_URL}${ENDPOINT}`);
    console.log(`Email: ${email}`);
    // console.log(`Password: ${password}`); // Don't log password in production logs, but here for local debugging it's in the code

    try {
        const response = await axios.post(`${API_URL}${ENDPOINT}`, {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Login Success!');
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.error('Login Failed!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
    }
}

testLogin();
