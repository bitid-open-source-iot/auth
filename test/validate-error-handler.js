const assert = require('assert');
const http = require('http');
const express = require('express');
const Q = require('q');
const ErrorResponse = require('../lib/error-response');
const responder = require('../lib/responder');
const dal = require('../dal/dal');
const db = require('../db/mongo');
const tools = require('../lib/tools');

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

function handleValidateError(req, res, err) {
    tools.log('error', 'ERROR IN API app.use.validate', err, { reqOriginalUrl: req.originalUrl, reqBody: req?.body, reqAuthorization: req?.authorization });
    try {
        err = ErrorResponse.applyStatus(err, 401);
        __responder.error(req, res, err);
    } catch (e) {
        __responder.error(req, res, ErrorResponse.applyStatus(e, 401));
    }
}

describe('ErrorResponse.applyStatus', function () {
    it('does not throw when err.error is missing (prod crash shape)', function () {
        const err = new TypeError("Cannot read properties of undefined (reading 'error')");
        const out = ErrorResponse.applyStatus(err, 401);
        assert.strictEqual(out.error.code, 401);
        assert.strictEqual(out.error.errors[0].code, 401);
        assert.ok(out.error.message);
    });

    it('does not throw when err is undefined', function () {
        const out = ErrorResponse.applyStatus(undefined, 401);
        assert.strictEqual(out.error.code, 401);
        assert.strictEqual(out.error.errors[0].code, 401);
    });

    it('does not throw when err is a string', function () {
        const out = ErrorResponse.applyStatus('Token not found', 401);
        assert.strictEqual(out.error.code, 401);
        assert.strictEqual(out.error.message, 'Request failed');
    });

    it('keeps a structured token-not-found payload and sets 401', function () {
        const err = {
            error: {
                code: 503,
                message: 'error in dalAuth.validate',
                errors: [{ code: 503, reason: 'token not found', message: 'token not found' }]
            }
        };
        const out = ErrorResponse.applyStatus(err, 401);
        assert.strictEqual(out.error.code, 401);
        assert.strictEqual(out.error.errors[0].code, 401);
        assert.strictEqual(out.error.errors[0].message, 'token not found');
        assert.strictEqual(out.error.message, 'error in dalAuth.validate');
    });

    it('fills missing errors[] before assigning codes', function () {
        const out = ErrorResponse.applyStatus({ error: { code: 401, message: 'unauthorized' } }, 401);
        assert.strictEqual(out.error.code, 401);
        assert.strictEqual(out.error.errors[0].code, 401);
    });

    it('applies an override message for the 503 fallback handler', function () {
        const out = ErrorResponse.applyStatus(undefined, 503, 'Something broke');
        assert.strictEqual(out.error.code, 503);
        assert.strictEqual(out.error.message, 'Something broke');
        assert.strictEqual(out.error.errors[0].message, 'Something broke');
    });
});

describe('validate fail handler (index.js ~line 116)', function () {
    before(function () {
        global.__responder = new responder.module();
    });

    it('sends 401 JSON for a TypeError and does not throw', function () {
        const res = mockRes();
        handleValidateError({ originalUrl: '/', body: {} }, res, new TypeError("Cannot read properties of undefined (reading 'expiry')"));
        const out = res.snapshot();
        assert.strictEqual(out.headersSent, true);
        assert.strictEqual(out.statusCode, 401);
        assert.strictEqual(out.body.code, 401);
        assert.ok(out.body.message);
    });

    it('sends 401 JSON when the reject value is undefined', function () {
        const res = mockRes();
        handleValidateError({ originalUrl: '/' }, res, undefined);
        const out = res.snapshot();
        assert.strictEqual(out.headersSent, true);
        assert.strictEqual(out.statusCode, 401);
        assert.strictEqual(out.body.code, 401);
    });

    it('still forwards a structured token-not-found 401', function () {
        const res = mockRes();
        handleValidateError({ originalUrl: '/' }, res, {
            error: {
                code: 401,
                message: 'error in dalAuth.validate',
                errors: [{ code: 401, reason: 'token not found', message: 'token not found' }]
            }
        });
        const out = res.snapshot();
        assert.strictEqual(out.statusCode, 401);
        assert.strictEqual(out.body.errors[0].message, 'token not found');
    });
});

describe('dalAuth.validate missing token', function () {
    const originalCall = db.call;

    afterEach(function () {
        db.call = originalCall;
    });

    it('rejects 401 token-not-found and does not throw on authorization.expiry', function () {
        db.call = () => Q.reject({ code: 503, message: 'no db' });

        const args = {
            req: {
                headers: {},
                body: {
                    header: {
                        appId: '000000000000000000000002',
                        userId: '0000000000000000000000ad'
                    },
                    scope: '/'
                }
            }
        };

        return new dal.module().auth.validate(args).then(() => {
            throw new Error('expected reject');
        }, err => {
            assert.ok(err && err.error, 'should reject a structured error, not throw');
            assert.strictEqual(err.error.code, 401);
            assert.ok(/token not found/i.test(err.error.errors[0].message));
        });
    });
});

describe('in-process tokenless POST /', function () {
    let server;
    let port;

    before(function (done) {
        global.__responder = new responder.module();
        const app = express();
        app.use(express.json());
        app.use((req, res, next) => {
            if (req.method != 'GET' && req.method != 'PUT' && req.originalUrl != '/auth/auth' && req.originalUrl != '/kubernetes') {
                const myModule = new dal.module();
                myModule.auth.validate = () => Q.reject(new TypeError("Cannot read properties of undefined (reading 'error')"));
                myModule.auth.validate({ req, res }).then(() => {
                    next();
                }, err => {
                    handleValidateError(req, res, err);
                });
            } else {
                next();
            }
        });
        app.use('/', (req, res) => {
            res.status(200).json({ ok: true });
        });
        server = http.createServer(app);
        server.listen(0, '127.0.0.1', () => {
            port = server.address().port;
            done();
        });
    });

    after(function (done) {
        server.close(done);
    });

    it('returns 401 JSON and the process stays alive', function (done) {
        const req = http.request({
            hostname: '127.0.0.1',
            port,
            path: '/',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, res => {
            let raw = '';
            res.on('data', chunk => { raw += chunk; });
            res.on('end', () => {
                try {
                    assert.strictEqual(res.statusCode, 401);
                    const body = JSON.parse(raw);
                    assert.strictEqual(body.code, 401);
                    http.request({
                        hostname: '127.0.0.1',
                        port,
                        path: '/',
                        method: 'GET'
                    }, second => {
                        try {
                            assert.strictEqual(second.statusCode, 200);
                            done();
                        } catch (e) {
                            done(e);
                        }
                    }).on('error', done).end();
                } catch (e) {
                    done(e);
                }
            });
        });
        req.on('error', done);
        req.end(JSON.stringify({ header: {} }));
    });
});
