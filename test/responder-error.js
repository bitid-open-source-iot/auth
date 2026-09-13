const assert = require('assert');
const responder = require('../lib/responder');

function mockRes() {
    let statusCode;
    let body;
    let headersSent = false;
    return {
        get headersSent() {
            return headersSent;
        },
        status(code) {
            statusCode = code;
            return this;
        },
        json(payload) {
            headersSent = true;
            body = payload;
            return this;
        },
        snapshot() {
            return { statusCode, body, headersSent };
        }
    };
}

describe('responder.error', function () {
    it('sends 503 instead of hanging when err.error is missing', function () {
        const module = new responder.module();
        const res = mockRes();
        module.error({}, res, new TypeError('Cannot read properties of undefined (reading \'reject\')'));
        const out = res.snapshot();
        assert.strictEqual(out.headersSent, true);
        assert.strictEqual(out.statusCode, 503);
        assert.strictEqual(out.body.code, 503);
    });

    it('still forwards a structured auth error payload', function () {
        const module = new responder.module();
        const res = mockRes();
        module.error({}, res, {
            error: {
                code: 401,
                message: 'unauthorized',
                errors: [{ code: 401, message: 'unauthorized' }]
            }
        });
        const out = res.snapshot();
        assert.strictEqual(out.statusCode, 401);
        assert.strictEqual(out.body.message, 'unauthorized');
        assert.strictEqual(out.body.errors[0].code, 401);
    });

    it('sends 503 JSON when err is undefined', function () {
        const module = new responder.module();
        const res = mockRes();
        module.error({ originalUrl: '/groups/list' }, res, undefined);
        const out = res.snapshot();
        assert.strictEqual(out.headersSent, true);
        assert.strictEqual(out.statusCode, 503);
        assert.ok(out.body);
        assert.strictEqual(out.body.code, 503);
    });

    it('sends 503 JSON when err is a string', function () {
        const module = new responder.module();
        const res = mockRes();
        module.error({}, res, 'boom');
        const out = res.snapshot();
        assert.strictEqual(out.headersSent, true);
        assert.strictEqual(out.statusCode, 503);
        assert.strictEqual(out.body.message, 'Internal server error!');
    });

    it('uses HTTP 503 when structured error has no code', function () {
        const module = new responder.module();
        const res = mockRes();
        module.error({}, res, {
            error: {
                message: 'missing code'
            }
        });
        const out = res.snapshot();
        assert.strictEqual(out.statusCode, 503);
        assert.strictEqual(out.body.message, 'missing code');
    });

    it('still forwards a structured 403 without changing the body', function () {
        const module = new responder.module();
        const res = mockRes();
        const payload = {
            code: 403,
            message: 'forbidden',
            errors: [{ code: 403, message: 'forbidden' }]
        };
        module.error({}, res, { error: payload });
        const out = res.snapshot();
        assert.strictEqual(out.statusCode, 403);
        assert.strictEqual(out.body, payload);
        assert.strictEqual(out.body.message, 'forbidden');
    });

    it('does not write a second body when headers were already sent', function () {
        const module = new responder.module();
        const res = mockRes();
        res.json({ already: true });
        module.error({}, res, {
            error: {
                code: 401,
                message: 'unauthorized'
            }
        });
        const out = res.snapshot();
        assert.strictEqual(out.headersSent, true);
        assert.deepStrictEqual(out.body, { already: true });
    });

    it('still sends 503 JSON when err cannot be stringified', function () {
        const module = new responder.module();
        const res = mockRes();
        const circular = {};
        circular.self = circular;
        module.error({}, res, circular);
        const out = res.snapshot();
        assert.strictEqual(out.headersSent, true);
        assert.strictEqual(out.statusCode, 503);
        assert.strictEqual(out.body.code, 503);
        assert.strictEqual(out.body.message, 'Internal server error!');
    });
});
