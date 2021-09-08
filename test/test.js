const Q = require('q');
const chai = require('chai');
const fetch = require('node-fetch');
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const config = require('./config.json');
const subset = require('chai-subset');
chai.use(subset);

var code = null;
var email = config.email;
var token = null;
var appId = null;
var scopeId = null;
var tokenId = null;
var featureId = null;
var tokenIdToRevoke = null;
var generatedTokenId = null;

describe('Config', function () {
    it('/config/get', function (done) {
        this.timeout(5000);

        tools.api.config.get()
            .then((result) => {
                try {
                    result.should.have.property('auth');
                    result.should.have.property('appId');
                    result.should.have.property('drive');
                    result.should.have.property('appName');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Auth', function () {
    it('/auth/register', function (done) {
        this.timeout(10000);

        tools.api.auth.register()
            .then((result) => {
                try {
                    code = result.code;
                    result.should.have.property('code');
                    result.should.have.property('userId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/auth/verify', function (done) {
        this.timeout(10000);

        tools.api.auth.verify()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/auth/authenticate', function (done) {
        this.timeout(10000);

        tools.api.auth.authenticate()
            .then((result) => {
                try {
                    token = result[0].token;
                    result[0].should.have.property('email');
                    result[0].should.have.property('token');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/auth/allowaccess', function (done) {
        this.timeout(5000);

        tools.api.auth.allowaccess()
            .then((result) => {
                try {
                    token = result[0].token;
                    tokenId = result[0]._id;
                    result[0].should.have.property('_id');
                    result[0].should.have.property('token');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/auth/validate', function (done) {
        this.timeout(5000);

        tools.api.auth.validate()
            .then((result) => {
                try {
                    result.should.have.property('passed');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/auth/auth', function (done) {
        this.timeout(5000);

        tools.api.auth.auth()
            .then((result) => {
                try {
                    result[0].should.have.property('email');
                    result[0].should.have.property('appId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/auth/changeemail', function (done) {
        this.timeout(5000);

        tools.api.auth.changeemail(config.email, 'aaa@xxx.co.za')
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/auth/changeemail', function (done) {
        this.timeout(5000);

        tools.api.auth.changeemail('aaa@xxx.co.za', email)
            .then((result) => {
                try {
                    config.email = email;
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/auth/changepassword', function (done) {
        this.timeout(10000);

        tools.api.auth.changepassword()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/auth/resetpassword', function (done) {
        this.timeout(10000);

        tools.api.auth.resetpassword()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    config.password = result.password;
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Apps', function () {
    it('/apps/add', function (done) {
        this.timeout(5000);

        tools.api.apps.add()
            .then((result) => {
                try {
                    appId = result.appId;
                    result.should.have.property('appId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/apps/get', function (done) {
        this.timeout(5000);

        tools.api.apps.get()
            .then((result) => {
                try {
                    result.should.have.property('url');
                    result.should.have.property('role');
                    result.should.have.property('name');
                    result.should.have.property('icon');
                    result.should.have.property('icons');
                    result.should.have.property('appId');
                    result.should.have.property('users');
                    result.should.have.property('theme');
                    result.should.have.property('scopes');
                    result.should.have.property('secret');
                    result.should.have.property('google');
                    result.should.have.property('domains');
                    result.should.have.property('private');
                    result.should.have.property('favicon');
                    result.should.have.property('organizationOnly');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/apps/list', function (done) {
        this.timeout(5000);

        tools.api.apps.list()
            .then((result) => {
                try {
                    result[0].should.have.property('url');
                    result[0].should.have.property('role');
                    result[0].should.have.property('name');
                    result[0].should.have.property('icon');
                    result[0].should.have.property('icons');
                    result[0].should.have.property('appId');
                    result[0].should.have.property('users');
                    result[0].should.have.property('theme');
                    result[0].should.have.property('scopes');
                    result[0].should.have.property('secret');
                    result[0].should.have.property('google');
                    result[0].should.have.property('domains');
                    result[0].should.have.property('private');
                    result[0].should.have.property('favicon');
                    result[0].should.have.property('organizationOnly');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/apps/share', function (done) {
        this.timeout(5000);

        tools.api.apps.share()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/apps/update', function (done) {
        this.timeout(5000);

        tools.api.apps.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/apps/is-admin', function (done) {
        this.timeout(5000);

        tools.api.apps.isadmin()
            .then((result) => {
                try {
                    result.should.have.property('admin');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/apps/updatesubscriber', function (done) {
        this.timeout(5000);

        tools.api.apps.updatesubscriber()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/apps/unsubscribe', function (done) {
        this.timeout(1500);

        tools.api.apps.unsubscribe()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Users', function () {
    it('/users/get', function (done) {
        this.timeout(5000);

        tools.api.users.get()
            .then((result) => {
                try {
                    result.should.have.property('name');
                    result.should.have.property('email');
                    result.should.have.property('userId');
                    result.should.have.property('number');
                    result.should.have.property('address');
                    result.should.have.property('picture');
                    result.should.have.property('language');
                    result.should.have.property('timezone');
                    result.should.have.property('username');
                    result.should.have.property('serverDate');
                    result.should.have.property('identification');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/users/update', function (done) {
        this.timeout(5000);

        tools.api.users.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Scopes', function () {
    it('/scopes/add', function (done) {
        this.timeout(5000);

        tools.api.scopes.add()
            .then((result) => {
                try {
                    scopeId = result.scopeId;
                    result.should.have.property('scopeId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/scopes/get', function (done) {
        this.timeout(5000);

        tools.api.scopes.get()
            .then((result) => {
                try {
                    result.should.have.property('url');
                    result.should.have.property('app');
                    result.should.have.property('role');
                    result.should.have.property('appId');
                    result.should.have.property('roles');
                    result.should.have.property('scopeId');
                    result.should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/scopes/list', function (done) {
        this.timeout(5000);

        tools.api.scopes.list()
            .then((result) => {
                try {
                    result[0].should.have.property('url');
                    result[0].should.have.property('app');
                    result[0].should.have.property('role');
                    result[0].should.have.property('appId');
                    result[0].should.have.property('roles');
                    result[0].should.have.property('scopeId');
                    result[0].should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/scopes/update', function (done) {
        this.timeout(5000);

        tools.api.scopes.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Tokens', function () {
    it('/tokens/get', function (done) {
        this.timeout(5000);

        tools.api.tokens.get()
            .then((result) => {
                try {
                    result.should.have.property('app');
                    result.should.have.property('role');
                    result.should.have.property('users');
                    result.should.have.property('device');
                    result.should.have.property('scopes');
                    result.should.have.property('expiry');
                    result.should.have.property('tokenId');
                    result.should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/tokens/list', function (done) {
        this.timeout(5000);

        tools.api.tokens.list()
            .then((result) => {
                try {
                    result[0].should.have.property('app');
                    result[0].should.have.property('role');
                    result[0].should.have.property('users');
                    result[0].should.have.property('device');
                    result[0].should.have.property('scopes');
                    result[0].should.have.property('expiry');
                    result[0].should.have.property('tokenId');
                    result[0].should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/tokens/share', function (done) {
        this.timeout(5000);

        tools.api.tokens.share()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/tokens/generate', function (done) {
        this.timeout(5000);

        tools.api.tokens.generate()
            .then((result) => {
                try {
                    generatedTokenId = result.tokenId;
                    result.should.have.property('token');
                    result.should.have.property('tokenId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/tokens/updatesubscriber', function (done) {
        this.timeout(5000);

        tools.api.tokens.updatesubscriber()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/tokens/unsubscribe', function (done) {
        this.timeout(5000);

        tools.api.tokens.unsubscribe()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/tokens/retrieve', function (done) {
        this.timeout(5000);

        tools.api.tokens.retrieve(tokenId)
            .then((result) => {
                try {
                    tokenIdToRevoke = result.tokenId;
                    result.should.have.property('token');
                    result.should.have.property('tokenId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/tokens/download', function (done) {
        this.timeout(5000);

        tools.api.tokens.download(tokenId)
            .then((result) => {
                try {
                    result.should.have.property('bearer');
                    result.should.have.property('scopes');
                    result.should.have.property('expiry');
                    result.should.have.property('timeZone');
                    result.should.have.property('tokenAddOn');
                    result.should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Features', function () {
    it('/features/add', function (done) {
        this.timeout(5000);

        tools.api.features.add()
            .then((result) => {
                try {
                    featureId = result.featureId;
                    result.should.have.property('featureId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/features/get', function (done) {
        this.timeout(5000);

        tools.api.features.get()
            .then((result) => {
                try {
                    result.should.have.property('app');
                    result.should.have.property('role');
                    result.should.have.property('appId');
                    result.should.have.property('title');
                    result.should.have.property('featureId');
                    result.should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/features/list', function (done) {
        this.timeout(5000);

        tools.api.features.list()
            .then((result) => {
                try {
                    result[0].should.have.property('app');
                    result[0].should.have.property('role');
                    result[0].should.have.property('appId');
                    result[0].should.have.property('title');
                    result[0].should.have.property('featureId');
                    result[0].should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/features/update', function (done) {
        this.timeout(5000);

        tools.api.features.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Tips & Updates', function () {
    it('/tips-and-updates/add', function (done) {
        this.timeout(5000);

        tools.api.tipsAndUpdates.add()
            .then((result) => {
                try {
                    itemId = result.itemId;
                    result.should.have.property('itemId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/tips-and-updates/get', function (done) {
        this.timeout(5000);

        tools.api.tipsAndUpdates.get()
            .then((result) => {
                try {
                    result.should.have.property('app');
                    result.should.have.property('role');
                    result.should.have.property('data');
                    result.should.have.property('appId');
                    result.should.have.property('title');
                    result.should.have.property('itemId');
                    result.should.have.property('subtitle');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/tips-and-updates/load', function (done) {
        this.timeout(5000);

        tools.api.tipsAndUpdates.load()
            .then((result) => {
                try {
                    result[0].should.have.property('data');
                    result[0].should.have.property('appId');
                    result[0].should.have.property('title');
                    result[0].should.have.property('itemId');
                    result[0].should.have.property('subtitle');
                    result[0].should.have.property('serverDate');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/tips-and-updates/list', function (done) {
        this.timeout(5000);

        tools.api.tipsAndUpdates.list()
            .then((result) => {
                try {
                    result[0].should.have.property('app');
                    result[0].should.have.property('role');
                    result[0].should.have.property('data');
                    result[0].should.have.property('appId');
                    result[0].should.have.property('title');
                    result[0].should.have.property('itemId');
                    result[0].should.have.property('subtitle');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/tips-and-updates/update', function (done) {
        this.timeout(5000);

        tools.api.tipsAndUpdates.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Health Check', function () {
    it('/', function (done) {
        this.timeout(5000);

        tools.api.healthcheck()
            .then((result) => {
                try {
                    result.should.have.property('uptime');
                    result.should.have.property('memory');
                    result.should.have.property('database');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Remove Added Items', function () {
    it('/users/delete', function (done) {
        this.timeout(5000);

        tools.api.users.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/features/delete', function (done) {
        this.timeout(5000);

        tools.api.features.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/tips-and-updates/delete', function (done) {
        this.timeout(5000);

        tools.api.tipsAndUpdates.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/scopes/delete', function (done) {
        this.timeout(5000);

        tools.api.scopes.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/apps/delete', function (done) {
        this.timeout(5000);

        tools.api.apps.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/tokens/revoke', function (done) {
        this.timeout(5000);

        tools.api.tokens.revoke(generatedTokenId)
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/tokens/revoke', function (done) {
        this.timeout(5000);

        tools.api.tokens.revoke(tokenIdToRevoke)
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

var tools = {
    api: {
        apps: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/apps/add', {
                    'icons': {
                        'icon72x72': 'xxx',
                        'icon96x96': 'xxx',
                        'icon128x128': 'xxx',
                        'icon144x144': 'xxx',
                        'icon152x152': 'xxx',
                        'icon192x192': 'xxx',
                        'icon384x384': 'xxx',
                        'icon512x512': 'xxx'
                    },
                    'theme': {
                        'color': '',
                        'background': ''
                    },
                    'google': {
                        'credentials': {
                            'type': 'xxx',
                            'auth_uri': 'xxx',
                            'client_id': 'xxx',
                            'token_uri': 'xxx',
                            'project_id': 'xxx',
                            'private_key': 'xxx',
                            'client_email': 'xxx',
                            'private_key_id': 'xxx',
                            'client_x509_cert_url': 'xxx',
                            'auth_provider_x509_cert_url': 'xxx'
                        },
                        'database': 'xxx'
                    },
                    'url': 'https://www.bitid.co.za',
                    'name': 'Mocha App',
                    'icon': 'https://www.bitid.co.za/assets/logo.png',
                    'scopes': [],
                    'secret': '123',
                    'domains': [],
                    'private': false,
                    'favicon': 'xxx',
                    'organizationOnly': 1
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/apps/get', {
                    'filter': [
                        'url',
                        'role',
                        'icon',
                        'name',
                        'icons',
                        'appId',
                        'users',
                        'theme',
                        'scopes',
                        'secret',
                        'google',
                        'domains',
                        'private',
                        'favicon',
                        'organizationOnly'
                    ],
                    'appId': appId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/apps/list', {
                    'filter': [
                        'url',
                        'role',
                        'icon',
                        'name',
                        'icons',
                        'appId',
                        'users',
                        'theme',
                        'scopes',
                        'secret',
                        'google',
                        'domains',
                        'private',
                        'favicon',
                        'organizationOnly'
                    ],
                    'appId': appId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            share: () => {
                var deferred = Q.defer();

                tools.post('/apps/share', {
                    'role': 4,
                    'email': 'shared@email.com',
                    'appId': appId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/apps/update', {
                    'name': 'New Mocha Test Updated',
                    'appId': appId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/apps/delete', {
                    'appId': appId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            isadmin: () => {
                var deferred = Q.defer();

                tools.put('/apps/is-admin', {})
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            unsubscribe: () => {
                var deferred = Q.defer();

                tools.post('/apps/unsubscribe', {
                    'email': 'shared@email.com',
                    'appId': appId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            updatesubscriber: () => {
                var deferred = Q.defer();

                tools.post('/apps/updatesubscriber', {
                    'role': 3,
                    'email': 'shared@email.com',
                    'appId': appId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        auth: {
            auth: () => {
                var deferred = Q.defer();

                tools.post('/auth/auth', {
                    'reqURI': '/users/get'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            verify: () => {
                var deferred = Q.defer();

                tools.put('/auth/verify', {
                    'code': code
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            register: () => {
                var deferred = Q.defer();

                tools.put('/auth/register', {
                    'name': {
                        'last': 'xxx',
                        'first': 'xxx',
                        'middle': 'xxx'
                    },
                    'number': {
                        'tel': 'xxx',
                        'mobile': 'xxx'
                    },
                    'address': {
                        'billing': {
                            'company': {
                                'vat': 'xxx',
                                'reg': 'xxx'
                            },
                            'street': 'xxx',
                            'suburb': 'xxx',
                            'country': 'xxx',
                            'cityTown': 'xxx',
                            'additional': 'xxx',
                            'postalCode': 'xxx'
                        },
                        'physical': {
                            'company': {
                                'vat': 'xxx',
                                'reg': 'xxx'
                            },
                            'street': 'xxx',
                            'suburb': 'xxx',
                            'country': 'xxx',
                            'cityTown': 'xxx',
                            'additional': 'xxx',
                            'postalCode': 'xxx'
                        },
                        'same': true
                    },
                    'identification': {
                        'type': 'id',
                        'number': 'xxx'
                    },
                    'picture': 'xxx',
                    'language': 'english',
                    'password': config.password,
                    'timezone': 0,
                    'username': 'username',
                    'privacyPolicy': true,
                    'newsAndChanges': true,
                    'termsAndConditions': true
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            validate: () => {
                var deferred = Q.defer();

                tools.put('/auth/validate', {
                    'scope': '/users/get'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            changeemail: (current, replacement) => {
                var deferred = Q.defer();
                config.email = current;
                tools.post('/auth/changeemail', {
                    'email': replacement
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            allowaccess: () => {
                var deferred = Q.defer();

                tools.post('/auth/allowaccess', {
                    'scopes': [
                        '/auth/verify',
                        '/auth/register',
                        '/auth/validate',
                        '/auth/allowaccess',
                        '/auth/changeemail',
                        '/auth/authenticate',
                        '/auth/resetpassword',
                        '/auth/changepassword',

                        '/users/get',
                        '/users/update',
                        '/users/delete',
                        '/users/getusers',

                        '/scopes/add',
                        '/scopes/get',
                        '/scopes/list',
                        '/scopes/update',
                        '/scopes/delete',

                        '/tokens/get',
                        '/tokens/list',
                        '/tokens/share',
                        '/tokens/revoke',
                        '/tokens/download',
                        '/tokens/retrieve',
                        '/tokens/generate',
                        '/tokens/unsubscribe',
                        '/tokens/updatesubscriber',

                        '/apps/add',
                        '/apps/get',
                        '/apps/list',
                        '/apps/share',
                        '/apps/update',
                        '/apps/delete',
                        '/apps/listapp',
                        '/apps/unsubscribe',
                        '/apps/updatesubscriber',

                        '/features/add',
                        '/features/get',
                        '/features/list',
                        '/features/update',
                        '/features/delete',

                        '/tips-and-updates/add',
                        '/tips-and-updates/get',
                        '/tips-and-updates/list',
                        '/tips-and-updates/load',
                        '/tips-and-updates/update',
                        '/tips-and-updates/delete'
                    ],
                    'appId': config.appId,
                    'expiry': new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                    'password': config.password,
                    'tokenAddOn': {},
                    'description': 'test'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            authenticate: () => {
                var deferred = Q.defer();

                tools.put('/auth/authenticate', {
                    'appId': config.appId,
                    'password': config.password
                })
                    .then(res => {
                        token = res[0].token;
                        deferred.resolve(res);
                    }, deferred.resolve);

                return deferred.promise;
            },
            resetpassword: () => {
                var deferred = Q.defer();

                tools.put('/auth/resetpassword', {})
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            changepassword: () => {
                var deferred = Q.defer();

                tools.put('/auth/changepassword', {
                    'old': config.password,
                    'new': 'QWERTY'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        users: {
            get: () => {
                var deferred = Q.defer();

                tools.post('/users/get', {
                    'filter': [
                        'name',
                        'email',
                        'userId',
                        'number',
                        'address',
                        'picture',
                        'language',
                        'timezone',
                        'username',
                        'serverDate',
                        'identification'
                    ]
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/users/list', {
                    'filter': [
                        'name',
                        'email',
                        'userId',
                        'number',
                        'address',
                        'picture',
                        'language',
                        'timezone',
                        'username',
                        'serverDate',
                        'identification'
                    ]
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/users/update', {
                    'username': 'joe101',
                    'pricture': 'https://drive.bitid.co.za/drive/files/get?mediaId=xxx&token=xxx',
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/users/delete', {
                    'password': config.password
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        config: {
            get: () => {
                var deferred = Q.defer();

                tools.put('/config/get', {})
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        scopes: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/scopes/add', {
                    'url': '/mocha/test/scopes',
                    'appId': appId,
                    'roles': [1, 2, 3, 4, 5],
                    'description': 'Test Scopes'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/scopes/get', {
                    'filter': [
                        'url',
                        'app',
                        'role',
                        'appId',
                        'roles',
                        'scopeId',
                        'description'
                    ],
                    'scopeId': scopeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/scopes/list', {
                    'filter': [
                        'url',
                        'app',
                        'role',
                        'appId',
                        'roles',
                        'scopeId',
                        'description'
                    ]
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/scopes/update', {
                    'url': '/mocha/test/scopes/update',
                    'roles': [1, 2, 3],
                    'scopeId': scopeId,
                    'description': 'Test Scopes Updated'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/scopes/delete', {
                    'scopeId': scopeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        tokens: {
            get: () => {
                var deferred = Q.defer();

                tools.post('/tokens/get', {
                    'filter': [
                        'app',
                        'role',
                        'users',
                        'device',
                        'scopes',
                        'expiry',
                        'tokenId',
                        'description'
                    ],
                    'tokenId': tokenId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/tokens/list', {
                    'filter': [
                        'app',
                        'role',
                        'users',
                        'device',
                        'scopes',
                        'expiry',
                        'tokenId',
                        'description'
                    ],
                    'tokenId': tokenId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            share: () => {
                var deferred = Q.defer();

                tools.post('/tokens/share', {
                    'role': 2,
                    'email': 'shared@test.co.za',
                    'tokenId': tokenId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            revoke: (tokenIdToRevoke) => {
                var deferred = Q.defer();

                tools.post('/tokens/revoke', {
                    'tokenId': tokenIdToRevoke
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            download: (tokenId) => {
                var deferred = Q.defer();

                tools.post('/tokens/download', {
                    'tokenId': tokenId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            retrieve: (tokenId) => {
                var deferred = Q.defer();

                tools.put('/tokens/retrieve', {
                    'tokenId': tokenId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            generate: () => {
                var deferred = Q.defer();

                var expiry = new Date(Date.now() + 600000000);

                tools.post('/tokens/generate', {
                    'appId': config.appId,
                    'expiry': expiry,
                    'description': 'My New Generated Token'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            unsubscribe: () => {
                var deferred = Q.defer();

                tools.post('/tokens/unsubscribe', {
                    'email': 'shared@test.co.za',
                    'tokenId': tokenId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            updatesubscriber: () => {
                var deferred = Q.defer();

                tools.post('/tokens/updatesubscriber', {
                    'role': 3,
                    'email': 'shared@test.co.za',
                    'tokenId': tokenId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        features: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/features/add', {
                    'title': 'xxx',
                    'appId': appId,
                    'description': 'xxx',
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/features/get', {
                    'filter': [
                        'app',
                        'role',
                        'title',
                        'appId',
                        'featureId',
                        'description'
                    ],
                    'appId': appId,
                    'featureId': featureId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/features/list', {
                    'filter': [
                        'app',
                        'role',
                        'title',
                        'appId',
                        'featureId',
                        'description'
                    ],
                    'appId': appId,
                    'featureId': featureId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/features/update', {
                    'title': 'New Mocha Test Updated',
                    'appId': appId,
                    'featureId': featureId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/features/delete', {
                    'appId': appId,
                    'featureId': featureId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        healthcheck: () => {
            var deferred = Q.defer();

            tools.put('/health-check', {})
                .then(deferred.resolve, deferred.resolve);

            return deferred.promise;
        },
        tipsAndUpdates: {
            add: () => {
                return tools.post('/tips-and-updates/add', {
                    'data': 'xxx',
                    'title': 'xxx',
                    'appId': appId,
                    'subtitle': 'xxx'
                });
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/tips-and-updates/get', {
                    'filter': [
                        'app',
                        'role',
                        'data',
                        'title',
                        'appId',
                        'itemId',
                        'subtitle'
                    ],
                    'appId': appId,
                    'itemId': itemId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            load: () => {
                return tools.post('/tips-and-updates/load', {
                    'filter': [
                        'data',
                        'title',
                        'appId',
                        'itemId',
                        'subtitle',
                        'serverDate'
                    ],
                    'appId': appId,
                    'itemId': itemId
                });
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/tips-and-updates/list', {
                    'filter': [
                        'app',
                        'role',
                        'data',
                        'title',
                        'appId',
                        'itemId',
                        'subtitle'
                    ],
                    'appId': appId,
                    'itemId': itemId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/tips-and-updates/update', {
                    'title': 'New Mocha Test Updated',
                    'appId': appId,
                    'itemId': itemId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/tips-and-updates/delete', {
                    'appId': appId,
                    'itemId': itemId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        }
    },
    put: async (url, payload) => {
        var deferred = Q.defer();

        payload.header = {
            'email': config.email,
            'appId': config.appId
        };

        payload = JSON.stringify(payload);

        const response = await fetch(config.auth + url, {
            'headers': {
                'accept': '*/*',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': JSON.stringify(token),
                'Content-Length': payload.length
            },
            'body': payload,
            'method': 'PUT'
        });

        const result = await response.json();

        deferred.resolve(result);

        return deferred.promise;
    },
    post: async (url, payload) => {
        var deferred = Q.defer();

        payload.header = {
            'email': config.email,
            'appId': config.appId
        };

        payload = JSON.stringify(payload);

        const response = await fetch(config.auth + url, {
            'headers': {
                'accept': '*/*',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': JSON.stringify(token),
                'Content-Length': payload.length
            },
            'body': payload,
            'method': 'POST'
        });

        const result = await response.json();

        deferred.resolve(result);

        return deferred.promise;
    }
};