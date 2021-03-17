const apps = db.collection('tblApps');
if (apps.count() == 0) {
    db.tblApps.insertOne({
        'bitid': {
            'auth': {
                'users': [
                    {
                        'role': 5,
                        'email': 'xxx@xxx.co.za'
                    }
                ],
                'organizationOnly': 1
            }
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
        'scopes': [
            {
                'url': '/etc',
                'role': 5
            }
        ],
        'domains': [
            'app.bitid.co.za'
        ],
        '_id': ObjectId('000000000000000000000001'),
        'url': 'xxx',
        'name': 'xxx',
        'icon': 'http://www.bitid.co.za/assets/logo.png',
        'secret': 'xxx',
        'serverDate': new Date()
    });

    db.tblApps.createIndex({
        'name': 1
    }, {
        'unique': true
    });
};

const users = db.collection('tblUsers');
if (users.count() == 0) {
    db.tblUsers.insertOne({
        'name': {
            'last': '',
            'first': '',
            'middle': ''
        },
        'number': {
            'tel': '',
            'mobile': ''
        },
        'address': {
            'billing': {
                'company': {
                    'vat': '',
                    'reg': ''
                },
                'street': '',
                'suburb': '',
                'country': '',
                'cityTown': '',
                'additional': '',
                'postalCode': ''
            },
            'physical': {
                'company': {
                    'vat': '',
                    'reg': ''
                },
                'street': '',
                'suburb': '',
                'country': '',
                'cityTown': '',
                'additional': '',
                'postalCode': ''
            },
            'same': true
        },
        'identification': {
            'type': '',
            'number': ''
        },
        '_id': ObjectId('000000000000000000000001'),
        'code': '',
        'salt': '',
        'hash': '',
        'email': '',
        'picture': '',
        'language': '',
        'timezone': 0,
        'username': '',
        'validated': 0,
        'serverDate': new Date()
    });

    db.tblUsers.createIndex({
        'email': 1
    }, {
        'unique': true
    });
};

const usage = db.collection('tblUsage');
if (usage.count() == 0) {
    db.tblUsage.insertOne({
        '_id': ObjectId('000000000000000000000001'),
        'appId': ObjectId('000000000000000000000001'),
        'email': 'xxx@xxx.co.za',
        'scope': '/auth/authenticate',
        'serverDate': new Date()
    });

    db.tblUsage.createIndex({
        'email': 1,
        'serverDate': 1
    }, {
        'unique': false
    });
};

const tokens = db.collection('tblTokens');
if (tokens.count() == 0) {
    db.tblTokens.insertOne({
        'bitid': {
            'auth': {
                'users': [
                    {
                        'role': 5,
                        'email': 'xxx@xxx.co.za'
                    }
                ]
            }
        },
        'token': {
            'scopes': [
                {
                    'url': '*',
                    'role': 5
                }
            ],
            'bearer': '0000000000000000000000000000000000000000000000000000000000000000',
            'expiry': ISODate(),
            'pushToken': '',
            'tokenAddOn': {}
        },
        '_id': ObjectId('000000000000000000000001'),
        'appId': ObjectId('000000000000000000000001'),
        'device': 'server',
        'serverDate': new Date()
    });

    db.tblTokens.createIndex({
        'appId': 1,
        'device': 1,
        'description': 1,
        'token.expiry': 1,
        'bitid.auth.users.email': 1
    }, {
        'unique': true
    });
};

const scopes = db.collection('tblScopes');
if (scopes.count() == 0) {
    db.tblScopes.insertOne({
        '_id': ObjectId('000000000000000000000001'),
        'url': '/xxx/xxx',
        'appId': ObjectId('000000000000000000000001'),
        'roles': [1, 2, 3, 4, 5],
        'serverDate': new Date(),
        'description': 'xxx'
    });

    db.tblScopes.createIndex({
        'url': 1
    }, {
        'unique': true
    });
};

const features = db.collection('tblFeatures');
if (features.count() == 0) {
    db.tblFeatures.insertOne({
        '_id': ObjectId('000000000000000000000001'),
        'appId': ObjectId('000000000000000000000001'),
        'serverDate': new Date(),
        'description': 'xxx'
    });

    db.tblFeatures.createIndex({
        'appId': 1
    }, {
        'unique': false
    });
};