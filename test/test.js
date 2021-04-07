const Q = require('q');
const chai = require('chai');
const fetch = require('node-fetch');
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const config = require('./config.json');
const subset = require('chai-subset');
chai.use(subset);

var email = config.email;
var token = null;
var appId = null;
var userId = null;
var scopeId = null;
var tokenId = null;
var featureId = null;
var loginToken = null;
var verifyCode = null;
var tokenIdToRevoke = null;
var generatedTokenId = null;

describe('Config', function () {
    it('/config/get', function (done) {
        this.timeout(500);

        tools.api.config.get()
            .then((result) => {
                try {
                    result.should.have.property('auth');
                    result.should.have.property('appId');
                    result.should.have.property('drive');
                    result.should.have.property('scopes');
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
                    verifyCode = result.code;
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
        this.timeout(5000);

        tools.api.auth.authenticate()
            .then((result) => {
                try {
                    result.should.have.property('token');
                    result.should.have.property('userId');
                    token = result.token;
                    userId = result.userId;
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

    it('/auth/allow-access', function (done) {
        this.timeout(5000);

        tools.api.auth.allowaccess()
            .then((result) => {
                try {
                    token = result.token;
                    tokenId = result.tokenId;
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

    it('/auth/validate', function (done) {
        this.timeout(500000);

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

    it('/auth/change-email', function (done) {
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

    it('/auth/change-email', function (done) {
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

    it('/auth/change-password', function (done) {
        this.timeout(5000);

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

    it('/auth/reset-password', function (done) {
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
                    result.should.have.property('appId');
                    result.should.have.property('users');
                    result.should.have.property('theme');
                    result.should.have.property('scopes');
                    result.should.have.property('secret');
                    result.should.have.property('google');
                    result.should.have.property('domains');
                    result.should.have.property('private');
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
                    result[0].should.have.property('appId');
                    result[0].should.have.property('users');
                    result[0].should.have.property('theme');
                    result[0].should.have.property('scopes');
                    result[0].should.have.property('secret');
                    result[0].should.have.property('google');
                    result[0].should.have.property('domains');
                    result[0].should.have.property('private');
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

    it('/apps/update-subscriber', function (done) {
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

    it('/tokens/update-subscriber', function (done) {
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
                        'appId',
                        'users',
                        'theme',
                        'scopes',
                        'secret',
                        'google',
                        'domains',
                        'private',
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
                        'appId',
                        'users',
                        'theme',
                        'scopes',
                        'secret',
                        'google',
                        'domains',
                        'private',
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

                tools.post('/apps/update-subscriber', {
                    'role': 3,
                    'email': 'shared@email.com',
                    'appId': appId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        auth: {
            verify: () => {
                var deferred = Q.defer();

                tools.put('/auth/verify', {
                    'code': verifyCode
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
                    'username': 'username'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            validate: () => {
                var deferred = Q.defer();

                tools.put('/auth/validate', {
                    'scope': '/users/get'
                }, loginToken)
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            changeemail: (current, replacement) => {
                var deferred = Q.defer();
                config.email = current;
                tools.post('/auth/change-email', {
                    'email': replacement
                }, loginToken)
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            allowaccess: () => {
                var deferred = Q.defer();

                tools.post('/auth/allow-access', {
                    'scopes': [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                        22,
                        23,
                        24,
                        25,
                        26,
                        27,
                        28,
                        29,
                        30,
                        31,
                        32,
                        33,
                        34,
                        35,
                        36,
                        37,
                        38,
                        39,
                        40,
                        41,
                        42,
                        43,
                        44
                    ],
                    'appId': config.appId,
                    'expiry': new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                    'description': 'test'
                }, loginToken)
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
                        loginToken = res.token;
                        deferred.resolve(res);
                    }, deferred.resolve);

                return deferred.promise;
            },
            resetpassword: () => {
                var deferred = Q.defer();

                tools.put('/auth/reset-password', {})
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            changepassword: () => {
                var deferred = Q.defer();

                tools.put('/auth/change-password', {
                    'old': config.password,
                    'new': 'QWERTY'
                }, loginToken)
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
                    'appId': '000000000000000000000001',
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

                tools.post('/tokens/update-subscriber', {
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
        }
    },
    put: async (url, payload) => {
        var deferred = Q.defer();

        payload.header = {
            'email': config.email,
            'appId': config.appId,
            'userId': userId
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
            'appId': config.appId,
            'userId': userId
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