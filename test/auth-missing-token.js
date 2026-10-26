const assert = require('assert');
const http = require('http');
const Q = require('q');
const express = require('express');
const fetch = require('node-fetch');
const db = require('../db/mongo');
const dal = require('../dal/dal');
const responder = require('../lib/responder');
const ErrorResponse = require('../lib/error-response');

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

function missingTokenArgs() {
    return {
        req: {
            headers: {},
            body: {
                header: {},
                scope: '/'
            },
            authorization: {}
        }
    };
}

describe('ErrorResponse.ensure', function () {
    it('lets a 401 be applied when err.error is missing (prod crash)', function () {
        const err = new TypeError("Cannot set properties of undefined (setting 'expiry')");
        assert.throws(() => {
            err.error.code = 401;
        }, {
            name: 'TypeError',
            message: /Cannot set properties of undefined \(setting 'code'\)/
        });

        const payload = ErrorResponse.ensure(err, 401);
        payload.error.code = 401;
        payload.error.errors[0].code = 401;
        assert.strictEqual(payload.error.code, 401);
        assert.strictEqual(payload.error.errors[0].code, 401);
        assert.strictEqual(payload.error.message, 'Unauthorized');
    });

    it('keeps a structured token-not-found payload', function () {
        const err = {
            error: {
                code: 401,
                message: 'error in dalAuth.validate',
                errors: [{
                    code: 401,
                    reason: 'token not found',
                    message: 'token not found'
                }]
            }
        };
        const payload = ErrorResponse.ensure(err, 401);
        assert.strictEqual(payload.error.code, 401);
        assert.strictEqual(payload.error.errors[0].message, 'token not found');
    });

    it('normalizes undefined and string rejects', function () {
        assert.strictEqual(ErrorResponse.ensure(undefined, 401).error.code, 401);
        assert.strictEqual(ErrorResponse.ensure('boom', 503).error.code, 503);
        const missingErrors = ErrorResponse.ensure({ error: { message: 'x' } }, 401);
        assert.strictEqual(missingErrors.error.code, 401);
        assert.strictEqual(missingErrors.error.errors[0].code, 401);
    });
});

describe('validate reject handler (index.js:116 path)', function () {
    it('sends 401 JSON instead of throwing when the reject is a TypeError', function () {
        const module = new responder.module();
        const res = mockRes();
        const err = new TypeError("Cannot set properties of undefined (setting 'expiry')");
        module.error({}, res, ErrorResponse.ensure(err, 401));
        const out = res.snapshot();
        assert.strictEqual(out.headersSent, true);
        assert.strictEqual(out.statusCode, 401);
        assert.strictEqual(out.body.code, 401);
    });
});

describe('dalAuth.validate missing token', function () {
    const originalCall = db.call;

    beforeEach(function () {
        db.call = () => Q.reject(new Error('db unavailable for unit test'));
    });

    afterEach(function () {
        db.call = originalCall;
    });

    it('rejects 401 and does not throw when Authorization is missing', function () {
        return new dal.module().auth.validate(missingTokenArgs()).then(() => {
            throw new Error('expected reject');
        }, err => {
            assert.ok(err && err.error, 'should reject with a structured error, not a raw TypeError');
            assert.strictEqual(err.error.code, 401);
            assert.ok(!/Cannot set properties of undefined/.test(err && err.message));
            assert.strictEqual(err.error.errors[0].message, 'token not found');
        });
    });

    it('rejects 401 and does not throw when Authorization is not JSON', function () {
        const args = missingTokenArgs();
        args.req.headers.authorization = 'not-json';
        return new dal.module().auth.validate(args).then(() => {
            throw new Error('expected reject');
        }, err => {
            assert.ok(err && err.error, 'should reject with a structured error, not a raw TypeError');
            assert.strictEqual(err.error.code, 401);
            assert.strictEqual(err.error.errors[0].message, 'invalid token object');
        });
    });
});

describe('in-process HTTP missing-token POST /', function () {
    let server;
    let port;
    const originalCall = db.call;

    before(function (done) {
        db.call = () => Q.reject(new Error('db unavailable for unit test'));
        global.__responder = new responder.module();
        const app = express();
        app.use(express.json());
        app.use((req, res, next) => {
            if (!req.body) {
                req.body = {};
            }
            req.body.scope = req.originalUrl;
            new dal.module().auth.validate({ req, res }).then(() => {
                next();
            }, err => {
                try {
                    __responder.error(req, res, ErrorResponse.ensure(err, 401));
                } catch (e) {
                    if (!res.headersSent) {
                        res.status(401).json({
                            code: 401,
                            message: 'Unauthorized'
                        });
                    }
                }
            });
        });
        app.post('/', (req, res) => {
            res.json({ ok: true });
        });
        server = http.createServer(app).listen(0, '127.0.0.1', () => {
            port = server.address().port;
            done();
        });
    });

    after(function (done) {
        db.call = originalCall;
        if (!server) {
            return done();
        }
        server.close(done);
    });

    it('returns 401 JSON and keeps the process alive', async function () {
        const response = await fetch('http://127.0.0.1:' + port + '/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ header: {} }),
            timeout: 2000
        });
        assert.strictEqual(response.status, 401);
        const body = await response.json();
        assert.strictEqual(body.code, 401);
        const again = await fetch('http://127.0.0.1:' + port + '/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ header: {} }),
            timeout: 2000
        });
        assert.strictEqual(again.status, 401, 'server should still be listening after the first missing-token request');
    });
});
