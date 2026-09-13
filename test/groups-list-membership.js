const assert = require('assert');
const Q = require('q');
const express = require('express');
const fetch = require('node-fetch');
const dal = require('../dal/dal');
const bll = require('../bll/bll');
const responder = require('../lib/responder');
const Telemetry = require('../lib/telemetry').Telemetry;

const originalDalModule = dal.module;
const originalListDevices = Telemetry.prototype.listDevicesByGroups;

const GROUP_A = 'aaaaaaaaaaaaaaaaaaaaaaaa';
const GROUP_B = 'bbbbbbbbbbbbbbbbbbbbbbbb';

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

function stubDalGroups(groups) {
    dal.module = function () {
        return {
            groups: {
                list() {
                    return Q.resolve({ result: groups });
                }
            }
        };
    };
}

describe('/groups/list happy path — user in groups', function () {
    afterEach(function () {
        dal.module = originalDalModule;
        Telemetry.prototype.listDevicesByGroups = originalListDevices;
    });

    it('returns the user groups when getDevices is false', async function () {
        const groups = [
            { _id: GROUP_A, description: 'Alpha' },
            { _id: GROUP_B, description: 'Beta' }
        ];
        stubDalGroups(groups);
        let telemetryCalls = 0;
        Telemetry.prototype.listDevicesByGroups = async function () {
            telemetryCalls += 1;
            return { result: [] };
        };

        const out = await invokeBllList({
            body: {
                header: { userId: '0000000000000000000000ad' },
                getDevices: false
            }
        });

        assert.strictEqual(out.kind, 'success');
        assert.strictEqual(out.result.length, 2);
        assert.strictEqual(out.result[0].description, 'Alpha');
        assert.strictEqual(out.result[1].description, 'Beta');
        assert.strictEqual(telemetryCalls, 0);
    });

    it('scopes devices to the groups they belong to', async function () {
        const groups = [
            { _id: GROUP_A, description: 'Alpha' },
            { _id: GROUP_B, description: 'Beta' }
        ];
        stubDalGroups(groups);

        let requestedIds;
        Telemetry.prototype.listDevicesByGroups = async function (groupIds) {
            requestedIds = groupIds;
            return {
                result: [
                    { deviceId: 'd1', description: 'Pump', groups: [{ id: GROUP_A }, { id: GROUP_B }] },
                    { deviceId: 'd2', description: 'Tank', groups: [{ id: GROUP_B }] },
                    { deviceId: 'd3', description: 'Other', groups: [{ id: 'cccccccccccccccccccccccc' }] }
                ]
            };
        };

        const out = await invokeBllList({
            body: {
                header: { userId: '0000000000000000000000ad' },
                getDevices: true
            }
        });

        assert.strictEqual(out.kind, 'success');
        assert.deepStrictEqual(requestedIds, [GROUP_A, GROUP_B]);
        assert.strictEqual(out.result.length, 2);

        const alpha = out.result.find(g => g._id === GROUP_A);
        const beta = out.result.find(g => g._id === GROUP_B);
        assert.deepStrictEqual(alpha.devices.map(d => d.deviceId), ['d1']);
        assert.deepStrictEqual(beta.devices.map(d => d.deviceId), ['d1', 'd2']);
        assert.ok(!out.result.some(g => g.devices.some(d => d.deviceId === 'd3')));
        assert.ok(alpha.devices.every(d => typeof d.groups === 'undefined'), 'device.groups is stripped');
    });

    it('in-process HTTP returns 200 with the user groups and scoped devices', async function () {
        this.timeout(2000);
        const groups = [
            { _id: GROUP_A, description: 'Alpha' },
            { _id: GROUP_B, description: 'Beta' }
        ];
        stubDalGroups(groups);
        Telemetry.prototype.listDevicesByGroups = async function () {
            return {
                result: [
                    { deviceId: 'd1', description: 'Pump', groups: [{ id: GROUP_A }] },
                    { deviceId: 'd2', description: 'Tank', groups: [{ id: GROUP_B }] }
                ]
            };
        };

        global.__responder = new responder.module();
        const app = express();
        app.use(express.json());
        app.post('/groups/list', (req, res) => {
            new bll.module().groups.list(req, res);
        });

        const server = await new Promise(resolve => {
            const s = app.listen(0, '127.0.0.1', () => resolve(s));
        });
        const port = server.address().port;

        try {
            const response = await fetch('http://127.0.0.1:' + port + '/groups/list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    header: { userId: '0000000000000000000000ad' },
                    getDevices: true
                }),
                timeout: 1500
            });
            const body = await response.json();
            assert.strictEqual(response.status, 200);
            assert.strictEqual(body.length, 2);
            const alpha = body.find(g => g.groupId === GROUP_A);
            const beta = body.find(g => g.groupId === GROUP_B);
            assert.strictEqual(alpha.description, 'Alpha');
            assert.deepStrictEqual(alpha.devices.map(d => d.deviceId), ['d1']);
            assert.deepStrictEqual(beta.devices.map(d => d.deviceId), ['d2']);
        } finally {
            await new Promise(resolve => server.close(resolve));
        }
    });
});

describe('/groups/list caller contract: 200 [] vs 5xx deny', function () {
    function mockRes() {
        let statusCode = 200;
        let body;
        return {
            status(code) {
                statusCode = code;
                return this;
            },
            json(payload) {
                body = payload;
                return this;
            },
            snapshot() {
                return { statusCode, body };
            }
        };
    }

    function telemetryApiDenies(body) {
        return typeof body.errors !== 'undefined';
    }

    function alertingDenies(status) {
        return status < 200 || status >= 300;
    }

    function spaOk(status) {
        return status >= 200 && status < 300;
    }

    it('empty list models as HTTP 200 JSON array (callers treat as allow)', function (done) {
        const module = new responder.module();
        const res = mockRes();
        module.success({ originalUrl: '/groups/list' }, {
            json(payload) {
                try {
                    assert.ok(Array.isArray(payload));
                    assert.strictEqual(payload.length, 0);
                    assert.strictEqual(typeof payload.errors, 'undefined');
                    assert.strictEqual(telemetryApiDenies(payload), false, 'telemetry/lib/auth.js checks result.errors');
                    assert.strictEqual(alertingDenies(200), false, 'alerting uses response.ok');
                    assert.strictEqual(spaOk(200), true, 'SPA HttpClient 200 -> { ok: true, result: [] }');
                    done();
                } catch (e) {
                    done(e);
                }
            }
        }, []);
    });

    it('structured DAL/auth failure is still 5xx JSON (callers treat as deny)', function () {
        const module = new responder.module();
        const res = mockRes();
        module.error({}, res, {
            error: {
                code: 503,
                message: 'error in dalGroups.list',
                errors: [{ code: 72, message: 'find error' }]
            }
        });
        const out = res.snapshot();
        assert.strictEqual(out.statusCode, 503);
        assert.ok(out.statusCode >= 500);
        assert.ok(Array.isArray(out.body.errors));
        assert.strictEqual(telemetryApiDenies(out.body), true);
        assert.strictEqual(alertingDenies(out.statusCode), true);
        assert.strictEqual(spaOk(out.statusCode), false);
    });

    it('membership list models groupId/description/devices for the SPA', function (done) {
        const module = new responder.module();
        module.success({ originalUrl: '/groups/list' }, {
            json(payload) {
                try {
                    assert.strictEqual(payload.length, 1);
                    assert.strictEqual(payload[0].groupId, GROUP_A);
                    assert.strictEqual(payload[0].description, 'Alpha');
                    assert.deepStrictEqual(payload[0].devices, [{ deviceId: 'd1' }]);
                    done();
                } catch (e) {
                    done(e);
                }
            }
        }, [{
            _id: GROUP_A,
            description: 'Alpha',
            devices: [{ deviceId: 'd1' }]
        }]);
    });
});
