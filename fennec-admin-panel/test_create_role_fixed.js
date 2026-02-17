const axios = require('axios');

const API_URL = 'https://api.fennecapp.io';

// Use the token from the login test
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTgwNjE0MmQyNGZhZjQ1OWVkZTY3ZTAiLCJkZXZpY2VGaW5nZXJwcmludCI6IjlxYWR3YyIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTc3MTMwNzQ3MywiZXhwIjoxNzc1NDU0NjczfQ.G_7iYMLA6YUIvPSq8fBpI5gxOTFLLnOZTu2j6yMaU3w';

async function testCreateRole() {
    console.log('Testing Create Role API with CORRECTED module names...');

    const roleData = {
        title: 'Test Content Manager',
        description: 'Can manage app content only',
        resources: [
            {
                module: 'users management',  // lowercase
                permissions: ['view']
            },
            {
                module: 'app content',  // lowercase
                permissions: ['view', 'edit', 'delete']
            }
        ]
    };

    console.log('Request payload:', JSON.stringify(roleData, null, 2));

    try {
        const response = await axios.post(`${API_URL}/admin/roles`, roleData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log('✅ SUCCESS!');
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2));
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

testCreateRole();
