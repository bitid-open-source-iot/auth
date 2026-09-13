const assert = require('assert');
const http = require('http');
const fetch = require('node-fetch');

const AUTH = process.env.AUTH_URL || 'http://127.0.0.1:9000';
const EMAIL = process.env.SEED_EMAIL || 'admin@bitid.co.za';
const PASSWORD = process.env.SEED_PASSWORD || 'OpenThings1!';
const APP_ID = process.env.AUTH_APP_ID || '000000000000000000000002';
const USER_ID = process.env.BITID_USER_ID || '0000000000000000000000ad';

function authListening() {
    return new Promise(resolve => {
        const req = http.request({
            hostname: '127.0.0.1',
            port: 9000,
            path: '/',
            method: 'GET',
            timeout: 1000
        }, () => {
            req.destroy();
            resolve(true);
        });
        req.on('error', () => resolve(false));
        req.on('timeout', () => {
            req.destroy();
            resolve(false);
        });
        req.end();
    });
}

describe('/groups/list with no membership', function () {
    this.timeout(4000);

    it('returns 200 and [] instead of hanging', async function () {
        if (!(await authListening())) {
            this.skip();
        }

        const authn = await fetch(AUTH + '/auth/authenticate', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: EMAIL,
                password: PASSWORD,
                header: { appId: APP_ID }
            })
        });
        assert.strictEqual(authn.status, 200, 'authenticate should succeed');
        const authnBody = await authn.json();
        const token = Array.isArray(authnBody) ? authnBody[0].token : authnBody.token;
        assert.ok(token, 'authenticate should return a token');

        const started = Date.now();
        const response = await fetch(AUTH + '/groups/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.stringify(token)
            },
            body: JSON.stringify({
                header: {
                    appId: APP_ID,
                    email: EMAIL,
                    userId: USER_ID
                },
                filter: ['groupId', 'description'],
                getDevices: true
            })
        });
        const elapsed = Date.now() - started;
        const body = await response.json();

        assert.strictEqual(response.status, 200, 'groups/list should not 503 when the user has no groups: ' + JSON.stringify(body));
        assert.ok(Array.isArray(body), 'groups/list should return an array');
        assert.ok(elapsed < 3000, 'groups/list should return quickly, took ' + elapsed + 'ms');
    });
});
