var Q           = require('q');
var chai        = require('chai');
var fetch       = require('node-fetch');
var assert      = require('chai').assert;
var expect      = require('chai').expect;
var should      = require('chai').should();
var config      = require('./config.json');
var chaiSubset  = require('chai-subset');
chai.use(chaiSubset);

var email               = config.email;
var token               = null;
var appId               = null;
var scopeId             = null;
var tokenId             = null;
var loginToken          = null;
var verifyCode          = null;
var tokenIdToRevoke     = null;
var generatedTokenId    = null;

describe('Auth', function() {
    it('/auth/register', function(done) {
        this.timeout(5000);

        tools.api.auth.register()
        .then((result) => {
            try {
                verifyCode = result.code;
                result.should.have.property('code');
                result.should.have.property('userId');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/auth/verify', function(done) {
        this.timeout(5000);

        tools.api.auth.verify()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/auth/authenticate', function(done) {
        this.timeout(10000);

        tools.api.auth.authenticate()
        .then((result) => {
            try {
                token = result[0].token;
                result[0].should.have.property('email');
                result[0].should.have.property('token');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/auth/allowaccess', function(done) {
        this.timeout(5000);

        tools.api.auth.allowaccess()
        .then((result) => {
            try {
                token   = result[0].token;
                tokenId = result[0]._id;
                result[0].should.have.property('_id');
                result[0].should.have.property('token');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/auth/validate', function(done) {
        this.timeout(5000);

        tools.api.auth.validate()
        .then((result) => {
            try {
                result.should.have.property('passed');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/auth/auth', function(done) {
        this.timeout(5000);

        tools.api.auth.auth()
        .then((result) => {
            try {
                result[0].should.have.property('email');
                result[0].should.have.property('appId');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/auth/changeemail', function(done) {
        this.timeout(5000);

        tools.api.auth.changeemail(config.email, 'aaa@xxx.co.za')
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/auth/changeemail', function(done) {
        this.timeout(5000);

        tools.api.auth.changeemail('aaa@xxx.co.za', email)
        .then((result) => {
            try {
                config.email = email;
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/auth/changepassword', function(done) {
        this.timeout(5000);

        tools.api.auth.changepassword()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/auth/resetpassword', function(done) {
        this.timeout(5000);

        tools.api.auth.resetpassword()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                config.password = result.password;
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/auth/retrievetoken', function(done) {
        this.timeout(5000);

        tools.api.auth.retrievetoken(tokenId)
        .then((result) => {
            try {
                result[0].should.have.property('_id');
                result[0].should.have.property('token');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });
});

describe('Apps', function() {
    it('/apps/add', function(done) {
        this.timeout(5000);

        tools.api.apps.add()
        .then((result) => {
            try {
                appId = result.appId;
                result.should.have.property('appId');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/apps/get', function(done) {
        this.timeout(5000);

        tools.api.apps.get()
        .then((result) => {
            try {
                result.should.have.property('role');
                result.should.have.property('name');
                result.should.have.property('icon');
                result.should.have.property('appId');
                result.should.have.property('users');
                result.should.have.property('theme');
                result.should.have.property('scopes');
                result.should.have.property('secret');
                result.should.have.property('domains');
                result.should.have.property('organizationOnly');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/apps/list', function(done) {
        this.timeout(5000);

        tools.api.apps.list()
        .then((result) => {
            try {
                result[0].should.have.property('role');
                result[0].should.have.property('name');
                result[0].should.have.property('icon');
                result[0].should.have.property('appId');
                result[0].should.have.property('users');
                result[0].should.have.property('theme');
                result[0].should.have.property('scopes');
                result[0].should.have.property('secret');
                result[0].should.have.property('domains');
                result[0].should.have.property('organizationOnly');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/apps/share', function(done) {
        this.timeout(5000);

        tools.api.apps.share()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/apps/update', function(done) {
        this.timeout(5000);

        tools.api.apps.update()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/apps/updatesubscriber', function(done) {
        this.timeout(5000);

        tools.api.apps.updatesubscriber()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/apps/unsubscribe', function(done) {
        this.timeout(1500);

        tools.api.apps.unsubscribe()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });
});

describe('Users', function() {
    it('/users/get', function(done) {
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
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/users/update', function(done) {
        this.timeout(5000);

        tools.api.users.update()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/users/getusers', function(done) {
        this.timeout(5000);

        tools.api.users.getusers()
        .then((result) => {
            try {
                result[0].should.have.property('email');
                result[0].should.have.property('userName');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });
});

describe('Scopes', function() {
    it('/scopes/add', function(done) {
        this.timeout(5000);

        tools.api.scopes.add()
        .then((result) => {
            try {
                scopeId = result.scopeId;
                result.should.have.property('scopeId');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/scopes/get', function(done) {
        this.timeout(5000);

        tools.api.scopes.get()
        .then((result) => {
            try {
                result.should.have.property('url');
                result.should.have.property('app');
                result.should.have.property('role');
                result.should.have.property('users');
                result.should.have.property('appId');
                result.should.have.property('roles');
                result.should.have.property('scopeId');
                result.should.have.property('description');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/scopes/list', function(done) {
        this.timeout(5000);

        tools.api.scopes.list()
        .then((result) => {
            try {
                result[0].should.have.property('url');
                result[0].should.have.property('app');
                result[0].should.have.property('role');
                result[0].should.have.property('users');
                result[0].should.have.property('appId');
                result[0].should.have.property('roles');
                result[0].should.have.property('scopeId');
                result[0].should.have.property('description');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/scopes/update', function(done) {
        this.timeout(5000);

        tools.api.scopes.update()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });
});

describe('Tokens', function() {
    it('/tokens/get', function(done) {
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
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/tokens/list', function(done) {
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
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/tokens/share', function(done) {
        this.timeout(5000);

        tools.api.tokens.share()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/tokens/generate', function(done) {
        this.timeout(5000);

        tools.api.tokens.generate()
        .then((result) => {
            try {
                generatedTokenId = result.tokenId;
                result.should.have.property('token');
                result.should.have.property('tokenId');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/tokens/updatesubscriber', function(done) {
        this.timeout(5000);

        tools.api.tokens.updatesubscriber()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/tokens/unsubscribe', function(done) {
        this.timeout(5000);

        tools.api.tokens.unsubscribe()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/tokens/retrieve', function(done) {
        this.timeout(5000);

        tools.api.tokens.retrieve(tokenId)
        .then((result) => {
            try {
                tokenIdToRevoke = result.tokenId;
                result.should.have.property('token');
                result.should.have.property('tokenId');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/token/retrieve (OLD)', function(done) {
        this.timeout(5000);

        tools.api.token.retrieve(tokenId)
        .then((result) => {
            try {
                result[0].should.have.property('_id');
                result[0].should.have.property('token');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });
});

describe('Remove Added Items', function() {
    it('/users/delete', function(done) {
        this.timeout(5000);

        tools.api.users.delete()
        .then((result) => {
            try {
                result.should.have.property('deleted');
                expect(result.deleted).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/scopes/delete', function(done) {
        this.timeout(5000);

        tools.api.scopes.delete()
        .then((result) => {
            try {
                result.should.have.property('deleted');
                expect(result.deleted).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/apps/delete', function(done) {
        this.timeout(5000);

        tools.api.apps.delete()
        .then((result) => {
            try {
                result.should.have.property('deleted');
                expect(result.deleted).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/tokens/revoke', function(done) {
        this.timeout(5000);
        
        tools.api.tokens.revoke(generatedTokenId)
        .then((result) => {
            try {
                result.should.have.property('deleted');
                expect(result.deleted).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/tokens/revoke', function(done) {
        this.timeout(5000);
        
        tools.api.tokens.revoke(tokenIdToRevoke)
        .then((result) => {
            try {
                result.should.have.property('deleted');
                expect(result.deleted).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
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
                    "theme":            {
                        "color":        "",
                        "background":   ""
                    },
                    "name":             "Mocha App",
                    "icon":             "https://www.bitid.co.za/assets/logo.png",
                    "scopes":           [],
                    "secret":           "123",
                    "domains":          [],
                    "organizationOnly": 1
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();
                
                tools.post('/apps/get', {
                    'filter': [
                        'role',
                        'icon',
                        'name',
                        'appId',
                        'users',
                        'theme',
                        'scopes',
                        'secret',
                        'domains',
                        'organizationOnly'
                    ],
                    "appId": appId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();
                
                tools.post('/apps/list', {
                    'filter': [
                        'role',
                        'icon',
                        'name',
                        'appId',
                        'users',
                        'theme',
                        'scopes',
                        'secret',
                        'domains',
                        'organizationOnly'
                    ],
                    "appId": appId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            share: () => {
                var deferred = Q.defer();
                
                tools.post('/apps/share', {
                    "role":     4,
                    "email":    "shared@email.com",
                    "appId":    appId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();
                
                tools.post('/apps/update', {
                    "name":     "New Mocha Test Updated",
                    "appId":    appId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();
                
                tools.post('/apps/delete', {
                    "appId": appId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            unsubscribe: () => {
                var deferred = Q.defer();
                
                tools.post('/apps/unsubscribe', {
                    "email":    "shared@email.com",
                    "appId":    appId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            updatesubscriber: () => {
                var deferred = Q.defer();
                
                tools.post('/apps/updatesubscriber', {
                    "role":     3,
                    "email":    "shared@email.com",
                    "appId":    appId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        auth: {
            auth: () => {
                var deferred = Q.defer();
                
                tools.post('/auth/auth', {
                    "reqURI": "/users/get"
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            verify: () => {
                var deferred = Q.defer();
                
                tools.put('/auth/verify', {
                    "code": verifyCode
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            register: () => {
                var deferred = Q.defer();
                
                tools.put('/auth/register', {
                    "name": {
                        "last":     "xxx",
                        "first":    "xxx",
                        "middle":   "xxx"
                    },
                    "number": {
                        "tel":      "xxx",
                        "mobile":   "xxx"
                    },
                    "address": {
                        "billing": {
                            "company": {
                                "vat":  "xxx",
                                "reg":  "xxx"
                            },
                            "street":       "xxx",
                            "suburb":       "xxx",
                            "country":      "xxx",
                            "cityTown":     "xxx",
                            "additional":   "xxx",
                            "postalCode":   "xxx"
                        },
                        "physical": {
                            "company": {
                                "vat":  "xxx",
                                "reg":  "xxx"
                            },
                            "street":       "xxx",
                            "suburb":       "xxx",
                            "country":      "xxx",
                            "cityTown":     "xxx",
                            "additional":   "xxx",
                            "postalCode":   "xxx"
                        },
                        "same": true
                    },
                    "identification": {
                        "type":     "id",
                        "number":   "xxx"
                    },
                    "picture":  "xxx",
                    "language": "english",
                    "password": config.password,
                    "timezone": 0,
                    "username": "username"
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            validate: () => {
                var deferred = Q.defer();
                
                tools.put('/auth/validate', {
                    "scope": "/users/get"
                }, loginToken)
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            changeemail: (current, replacement) => {
                var deferred = Q.defer();
                config.email = current;
                tools.post('/auth/changeemail', {
                    "email": replacement
                }, loginToken)
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            allowaccess: () => {
                var deferred = Q.defer();
                
                tools.post('/auth/allowaccess', {
                    "scopes": [
                        {
                            'url':  '/auth/verify',
                            'role': 4
                        },
                        {
                            'url':  '/auth/verify',
                            'role': 4
                        },
                        {
                            'url':  '/auth/register',
                            'role': 4
                        },
                        {
                            'url':  '/auth/validate',
                            'role': 4
                        },
                        {
                            'url':  '/auth/allowaccess',
                            'role': 4
                        },
                        {
                            'url':  '/auth/changeemail',
                            'role': 5
                        },
                        {
                            'url':  '/auth/authenticate',
                            'role': 4
                        },
                        {
                            'url':  '/auth/resetpassword',
                            'role': 4
                        },
                        {
                            'url':  '/auth/retrievetoken',
                            'role': 4
                        },
                        {
                            'url':  '/auth/changepassword',
                            'role': 4
                        },
                        {
                            'url':  '/users/get',
                            'role': 4
                        },
                        {
                            'url':  '/users/update',
                            'role': 4
                        },
                        {
                            'url':  '/users/delete',
                            'role': 4
                        },
                        {
                            'url':  '/users/getusers',
                            'role': 4
                        },
                        {
                            'url':  '/scopes/add',
                            'role': 4
                        },
                        {
                            'url':  '/scopes/get',
                            'role': 4
                        },
                        {
                            'url':  '/scopes/list',
                            'role': 4
                        },
                        {
                            'url':  '/scopes/update',
                            'role': 4
                        },
                        {
                            'url':  '/scopes/delete',
                            'role': 4
                        },
                        {
                            'url':  '/token/retrieve',
                            'role': 4
                        },
                        {
                            'url':  '/tokens/get',
                            'role': 4
                        },
                        {
                            'url':  '/tokens/list',
                            'role': 4
                        },
                        {
                            'url':  '/tokens/share',
                            'role': 4
                        },
                        {
                            'url':  '/tokens/revoke',
                            'role': 4
                        },
                        {
                            'url':  '/tokens/retrieve',
                            'role': 4
                        },
                        {
                            'url':  '/tokens/generate',
                            'role': 4
                        },
                        {
                            'url':  '/tokens/unsubscribe',
                            'role': 4
                        },
                        {
                            'url':  '/tokens/updatesubscriber',
                            'role': 4
                        },
                        {
                            'url':  '/apps/add',
                            'role': 4
                        },
                        {
                            'url':  '/apps/get',
                            'role': 4
                        },
                        {
                            'url':  '/apps/list',
                            'role': 4
                        },
                        {
                            'url':  '/apps/share',
                            'role': 4
                        },
                        {
                            'url':  '/apps/update',
                            'role': 4
                        },
                        {
                            'url':  '/apps/delete',
                            'role': 4
                        },
                        {
                            'url':  '/apps/listapp',
                            'role': 4
                        },
                        {
                            'url':  '/apps/unsubscribe',
                            'role': 4
                        },
                        {
                            'url':  '/apps/updatesubscriber',
                            'role': 4
                        }
                    ],
                    "appId":        "000000000000000000000001",
                    "expiry":       new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                    "password":     config.password,
                    "tokenAddOn":   {},
                    "description":  "test"
                }, loginToken)
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            authenticate: () => {
                var deferred = Q.defer();
                
                tools.put('/auth/authenticate', {
                    "appId":    config.appId,
                    "password": config.password
                })
                .then(res => {
                    loginToken = res[0].token;
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
            retrievetoken: (tokenId) => {
                var deferred = Q.defer();
                
                tools.post('/auth/retrievetoken', {
                    "appId":        "000000000000000000000001",
                    "tokenId":      tokenId,
                    "tokenEmail":   config.email
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            changepassword: () => {
                var deferred = Q.defer();
                
                tools.put('/auth/changepassword', {
                    "old": config.password,
                    "new": "QWERTY"
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
                    "username": "joe101",
                    "pricture": "https://drive.bitid.co.za/drive/files/get?mediaId=xxx&token=xxx",
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
            },
            getusers: () => {
                var deferred = Q.defer();
                
                tools.post('/users/getusers', {
                    "emails": [config.email]
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        token: {
            retrieve: (tokenId) => {
                var deferred = Q.defer();
                
                tools.post('/token/retrieve', {
                    "tokenId":      tokenId,
                    "clientId":     "000000000000000000000001",
                    "description":  "test"
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        scopes: {
            add: () => {
                var deferred = Q.defer();
                
                tools.post('/scopes/add', {
                    "url":          "/mocha/test/scopes",
                    "appId":        appId,
                    "roles":        [1,2,3,4,5],
                    "description":  "Test Scopes"
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();
                
                tools.post('/scopes/get', {
                    "filter": [
                        "url",
                        "app",
                        "role",
                        "users",
                        "appId",
                        "roles",
                        "scopeId",
                        "description"
                    ],
                    "scopeId": scopeId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();
                
                tools.put('/scopes/list', {
                    "filter": [
                        "url",
                        "app",
                        "role",
                        "users",
                        "appId",
                        "roles",
                        "scopeId",
                        "description"
                    ]
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/scopes/update', {
                    "url":         "/mocha/test/scopes/update",
                    "roles":       [1,2,3],
                    "scopeId":     scopeId,
                    "description": "Test Scopes Updated"
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();
                
                tools.post('/scopes/delete', {
                    "scopeId": scopeId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        tokens: {
            get: () => {
                var deferred = Q.defer();
                
                tools.post('/tokens/get', {
                    "filter": [
                        "app",
                        "role",
                        "users",
                        "device",
                        "scopes",
                        "expiry",
                        "tokenId",
                        "description"
                    ],
                    "tokenId": tokenId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();
                
                tools.post('/tokens/list', {
                    "filter": [
                        "app",
                        "role",
                        "users",
                        "device",
                        "scopes",
                        "expiry",
                        "tokenId",
                        "description"
                    ],
                    "tokenId": tokenId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            share: () => {
                var deferred = Q.defer();
                
                tools.post('/tokens/share', {
                    "role":    2,
                    "email":   'shared@test.co.za',
                    "tokenId": tokenId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            revoke: (tokenIdToRevoke) => {
                var deferred = Q.defer();
                
                tools.post('/tokens/revoke', {
                    "tokenId": tokenIdToRevoke
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            retrieve: () => {
                var deferred = Q.defer();
                
                tools.post('/tokens/retrieve', {
                    "appId":    "000000000000000000000001",
                    "description": "test"
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            generate: () => {
                var deferred = Q.defer();
                
                var expiry = new Date(Date.now() + 600000000);

                tools.post('/tokens/generate', {
                    "expiry":      expiry,
                    "appId":    "000000000000000000000001",
                    "description": "My New Generated Token"
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            unsubscribe: () => {
                var deferred = Q.defer();
                
                tools.post('/tokens/unsubscribe', {
                    "email":   'shared@test.co.za',
                    "tokenId": tokenId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            updatesubscriber: () => {
                var deferred = Q.defer();
                
                tools.post('/tokens/updatesubscriber', {
                    "role":    3,
                    "email":   'shared@test.co.za',
                    "tokenId": tokenId
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
                'accept':           '*/*',
                'Content-Type':     'application/json; charset=utf-8',
                'Authorization':    JSON.stringify(token),
                'Content-Length':   payload.length
            },
            'body':   payload,
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
                'accept':           '*/*',
                'Content-Type':     'application/json; charset=utf-8',
                'Authorization':    JSON.stringify(token),
                'Content-Length':   payload.length
            },
            'body':   payload,
            'method': 'POST'
        });
        
        const result = await response.json();

        deferred.resolve(result);
        
        return deferred.promise;
    }
};