const axios = require('axios');

const API_URL = 'https://api.fennecapp.io';
const LOGIN_ENDPOINT = '/admin/auth/login';
const email = 'superadmin@mailinator.com';
const password = 'go6Qnri&cQ1Rj1$N';

async function testSuperAdminRoutes() {
    console.log(`Attempting login to ${API_URL}${LOGIN_ENDPOINT}`);

    try {
        const loginRes = await axios.post(`${API_URL}${LOGIN_ENDPOINT}`, {
            email: email,
            password: password
        });

        console.log('Login Success!');
        const data = loginRes.data?.data || loginRes.data;
        const token = data.accessToken || data.access_token;

        if (!token) {
            console.error('No token found in response!', JSON.stringify(loginRes.data, null, 2));
            return;
        }

        console.log('Token extracted successfully.');

        const routesToTest = [
            '/admin/app-settings',
            '/admin/app-content/individual-prompts?page=1&limit=10',
            '/admin/app-content/legal-content',
            '/admin/app-content/faqs'
        ];

        for (const route of routesToTest) {
            console.log(`\nTesting Route: ${route}`);
            try {
                const res = await axios.get(`${API_URL}${route}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(`✅ SUCCESS [${res.status}]:`, route);
                // console.log('Data:', JSON.stringify(res.data).substring(0, 100) + '...');
            } catch (error) {
                console.error(`❌ FAILED [${error.response?.status || 'ERR'}]:`, route);
                if (error.response) {
                    console.error('Response Data:', JSON.stringify(error.response.data));
                } else {
                    console.error('Error Message:', error.message);
                }
            }
        }

    } catch (error) {
        console.error('Login Failed!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
        }
    }
}

testSuperAdminRoutes();
