const apps = db.collection('tblApps');
if (apps.count() == 0) {
    db.tblApps.insertOne({
        'icons': [
            {
                'src': 'assets/icons/icon-72x72.png',
                'sizes': '72x72',
                'type': 'image/png',
                'purpose': 'maskable any'
            },
            {
                'src': 'assets/icons/icon-96x96.png',
                'sizes': '96x96',
                'type': 'image/png',
                'purpose': 'maskable any'
            },
            {
                'src': 'assets/icons/icon-128x128.png',
                'sizes': '128x128',
                'type': 'image/png',
                'purpose': 'maskable any'
            },
            {
                'src': 'assets/icons/icon-144x144.png',
                'sizes': '144x144',
                'type': 'image/png',
                'purpose': 'maskable any'
            },
            {
                'src': 'assets/icons/icon-152x152.png',
                'sizes': '152x152',
                'type': 'image/png',
                'purpose': 'maskable any'
            },
            {
                'src': 'assets/icons/icon-192x192.png',
                'sizes': '192x192',
                'type': 'image/png',
                'purpose': 'maskable any'
            },
            {
                'src': 'assets/icons/icon-384x384.png',
                'sizes': '384x384',
                'type': 'image/png',
                'purpose': 'maskable any'
            },
            {
                'src': 'assets/icons/icon-512x512.png',
                'sizes': '512x512',
                'type': 'image/png',
                'purpose': 'maskable any'
            }
        ],
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

const groups = db.collection('tblGroups');
if (groups.count() == 0) {
    db.tblGroups.insertOne({
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
        '_id': ObjectId('000000000000000000000001'),
        'appId': [ObjectId('000000000000000000000001')],
        'serverDate': new Date(),
        'description': 'server'
    });

    db.tblGroups.createIndex({
        '_id': 1,
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

const tipsAndUpdates = db.collection('tblTipsAndUpdates');
if (tipsAndUpdates.count() == 0) {
    db.tblTipsAndUpdates.insertOne({
        '_id': ObjectId('000000000000000000000001'),
        'data': 'xxx',
        'appId': ObjectId('000000000000000000000001'),
        'title': 'xxx',
        'subtitle': 'xxx',
        'serverDate': new Date(),
    });

    db.tblTipsAndUpdates.createIndex({
        'appId': 1
    }, {
        'unique': false
    });
};