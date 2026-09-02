const assert = require('assert');
const format = require('../lib/format');
const security = require('../lib/security');
const validation = require('../lib/validation');

describe('email normalization', function () {
    it('lowercases and trims, and keeps Gmail +tags', function () {
        assert.strictEqual(security.normalizeEmail('  User+tag@Gmail.com  '), 'user+tag@gmail.com');
        assert.strictEqual(format.email('  User+tag@Gmail.com  '), 'user+tag@gmail.com');
        assert.strictEqual(validation.sanitizeEmail('  User+tag@Gmail.com  '), 'user+tag@gmail.com');
    });

    it('does not strip Gmail dots (matches stored format.email values)', function () {
        assert.strictEqual(security.normalizeEmail('first.last@gmail.com'), 'first.last@gmail.com');
        assert.strictEqual(format.email('first.last@gmail.com'), security.normalizeEmail('first.last@gmail.com'));
    });

    it('returns undefined for empty or non-string input', function () {
        assert.strictEqual(security.normalizeEmail(''), undefined);
        assert.strictEqual(security.normalizeEmail('   '), undefined);
        assert.strictEqual(security.normalizeEmail(null), undefined);
        assert.strictEqual(format.email(undefined), undefined);
    });
});

describe('password verification', function () {
    it('verifies bcrypt users when salt is null', async function () {
        const hashed = await security.saltHashPassword('CorrectHorse1');
        assert.strictEqual(hashed.salt, null);
        assert.strictEqual(await security.verifyPassword('CorrectHorse1', hashed), true);
        assert.strictEqual(await security.verifyPassword('wrong-password', hashed), false);
    });

    it('verifies legacy SHA-512 users and does not throw when salt is null', async function () {
        const salt = 'abcd1234abcd1234';
        const legacy = security.sha512('CorrectHorse1', salt);
        assert.strictEqual(await security.verifyPassword('CorrectHorse1', legacy), true);
        assert.strictEqual(await security.verifyPassword('wrong-password', legacy), false);
        assert.strictEqual(await security.verifyPassword('CorrectHorse1', { hash: legacy.hash, salt: null }), false);
        assert.strictEqual(await security.verifyPassword('CorrectHorse1', { hash: legacy.hash, salt: undefined }), false);
    });

    it('uses timing-safe compare for equal-length SHA-512 hashes', function () {
        assert.strictEqual(security.timingSafeEqualString('aa', 'aa'), true);
        assert.strictEqual(security.timingSafeEqualString('aa', 'ab'), false);
        assert.strictEqual(security.timingSafeEqualString('aa', 'aaa'), false);
    });
});

describe('request validation', function () {
    const mockResponder = () => {
        const calls = [];
        global.__responder = {
            error: (req, res, err) => {
                calls.push(err);
                res.statusCode = err.error.code;
            }
        };
        return calls;
    };

    it('reset-password path accepts email without a password', function (done) {
        const calls = mockResponder();
        const req = { body: { email: '  Reset.User+tag@Gmail.com ' } };
        const res = {};
        validation.validateEmailRequest(req, res, () => {
            assert.strictEqual(calls.length, 0);
            assert.strictEqual(req.body.email, 'reset.user+tag@gmail.com');
            done();
        });
    });

    it('authenticate path still requires a password', function () {
        const calls = mockResponder();
        const req = { body: { email: 'user@example.com' } };
        const res = {};
        validation.validateAuthRequest(req, res, () => {
            throw new Error('should not continue without a password');
        });
        assert.strictEqual(calls.length, 1);
        assert.strictEqual(calls[0].error.code, 400);
    });

    it('change-email path requires a password in middleware', function () {
        const calls = mockResponder();
        const req = { body: { email: '  New.User+tag@Gmail.com ' } };
        const res = {};
        validation.validateAuthRequest(req, res, () => {
            throw new Error('should not continue without a password');
        });
        assert.strictEqual(calls.length, 1);
        assert.strictEqual(calls[0].error.code, 400);
    });

    it('change-email path keeps lowercase+trim email when password is present', function (done) {
        const calls = mockResponder();
        const req = { body: { email: '  New.User+tag@Gmail.com ', password: 'CorrectHorse1' } };
        const res = {};
        validation.validateAuthRequest(req, res, () => {
            assert.strictEqual(calls.length, 0);
            assert.strictEqual(req.body.email, 'new.user+tag@gmail.com');
            done();
        });
    });
});

describe('change-email password gate', function () {
    it('rejects a wrong password and does not return the password', async function () {
        const hashed = await security.saltHashPassword('CorrectHorse1');
        const decision = await security.authorizeEmailChange({
            user: hashed,
            password: 'wrong-password',
            newEmail: '  Next.User+tag@Gmail.com '
        });
        assert.strictEqual(decision.allowed, false);
        assert.strictEqual(decision.code, 401);
        assert.strictEqual(decision.message, 'Invalid credentials');
        assert.ok(!Object.prototype.hasOwnProperty.call(decision, 'password'));
        assert.ok(!JSON.stringify(decision).includes('wrong-password'));
        assert.ok(!JSON.stringify(decision).includes('CorrectHorse1'));
    });

    it('allows a change when the current SHA-512 password is correct and normalizes email', async function () {
        const salt = 'abcd1234abcd1234';
        const legacy = security.sha512('CorrectHorse1', salt);
        const decision = await security.authorizeEmailChange({
            user: legacy,
            password: 'CorrectHorse1',
            newEmail: '  Next.User+tag@Gmail.com '
        });
        assert.strictEqual(decision.allowed, true);
        assert.strictEqual(decision.email, 'next.user+tag@gmail.com');
        assert.ok(!Object.prototype.hasOwnProperty.call(decision, 'password'));
    });

    it('allows a change for migrated bcrypt users (salt: null)', async function () {
        const hashed = await security.saltHashPassword('CorrectHorse1');
        assert.strictEqual(hashed.salt, null);
        const decision = await security.authorizeEmailChange({
            user: hashed,
            password: 'CorrectHorse1',
            newEmail: '  Migrated.User+tag@Gmail.com '
        });
        assert.strictEqual(decision.allowed, true);
        assert.strictEqual(decision.email, 'migrated.user+tag@gmail.com');
    });
});

describe('CORS allowlist', function () {
    it('trims entries and drops empties/placeholders', function () {
        assert.deepStrictEqual(
            security.parseAllowedOrigins(' https://app.example , ,https://api.example, xxx ', []),
            ['https://app.example', 'https://api.example']
        );
    });

    it('rejects all browser origins when the allowlist is empty or misconfigured', function () {
        assert.deepStrictEqual(security.parseAllowedOrigins('  ,  ', ['xxx']), []);
        assert.strictEqual(security.isOriginAllowed('https://evil.example', []), false);
        assert.strictEqual(security.isOriginAllowed(undefined, []), false);
    });

    it('allows no-Origin only when an allowlist exists; browsers still need an exact match', function () {
        const allowed = security.parseAllowedOrigins(undefined, ['https://app.example']);
        assert.strictEqual(security.isOriginAllowed(undefined, allowed), true);
        assert.strictEqual(security.isOriginAllowed('https://app.example', allowed), true);
        assert.strictEqual(security.isOriginAllowed('https://evil.example', allowed), false);
    });
});

describe('log redaction', function () {
    it('redacts passwords and other sensitive auth fields', function () {
        const redacted = security.redactSensitive({
            reqBody: {
                email: 'user@example.com',
                password: 'super-secret',
                old: 'old-secret',
                new: 'new-secret',
                header: { userId: '1' }
            },
            hash: 'abc',
            salt: 'def'
        });
        assert.strictEqual(redacted.reqBody.email, 'user@example.com');
        assert.strictEqual(redacted.reqBody.password, '[REDACTED]');
        assert.strictEqual(redacted.reqBody.old, '[REDACTED]');
        assert.strictEqual(redacted.reqBody.new, '[REDACTED]');
        assert.strictEqual(redacted.hash, '[REDACTED]');
        assert.strictEqual(redacted.salt, '[REDACTED]');
        assert.strictEqual(redacted.reqBody.header.userId, '1');
    });

    it('tools.log redacts reqBody passwords even when callers pass the raw body', function () {
        const tools = require('../lib/tools');
        const lines = [];
        const original = console.log;
        console.log = (line) => lines.push(String(line));
        try {
            tools.log('error', 'error in bllAuth.authenticate', {}, {
                reqBody: { email: 'user@example.com', password: 'super-secret' },
                reqAuthorization: { userId: '1' }
            });
        } finally {
            console.log = original;
        }
        const dumped = lines.join('\n');
        assert.ok(dumped.includes('[REDACTED]'));
        assert.ok(!dumped.includes('super-secret'));
        assert.ok(dumped.includes('user@example.com'));
    });
});

describe('rate-limit policy constants', function () {
    it('counts only failed auth attempts and keeps the API budget SPA/NAT-safe', function () {
        assert.strictEqual(security.AUTH_RATE_LIMIT.skipSuccessfulRequests, true);
        assert.ok(security.AUTH_RATE_LIMIT.max >= 10);
        assert.ok(security.API_RATE_LIMIT.max >= 600);
        assert.ok(!security.AUTH_FAILURE_LIMIT_PATHS.includes('/auth/auth'));
        assert.ok(security.AUTH_FAILURE_LIMIT_PATHS.includes('/auth/authenticate'));
        assert.ok(security.AUTH_FAILURE_LIMIT_PATHS.includes('/auth/reset-password'));
        assert.ok(!security.API_LIMIT_PATHS.includes('/health-check'));
        assert.ok(!security.API_LIMIT_PATHS.includes('/'));
    });
});
