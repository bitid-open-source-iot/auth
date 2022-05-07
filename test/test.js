const Q = require('q');
const chai = require('chai');
const fetch = require('node-fetch');
const moment = require('moment');
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const config = require('./config.json');
const subset = require('chai-subset');
chai.use(subset);

var email = () => {
    var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var string = '';
    for (var index = 0; index < 15; index++) {
        string += chars[Math.floor(Math.random() * chars.length)];
    };
    return [string, '@gmail.com'].join('');
};

config.email = email();

var code = null;
var email = config.email;
var token = null;
var appId = null;
var scopeId = null;
var groupId = null;
var tokenId = null;
var featureId = null;

describe('Software & Testing Details', function () {
    it('DATE: ' + moment().format('DD/MM/YYYY HH:mm:ss'), function (done) {
        this.timeout(5000);
        done();
    });

    it('AUTHOR: ' + require('os').userInfo().username, function (done) {
        this.timeout(5000);
        done();
    });

    it('VERSION: ' + require('../package.json').version, function (done) {
        this.timeout(5000);
        done();
    });
});

describe('Config', function () {
    it('/config/get', function (done) {
        this.timeout(5000);

        tools.api.config.get()
            .then((result) => {
                try {
                    result.should.have.property('icon');
                    result.should.have.property('name');
                    result.should.have.property('appId');
                    result.should.have.property('theme');
                    result.should.have.property('favicon');
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
        this.timeout(5000);

        tools.api.auth.register()
            .then((result) => {
                try {
                    code = result.code;
                    config.userId = result.userId;
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
        this.timeout(5000);

        tools.api.auth.verify()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).is.above(0);
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
                    token = result[0].token;
                    result[0].should.have.property('token');
                    result[0].should.have.property('userId');
                    result[0].should.have.property('tokenId');
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
                    result.should.have.property('appId');
                    result.should.have.property('userId');
                    result.should.have.property('groupId');
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
                    // result[0].should.have.property('email');
                    result[0].should.have.property('appId');
                    // result[0].should.have.property('userId');
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
                    expect(result.updated).is.above(0);
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
                    expect(result.updated).is.above(0);
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
                    expect(result.updated).is.above(0);
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
        this.timeout(5000);

        tools.api.auth.resetpassword()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).is.above(0);
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
                    result.should.have.property('apps');
                    result.should.have.property('icons');
                    result.should.have.property('appId');
                    result.should.have.property('users');
                    result.should.have.property('theme');
                    result.should.have.property('config');
                    result.should.have.property('groups');
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
                    result[0].should.have.property('apps');
                    result[0].should.have.property('icons');
                    result[0].should.have.property('appId');
                    result[0].should.have.property('users');
                    result[0].should.have.property('theme');
                    result[0].should.have.property('config');
                    result[0].should.have.property('groups');
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
                    expect(result.updated).is.above(0);
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
                    expect(result.updated).is.above(0);
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

    it('/apps/update-subscriber', function (done) {
        this.timeout(5000);

        tools.api.apps.updatesubscriber()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).is.above(0);
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
                    expect(result.updated).is.above(0);
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

    // it('/users/list', function (done) {
    //     this.timeout(5000);

    //     tools.api.users.list()
    //         .then((result) => {
    //             try {
    //                 result[0].should.have.property('name');
    //                 result[0].should.have.property('email');
    //                 result[0].should.have.property('userId');
    //                 result[0].should.have.property('number');
    //                 result[0].should.have.property('address');
    //                 result[0].should.have.property('picture');
    //                 result[0].should.have.property('language');
    //                 result[0].should.have.property('timezone');
    //                 result[0].should.have.property('username');
    //                 result[0].should.have.property('validated');
    //                 result[0].should.have.property('serverDate');
    //                 result[0].should.have.property('privacyPolicy');
    //                 result[0].should.have.property('identification');
    //                 result[0].should.have.property('newsAndChanges');
    //                 result[0].should.have.property('termsAndConditions');
    //                 done();
    //             } catch (e) {
    //                 done(e);
    //             };
    //         }, (err) => {
    //             try {
    //                 done(err);
    //             } catch (e) {
    //                 done(e);
    //             };
    //         });
    // });

    it('/users/update', function (done) {
        this.timeout(5000);

        tools.api.users.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).is.above(0);
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
                    expect(result.updated).is.above(0);
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

describe('Groups', function () {
    it('/groups/add', function (done) {
        this.timeout(5000);

        tools.api.groups.add()
            .then((result) => {
                try {
                    groupId = result.groupId;
                    result.should.have.property('groupId');
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

    it('/groups/get', function (done) {
        this.timeout(5000);

        tools.api.groups.get()
            .then((result) => {
                try {
                    result.should.have.property('role');
                    result.should.have.property('apps');
                    result.should.have.property('appId');
                    result.should.have.property('users');
                    result.should.have.property('groups');
                    result.should.have.property('groupId');
                    result.should.have.property('private');
                    result.should.have.property('description');
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

    it('/groups/list', function (done) {
        this.timeout(5000);

        tools.api.groups.list()
            .then((result) => {
                try {
                    result[0].should.have.property('role');
                    result[0].should.have.property('apps');
                    result[0].should.have.property('appId');
                    result[0].should.have.property('users');
                    result[0].should.have.property('groups');
                    result[0].should.have.property('groupId');
                    result[0].should.have.property('private');
                    result[0].should.have.property('description');
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

    it('/groups/share', function (done) {
        this.timeout(5000);

        tools.api.groups.share()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).is.above(0);
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

    it('/groups/update', function (done) {
        this.timeout(5000);

        tools.api.groups.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).is.above(0);
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

    if (!config.authenticate) {
        it('/groups/change-owner', function (done) {
            this.timeout(5000);

            tools.api.groups.changeowner(config.shareId)
                .then(result => {
                    try {
                        expect(result.updated).is.above(0);
                        done();
                    } catch (e) {
                        done(e);
                    };
                }, err => {
                    try {
                        done(err);
                    } catch (e) {
                        done(e);
                    };
                });
        });

        it('/groups/change-owner', function (done) {
            this.timeout(5000);

            var shareId = config.userId;
            config.userId = config.shareId;
            tools.api.groups.changeowner(shareId)
                .then(result => {
                    try {
                        config.userId = shareId;
                        expect(result.updated).is.above(0);
                        done();
                    } catch (e) {
                        done(e);
                    };
                }, err => {
                    try {
                        done(err);
                    } catch (e) {
                        done(e);
                    };
                });
        });
    };

    it('/groups/update-subscriber', function (done) {
        this.timeout(5000);

        tools.api.groups.updatesubscriber()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).is.above(0);
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

    it('/groups/unsubscribe', function (done) {
        this.timeout(5000);

        tools.api.groups.unsubscribe()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).is.above(0);
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
    it('/tokens/generate', function (done) {
        this.timeout(5000);

        tools.api.tokens.generate()
            .then((result) => {
                try {
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

    it('/tokens/get', function (done) {
        this.timeout(5000);

        tools.api.tokens.get()
            .then((result) => {
                try {
                    result.should.have.property('app');
                    result.should.have.property('role');
                    result.should.have.property('apps');
                    result.should.have.property('users');
                    result.should.have.property('appId');
                    result.should.have.property('token');
                    result.should.have.property('groups');
                    result.should.have.property('device');
                    result.should.have.property('private');
                    result.should.have.property('tokenId');
                    result.should.have.property('disabled');
                    result.should.have.property('description');
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

    it('/tokens/list', function (done) {
        this.timeout(5000);

        tools.api.tokens.list()
            .then((result) => {
                try {
                    result[0].should.have.property('app');
                    result[0].should.have.property('role');
                    result[0].should.have.property('apps');
                    result[0].should.have.property('users');
                    result[0].should.have.property('appId');
                    result[0].should.have.property('token');
                    result[0].should.have.property('groups');
                    result[0].should.have.property('device');
                    result[0].should.have.property('private');
                    result[0].should.have.property('tokenId');
                    result[0].should.have.property('disabled');
                    result[0].should.have.property('description');
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

    it('/tokens/update', function (done) {
        this.timeout(5000);

        tools.api.tokens.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).is.above(0);
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
                    expect(result.updated).is.above(0);
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
                    expect(result.updated).is.above(0);
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
                    expect(result.updated).is.above(0);
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

        var save = config.appId;
        config.appId = appId;

        tools.api.tokens.retrieve()
            .then((result) => {
                try {
                    config.appId = save;
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
                    expect(result.updated).is.above(0);
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

describe('Statistics', function () {
    it('/statistics/usage', function (done) {
        this.timeout(5000);

        tools.api.statistics.usage()
            .then((result) => {
                try {
                    result[0].should.have.property('scope');
                    result[0].should.have.property('appId');
                    result[0].should.have.property('userId');
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
                    expect(result.updated).is.above(0);
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

    it('/groups/delete', function (done) {
        this.timeout(5000);

        tools.api.groups.delete()
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

        tools.api.tokens.revoke()
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
});

var tools = {
    api: {
        apps: {
            add: () => {
                return tools.post('/apps/add', {
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
                    'config': {
                        'test': 'test'
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
                });
            },
            get: () => {
                return tools.post('/apps/get', {
                    'filter': [
                        'url',
                        'role',
                        'icon',
                        'name',
                        'apps',
                        'users',
                        'appId',
                        'icons',
                        'theme',
                        'config',
                        'groups',
                        'google',
                        'scopes',
                        'secret',
                        'domains',
                        'favicon',
                        'private',
                        'organizationOnly'
                    ],
                    'appId': appId
                });
            },
            list: () => {
                return tools.post('/apps/list', {
                    'filter': [
                        'url',
                        'role',
                        'icon',
                        'name',
                        'apps',
                        'users',
                        'appId',
                        'icons',
                        'theme',
                        'config',
                        'groups',
                        'google',
                        'scopes',
                        'secret',
                        'domains',
                        'favicon',
                        'private',
                        'organizationOnly'
                    ],
                    'appId': appId
                });
            },
            share: () => {
                return tools.post('/apps/share', {
                    'id': config.shareId,
                    'type': 'user',
                    'role': 4,
                    'appId': appId
                });
            },
            update: () => {
                return tools.post('/apps/update', {
                    'name': 'New Mocha Test Updated',
                    'appId': appId
                });
            },
            delete: () => {
                return tools.post('/apps/delete', {
                    'appId': appId
                });
            },
            isadmin: () => {
                return tools.put('/apps/is-admin', {
                    'appId': appId
                });
            },
            unsubscribe: () => {
                return tools.post('/apps/unsubscribe', {
                    'id': config.shareId,
                    'type': 'user',
                    'appId': appId
                });
            },
            updatesubscriber: () => {
                return tools.post('/apps/update-subscriber', {
                    'id': config.shareId,
                    'role': 3,
                    'type': 'user',
                    'appId': appId
                });
            }
        },
        auth: {
            auth: () => {
                return tools.post('/auth/auth', {
                    'reqURI': '/users/get'
                });
            },
            verify: () => {
                return tools.put('/auth/verify', {
                    'code': code,
                    'email': config.email
                });
            },
            register: () => {
                return tools.put('/auth/register', {
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
                    'email': config.email,
                    'picture': 'xxx',
                    'language': 'english',
                    'password': config.password,
                    'timezone': 0,
                    'username': 'username',
                    'privacyPolicy': true,
                    'newsAndChanges': true,
                    'termsAndConditions': true
                });
            },
            validate: () => {
                return tools.put('/auth/validate', {
                    'scope': '/users/get'
                });
            },
            changeemail: (current, replacement) => {
                config.email = current;

                return tools.post('/auth/change-email', {
                    'email': replacement
                });
            },
            allowaccess: () => {
                return tools.post('/auth/allow-access', {
                    'scopes': [
                        '/auth/verify',
                        '/auth/register',
                        '/auth/validate',
                        '/auth/allow-access',
                        '/auth/change-email',
                        '/auth/authenticate',
                        '/auth/reset-password',
                        '/auth/change-password',

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
                        '/tokens/update',
                        '/tokens/revoke',
                        '/tokens/retrieve',
                        '/tokens/generate',
                        '/tokens/unsubscribe',
                        '/tokens/update-subscriber',

                        '/groups/add',
                        '/groups/get',
                        '/groups/list',
                        '/groups/share',
                        '/groups/update',
                        '/groups/delete',
                        '/groups/unsubscribe',
                        '/groups/update-subscriber',

                        '/apps/add',
                        '/apps/get',
                        '/apps/list',
                        '/apps/share',
                        '/apps/update',
                        '/apps/delete',
                        '/apps/listapp',
                        '/apps/unsubscribe',
                        '/apps/update-subscriber',

                        '/features/add',
                        '/features/get',
                        '/features/list',
                        '/features/update',
                        '/features/delete',

                        '/statistics/usage',

                        '/tips-and-updates/add',
                        '/tips-and-updates/get',
                        '/tips-and-updates/list',
                        '/tips-and-updates/update',
                        '/tips-and-updates/delete'
                    ],
                    'appId': config.appId,
                    'expiry': new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                    'password': config.password,
                    'tokenAddOn': {},
                    'description': 'test'
                });
            },
            authenticate: () => {
                return tools.put('/auth/authenticate', {
                    'email': config.email,
                    'password': config.password
                });
            },
            resetpassword: () => {
                return tools.put('/auth/reset-password', {
                    'email': config.email
                });
            },
            changepassword: () => {
                return tools.put('/auth/change-password', {
                    'old': config.password,
                    'new': 'QWERTY',
                    'confirm': config.password
                });
            }
        },
        users: {
            get: () => {
                return tools.post('/users/get', {
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
                });
            },
            list: () => {
                return tools.post('/users/list', {
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
                        'validated',
                        'serverDate',
                        'privacyPolicy',
                        'identification',
                        'newsAndChanges',
                        'termsAndConditions'
                    ]
                });
            },
            update: () => {
                return tools.post('/users/update', {
                    'username': 'joe101',
                    'pricture': 'https://drive.bitid.co.za/drive/files/get?mediaId=xxx&token=xxx',
                });
            },
            delete: () => {
                return tools.post('/users/delete', {
                    'password': config.password
                });
            }
        },
        config: {
            get: () => {
                return tools.put('/config/get', {});
            }
        },
        scopes: {
            add: () => {
                return tools.post('/scopes/add', {
                    'url': '/mocha/test/scopes',
                    'appId': appId,
                    'description': 'Test Scopes'
                });
            },
            get: () => {
                return tools.post('/scopes/get', {
                    'filter': [
                        'url',
                        'app',
                        'role',
                        'appId',
                        'scopeId',
                        'description'
                    ],
                    'scopeId': scopeId
                });
            },
            list: () => {
                return tools.post('/scopes/list', {
                    'filter': [
                        'url',
                        'app',
                        'role',
                        'appId',
                        'scopeId',
                        'description'
                    ]
                });
            },
            update: () => {
                return tools.post('/scopes/update', {
                    'url': '/mocha/test/scopes/update',
                    'scopeId': scopeId,
                    'description': 'Test Scopes Updated'
                });
            },
            delete: () => {
                return tools.post('/scopes/delete', {
                    'scopeId': scopeId
                });
            }
        },
        groups: {
            add: () => {
                return tools.post('/groups/add', {
                    'appId': [appId],
                    'private': true,
                    'description': 'My First Group',
                    'organizationOnly': 0
                });
            },
            get: () => {
                return tools.post('/groups/get', {
                    'filter': [
                        'role',
                        'apps',
                        'appId',
                        'users',
                        'groups',
                        'groupId',
                        'private',
                        'description',
                        'organizationOnly'
                    ],
                    'groupId': groupId
                });
            },
            list: () => {
                return tools.post('/groups/list', {
                    'filter': [
                        'role',
                        'apps',
                        'appId',
                        'users',
                        'groups',
                        'groupId',
                        'private',
                        'description',
                        'organizationOnly'
                    ]
                });
            },
            share: () => {
                return tools.post('/groups/share', {
                    'id': config.shareId,
                    'role': 4,
                    'type': 'user',
                    'groupId': groupId
                });
            },
            update: () => {
                return tools.post('/groups/update', {
                    'groupId': groupId,
                    'description': 'Test groups Updated'
                });
            },
            delete: () => {
                return tools.post('/groups/delete', {
                    'groupId': groupId
                });
            },
            changeowner: (id) => {
                return tools.post('/groups/change-owner', {
                    'id': id,
                    'type': 'user',
                    'groupId': groupId
                });
            },
            unsubscribe: () => {
                return tools.post('/groups/unsubscribe', {
                    'id': config.shareId,
                    'type': 'user',
                    'groupId': groupId
                });
            },
            updatesubscriber: () => {
                return tools.post('/groups/update-subscriber', {
                    'id': config.shareId,
                    'type': 'user',
                    'role': 3,
                    'groupId': groupId
                });
            }
        },
        tokens: {
            get: () => {
                return tools.post('/tokens/get', {
                    'filter': [
                        'app',
                        'role',
                        'apps',
                        'users',
                        'appId',
                        'token',
                        'groups',
                        'device',
                        'private',
                        'tokenId',
                        'disabled',
                        'description',
                        'organizationOnly'
                    ],
                    'tokenId': tokenId
                });
            },
            list: () => {
                return tools.post('/tokens/list', {
                    'filter': [
                        'app',
                        'role',
                        'apps',
                        'users',
                        'appId',
                        'token',
                        'groups',
                        'device',
                        'private',
                        'tokenId',
                        'disabled',
                        'description',
                        'organizationOnly'
                    ],
                    'tokenId': tokenId
                });
            },
            share: () => {
                return tools.post('/tokens/share', {
                    'id': config.shareId,
                    'role': 2,
                    'type': 'user',
                    'tokenId': tokenId
                });
            },
            update: () => {
                return tools.post('/tokens/update', {
                    'tokenId': tokenId,
                    'disabled': true
                });
            },
            revoke: () => {
                return tools.post('/tokens/revoke', {
                    'tokenId': tokenId
                });
            },
            retrieve: () => {
                return tools.put('/tokens/retrieve', {
                    'tokenId': tokenId
                });
            },
            generate: () => {
                return tools.post('/tokens/generate', {
                    'appId': appId,
                    'expiry': new Date(Date.now() + 600000000),
                    'description': 'My New Generated Token'
                });
            },
            unsubscribe: () => {
                return tools.post('/tokens/unsubscribe', {
                    'id': config.shareId,
                    'type': 'user',
                    'tokenId': tokenId
                });
            },
            updatesubscriber: () => {
                return tools.post('/tokens/update-subscriber', {
                    'id': config.shareId,
                    'role': 3,
                    'type': 'user',
                    'tokenId': tokenId
                });
            }
        },
        features: {
            add: () => {
                return tools.post('/features/add', {
                    'title': 'xxx',
                    'appId': appId,
                    'description': 'xxx',
                });
            },
            get: () => {
                return tools.post('/features/get', {
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
                });
            },
            list: () => {
                return tools.post('/features/list', {
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
                });
            },
            update: () => {
                return tools.post('/features/update', {
                    'title': 'New Mocha Test Updated',
                    'appId': appId,
                    'featureId': featureId
                });
            },
            delete: () => {
                return tools.post('/features/delete', {
                    'appId': appId,
                    'featureId': featureId
                });
            }
        },
        statistics: {
            usage: () => {
                return tools.post('/statistics/usage', {
                    'filter': [
                        'scope',
                        'appId',
                        'userId',
                        'serverDate'
                    ]
                });
            }
        },
        healthcheck: () => {
            return tools.put('/health-check', {});
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
                return tools.post('/tips-and-updates/get', {
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
                });
            },
            list: () => {
                return tools.post('/tips-and-updates/list', {
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
                });
            },
            update: () => {
                return tools.post('/tips-and-updates/update', {
                    'title': 'New Mocha Test Updated',
                    'appId': appId,
                    'itemId': itemId
                });
            },
            delete: () => {
                return tools.post('/tips-and-updates/delete', {
                    'appId': appId,
                    'itemId': itemId
                });
            }
        }
    },
    put: async (endpoint, payload) => {
        var deferred = Q.defer();

        payload.header = {
            'appId': config.appId,
            'userId': config.userId
        };

        payload = JSON.stringify(payload);

        const response = await fetch([config.auth, endpoint].join(''), {
            'headers': {
                'Accept': '*/*',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': JSON.stringify(token),
                'Content-Length': payload.length
            },
            'body': payload,
            'method': 'PUT'
        });

        const result = await response.json();

        if (!response.ok) {
            console.log(result);
        };

        deferred.resolve(result);

        return deferred.promise;
    },
    post: async (endpoint, payload) => {
        var deferred = Q.defer();

        payload.header = {
            'appId': config.appId,
            'userId': config.userId
        };

        payload = JSON.stringify(payload);

        const response = await fetch([config.auth, endpoint].join(''), {
            'headers': {
                'Accept': '*/*',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': JSON.stringify(token),
                'Content-Length': payload.length
            },
            'body': payload,
            'method': 'POST'
        });

        const result = await response.json();

        if (!response.ok) {
            console.log(result);
        };

        deferred.resolve(result);

        return deferred.promise;
    }
};