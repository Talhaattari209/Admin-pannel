const axios = require('axios');

const API_URL = 'https://api.fennecapp.io';
const LOGIN_ENDPOINT = '/admin/auth/login';
const email = 'superadmin@mailinator.com';
const password = 'go6Qnri&cQ1Rj1$N';

async function testSearchAPI() {
    console.log(`Logging in...`);
    try {
        const loginRes = await axios.post(`${API_URL}${LOGIN_ENDPOINT}`, {
            email: email,
            password: password
        });

        const data = loginRes.data?.data || loginRes.data;
        const token = data.accessToken || data.access_token;

        if (!token) {
            console.error('Login failed, no token.');
            return;
        }

        const testCases = [
            { label: 'Empty Search', params: {} },
            { label: 'Search "First" (search)', params: { search: 'First' } },
            { label: 'Filter Status "new"', params: { status: 'new' } },
            { label: 'Filter Status "pending"', params: { status: 'pending' } },
        ];

        console.log('\n--- Testing User Reports Search ---');
        for (const tc of testCases) {
            console.log(`\nTesting: ${tc.label} (${JSON.stringify(tc.params)})`);
            try {
                const res = await axios.get(`${API_URL}/admin/reported-problems/users`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    params: { ...tc.params, limit: 10 }
                });
                const reports = res.data?.data?.reports || res.data?.reports || [];
                console.log(`Result Count: ${reports.length}`);
                if (reports.length > 0) {
                    reports.forEach((r, i) => {
                        console.log(`  [${i}] ReportedBy: ${r.reportedBy?.name} (${r.reportedBy?.email}) | ReportedUser: ${r.reportedUser?.name} (${r.reportedUser?.email})`);
                    });
                }
            } catch (err) {
                console.error(`Error: ${err.message}`);
            }
        }

        console.log('\n--- Testing Bugs Search ---');
        for (const tc of testCases) {
            console.log(`\nTesting: ${tc.label} (${JSON.stringify(tc.params)})`);
            try {
                const res = await axios.get(`${API_URL}/admin/reported-problems`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    params: { ...tc.params, limit: 10 }
                });
                const reports = res.data?.data?.reports || res.data?.reports || [];
                console.log(`Result Count: ${reports.length}`);
                if (reports.length > 0) {
                    reports.forEach((r, i) => {
                        console.log(`  [${i}] ReportedBy (User): ${r.user?.name} (${r.user?.email}) | Subject: ${r.subject}`);
                    });
                }
            } catch (err) {
                console.error(`Error: ${err.message}`);
            }
        }

        console.log('\n--- Testing Users Management Search ---');
        for (const tc of testCases) {
            console.log(`\nTesting: ${tc.label} (${JSON.stringify(tc.params)})`);
            try {
                const res = await axios.get(`${API_URL}/admin/users`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    params: { ...tc.params, limit: 10 }
                });
                const users = res.data?.data?.users || res.data?.users || [];
                console.log(`Result Count: ${users.length}`);
                if (users.length > 0) {
                    users.forEach((u, i) => {
                        console.log(`  [${u._id}] Name: ${u.firstName} ${u.lastName} | Email: ${u.email}`);
                    });
                }
            } catch (err) {
                console.error(`Error: ${err.message}`);
            }
        }

        console.log('\n--- Testing Support Requests Search ---');
        for (const tc of testCases) {
            console.log(`\nTesting: ${tc.label} (${JSON.stringify(tc.params)})`);
            try {
                const res = await axios.get(`${API_URL}/admin/support-requests`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    params: { ...tc.params, limit: 10 }
                });
                const requests = res.data?.data?.supportRequests || res.data?.supportRequests || [];
                console.log(`Result Count: ${requests.length}`);
                if (requests.length > 0) {
                    requests.forEach((r, i) => {
                        console.log(`  [${r.id}] Name: ${r.user?.name} | Email: ${r.user?.email} | Subject: ${r.subject}`);
                    });
                }
            } catch (err) {
                console.error(`Error: ${err.message}`);
            }
        }

    } catch (error) {
        console.error('Login Error:', error.message);
    }
}

testSearchAPI();
