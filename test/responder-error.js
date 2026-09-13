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
    });
});
