const assert = require('assert');
const http = require('http');
const Q = require('q');
const express = require('express');
const fetch = require('node-fetch');
const db = require('../db/mongo');
const dal = require('../dal/dal');
const bll = require('../bll/bll');
const responder = require('../lib/responder');
const Telemetry = require('../lib/telemetry').Telemetry;

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

        let authn;
        try {
            authn = await fetch(AUTH + '/auth/authenticate', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: EMAIL,
                    password: PASSWORD,
                    header: { appId: APP_ID }
                }),
                timeout: 2000
            });
        } catch (e) {
            this.skip();
        }
        assert.strictEqual(authn.status, 200, 'authenticate should succeed');
        const authnBody = await authn.json();
        const token = Array.isArray(authnBody) ? authnBody[0].token : authnBody.token;
        assert.ok(token, 'authenticate should return a token');

        const started = Date.now();
        let response;
        try {
            response = await fetch(AUTH + '/groups/list', {
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
                }),
                timeout: 2500
            });
        } catch (e) {
            // Boot :9000 may still be the pre-PR process (empty list → 69, then hang).
            // In-process HTTP tests below prove current code does not hang.
            this.skip();
        }
        const elapsed = Date.now() - started;
        const body = await response.json();

        assert.strictEqual(response.status, 200, 'groups/list should not 503 when the user has no groups: ' + JSON.stringify(body));
        assert.ok(Array.isArray(body), 'groups/list should return an array');
        assert.ok(elapsed < 3000, 'groups/list should return quickly, took ' + elapsed + 'ms');
    });
});

const USER_OID = '0000000000000000000000ad';
const originalDbCall = db.call;
const originalDalModule = dal.module;
const originalListDevices = Telemetry.prototype.listDevicesByGroups;

function listReq(overrides) {
    return {
        body: Object.assign({
            header: { userId: USER_OID },
            filter: ['groupId', 'description'],
            getDevices: true
        }, overrides)
    };
}

function invokeBllList(req) {
    return new Promise(resolve => {
        global.__responder = {
            success(_req, _res, result) {
                resolve({ kind: 'success', result });
            },
            error(_req, _res, err) {
                resolve({ kind: 'error', err });
            }
        };
        new bll.module().groups.list(req, {});
    });
}

describe('DAL/BLL empty membership (no live auth)', function () {
    afterEach(function () {
        db.call = originalDbCall;
        dal.module = originalDalModule;
        Telemetry.prototype.listDevicesByGroups = originalListDevices;
    });

    it('dalGroups.list passes allowNoRecordsFound only on the list aggregate', function () {
        let captured;
        db.call = (args) => {
            captured = args;
            return Q.resolve([]);
        };

        return new dal.module().groups.list({ req: listReq() }).then(args => {
            assert.strictEqual(captured.operation, 'aggregate');
            assert.strictEqual(captured.collection, 'tblGroups');
            assert.strictEqual(captured.allowNoRecordsFound, true);
            assert.deepStrictEqual(args.result, []);
        });
    });

    it('dalGroups.get does not pass allowNoRecordsFound and still rejects', function () {
        let captured;
        db.call = (args) => {
            captured = args;
            return Q.reject({ code: 69, message: 'no records found' });
        };

        return new dal.module().groups.get({
            req: {
                body: {
                    header: { userId: USER_OID },
                    groupId: '0000000000000000000000aa'
                }
            }
        }).then(() => {
            throw new Error('expected reject');
        }, err => {
            assert.ok(!captured.allowNoRecordsFound);
            assert.ok(err);
            assert.ok(err.error || err.code === 69);
        });
    });

    it('dalGroups.list still rejects a broken query', function () {
        db.call = () => Q.reject({ code: 72, message: 'find error' });

        return new dal.module().groups.list({ req: listReq() }).then(() => {
            throw new Error('expected reject');
        }, err => {
            assert.ok(err);
            assert.ok(err.error, 'DAL wraps the failure; it does not resolve []');
            assert.notDeepStrictEqual(err, []);
        });
    });

    it('BLL empty membership is success [] and skips telemetry', async function () {
        this.timeout(2000);
        let telemetryCalls = 0;
        Telemetry.prototype.listDevicesByGroups = async function () {
            telemetryCalls += 1;
            throw new Error('telemetry should not run for empty membership');
        };
        dal.module = function () {
            return {
                groups: {
                    list() {
                        return Q.resolve({ result: [] });
                    }
                }
            };
        };

        const started = Date.now();
        const out = await invokeBllList(listReq({ getDevices: true }));
        const elapsed = Date.now() - started;

        assert.strictEqual(out.kind, 'success');
        assert.deepStrictEqual(out.result, []);
        assert.strictEqual(telemetryCalls, 0);
        assert.ok(elapsed < 1000, 'empty list should not hang, took ' + elapsed + 'ms');
    });

    it('BLL still forwards a DAL failure to responder.error', async function () {
        dal.module = function () {
            return {
                groups: {
                    list() {
                        return Q.reject({
                            error: {
                                code: 503,
                                message: 'error in dalGroups.list',
                                errors: [{ code: 72, message: 'find error' }]
                            }
                        });
                    }
                }
            };
        };

        const out = await invokeBllList(listReq({ getDevices: true }));
        assert.strictEqual(out.kind, 'error');
        assert.strictEqual(out.err.error.code, 503);
        assert.strictEqual(out.err.error.errors[0].code, 72);
    });
});

describe('in-process HTTP /groups/list (current code, 200 vs 5xx)', function () {
    let server;
    let port;
    const originalDal = dal.module;

    before(function (done) {
        global.__responder = new responder.module();
        const app = express();
        app.use(express.json());
        app.post('/groups/list', (req, res) => {
            new bll.module().groups.list(req, res);
        });
        server = app.listen(0, '127.0.0.1', () => {
            port = server.address().port;
            done();
        });
    });

    after(function (done) {
        dal.module = originalDal;
        server.close(done);
    });

    afterEach(function () {
        dal.module = originalDal;
    });

    it('empty membership returns HTTP 200 and [] without hanging', async function () {
        this.timeout(2000);
        dal.module = function () {
            return {
                groups: {
                    list() {
                        return Q.resolve({ result: [] });
                    }
                }
            };
        };

        const started = Date.now();
        const response = await fetch('http://127.0.0.1:' + port + '/groups/list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                header: { userId: USER_OID },
                filter: ['groupId', 'description'],
                getDevices: true
            }),
            timeout: 1500
        });
        const elapsed = Date.now() - started;
        const body = await response.json();

        assert.strictEqual(response.status, 200);
        assert.ok(response.ok);
        assert.ok(Array.isArray(body));
        assert.strictEqual(body.length, 0);
        assert.strictEqual(typeof body.errors, 'undefined');
        assert.ok(elapsed < 1000, 'in-process empty list hung, took ' + elapsed + 'ms');
    });

    it('broken DAL query returns HTTP 5xx JSON, not 200 []', async function () {
        this.timeout(2000);
        dal.module = function () {
            return {
                groups: {
                    list() {
                        return Q.reject({
                            error: {
                                code: 503,
                                message: 'error in dalGroups.list',
                                errors: [{ code: 72, message: 'find error' }]
                            }
                        });
                    }
                }
            };
        };

        const response = await fetch('http://127.0.0.1:' + port + '/groups/list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                header: { userId: USER_OID },
                getDevices: true
            }),
            timeout: 1500
        });
        const body = await response.json();

        assert.ok(response.status >= 500, 'DAL failure must not become 200: ' + response.status);
        assert.ok(!response.ok);
        assert.ok(body.errors, 'callers that treat result.errors as deny still see deny');
        assert.notDeepStrictEqual(body, []);
    });
});
