const axios = require('axios');

const API_URL = 'https://api.fennecapp.io';

// Use the token from the login test
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTgwNjE0MmQyNGZhZjQ1OWVkZTY3ZTAiLCJkZXZpY2VGaW5nZXJwcmludCI6IjlxYWR3YyIsInJvbGUiOiJzdXBlcl9hZG1pbiIsImlhdCI6MTc3MTMwNzQ3MywiZXhwIjoxNzc1NDU0NjczfQ.G_7iYMLA6YUIvPSq8fBpI5gxOTFLLnOZTu2j6yMaU3w';

async function testCreateRole() {
    console.log('Testing Create Role API...');

    const roleData = {
        title: 'Test Role',
        description: 'Test role description',
        resources: [
            {
                module: 'Users Management',
                permissions: ['view', 'edit']
            }
        ]
    };

    try {
        const response = await axios.post(`${API_URL}/admin/roles`, roleData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log('Success!');
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Failed!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
            console.error('Headers:', error.response.headers);
        } else {
            console.error('Error:', error.message);
        }
    }
}

testCreateRole();
