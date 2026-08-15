/*
 * Idempotent local-development seed for the auth service.
 *
 * Creates, so you can sign in through the telemetry UI without the SMTP-based
 * registration flow and so token validation succeeds:
 *   - all auth + telemetry API scopes in tblScopes (dalAuth.validate requires a
 *     tblScopes document whose url matches each requested scope),
 *   - the "OpenThings" application (appId 000000000000000000000002) the
 *     telemetry SPA authenticates against, and
 *   - a pre-verified developer user with a known password.
 *
 * Password hashing mirrors lib/tools.js -> encryption.sha512 (HMAC-SHA512,
 * salt used as the HMAC key).
 *
 * Usage: node .cursor/seed-dev-user.js
 * Overridable via env: SEED_MONGO_URL, SEED_MONGO_DB, SEED_EMAIL, SEED_PASSWORD
 */
const crypto = require('crypto');
const { MongoClient, ObjectId } = require('mongodb');

const URL = process.env.SEED_MONGO_URL || 'mongodb://127.0.0.1:27017';
const DB = process.env.SEED_MONGO_DB || 'auth';
const EMAIL = (process.env.SEED_EMAIL || 'dev@local.test').toLowerCase();
const PASSWORD = process.env.SEED_PASSWORD || 'OpenThings1!';

const APP_ID = new ObjectId('000000000000000000000002');
const USER_ID = new ObjectId('0000000000000000000000aa');

function sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return { salt, hash: hash.digest('hex') };
}

// Auth service scopes (mirrors db/scripts/create_auth_scopes.js).
const authScopes = ['*',
    '/apps/add', '/apps/change-owner', '/apps/delete', '/apps/get', '/apps/is-admin',
    '/apps/list', '/apps/load', '/apps/manifest', '/apps/share', '/apps/unsubscribe',
    '/apps/update', '/apps/update-subscriber',
    '/auth/allow-access', '/auth/allowaccess', '/auth/auth', '/auth/authenticate',
    '/auth/change-email', '/auth/change-password', '/auth/register', '/auth/reset-password',
    '/auth/validate', '/auth/verify',
    '/config/get',
    '/features/add', '/features/delete', '/features/get', '/features/list', '/features/update',
    '/groups/add', '/groups/change-owner', '/groups/delete', '/groups/get', '/groups/list',
    '/groups/share', '/groups/unsubscribe', '/groups/update', '/groups/update-subscriber',
    '/scopes/add', '/scopes/delete', '/scopes/get', '/scopes/list', '/scopes/update',
    '/statistics/usage',
    '/tips-and-updates/add', '/tips-and-updates/delete', '/tips-and-updates/get',
    '/tips-and-updates/list', '/tips-and-updates/update',
    '/tokens/change-owner', '/tokens/generate', '/tokens/get', '/tokens/list', '/tokens/retrieve',
    '/tokens/revoke', '/tokens/share', '/tokens/unsubscribe', '/tokens/update', '/tokens/update-subscriber',
    '/users/delete', '/users/get', '/users/list', '/users/update'
];

// Telemetry service scopes (mount prefix -> route paths that get validated).
const telemetryMap = {
    '/telemetry/devices': ['get', 'add', 'listbysubscriptiontoken', 'list', 'share', 'write',
        'writemany', 'writemanyarray', 'update', 'update-fields', 'delete', 'quick-add', 'historical',
        'historical/get', 'unsubscribe', 'change-owner', 'update-subscriber', 'historical/inputs',
        'processdevicedata', 'toggle-alerts'],
    '/telemetry/zones': ['get', 'add', 'list', 'share', 'write', 'update', 'delete', 'unsubscribe',
        'change-owner', 'update-subscriber'],
    '/telemetry/components': ['get', 'add', 'list', 'share', 'update', 'delete', 'unsubscribe',
        'change-owner', 'update-subscriber'],
    '/telemetry/mimics': ['get', 'add', 'list', 'share', 'update', 'delete', 'unsubscribe',
        'change-owner', 'update-subscriber', 'log-alert-occurred', 'log-alert-acknowledged'],
    '/telemetry/drivers': ['add', 'get', 'list', 'share', 'update', 'delete', 'unsubscribe',
        'change-owner', 'update-subscriber'],
    '/telemetry/devicetypes': ['add', 'get', 'list', 'share', 'update', 'delete', 'quick-add',
        'unsubscribe', 'change-owner', 'update-subscriber'],
    '/telemetry/device-types': ['add', 'get', 'list', 'share', 'update', 'delete', 'quick-add',
        'unsubscribe', 'change-owner', 'update-subscriber'],
    '/telemetry/control': ['mqtt', 'fromapp'],
    '/telemetry/reports': ['prediction', 'historical'],
    '/telemetry/rtu': ['sigfox']
};

function buildScopes() {
    const urls = new Set(authScopes);
    for (const [prefix, paths] of Object.entries(telemetryMap)) {
        paths.forEach(p => urls.add(prefix + '/' + p));
    }
    return [...urls];
}

(async () => {
    const client = await MongoClient.connect(URL, { useUnifiedTopology: true });
    const db = client.db(DB);

    // Scopes (idempotent upsert by url).
    const scopes = buildScopes();
    for (const url of scopes) {
        await db.collection('tblScopes').updateOne(
            { url: url },
            { $set: { url: url, appId: APP_ID, decription: url, serverDate: new Date() } },
            { upsert: true }
        );
    }

    // Developer user (pre-verified).
    const salt = crypto.randomBytes(8).toString('hex');
    const { hash } = sha512(PASSWORD, salt);
    await db.collection('tblUsers').updateOne(
        { email: EMAIL },
        {
            $set: {
                email: EMAIL, salt: salt, hash: hash, validated: 1,
                name: { first: 'Dev', middle: '', last: 'User' },
                picture: '', language: 'en', timezone: 0, username: EMAIL,
                serverDate: new Date()
            },
            $setOnInsert: { _id: USER_ID }
        },
        { upsert: true }
    );
    const user = await db.collection('tblUsers').findOne({ email: EMAIL });

    // OpenThings application (appId ...0002) the telemetry SPA logs in against.
    await db.collection('tblApps').updateOne(
        { _id: APP_ID },
        {
            $set: {
                name: 'OpenThings', url: '127.0.0.1:8000', private: false,
                bitid: {
                    auth: {
                        apps: [{ id: APP_ID, role: 4 }],
                        users: [{ id: user._id, role: 5 }],
                        groups: [], private: false, organizationOnly: 0
                    }
                },
                domains: ['127.0.0.1:8000', 'localhost:8000', '127.0.0.1:9000', 'localhost:9000'],
                theme: { color: '#1976d2', background: '#FFFFFF' },
                serverDate: new Date()
            }
        },
        { upsert: true }
    );

    console.log('Seeded auth dev login:');
    console.log('  scopes : ' + scopes.length + ' entries in tblScopes');
    console.log('  app    : OpenThings (appId ' + APP_ID.toString() + ')');
    console.log('  userId : ' + user._id.toString());
    console.log('  email  : ' + EMAIL);
    console.log('  password: ' + PASSWORD);

    await client.close();
})().catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
});
