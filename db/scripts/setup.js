const mongo = require('mongodb').MongoClient;
const config = require('./../../config.json');
const ObjectId = require('mongodb').ObjectId;

console.log('Connecting to mongo!');

mongo.connect(config.mongodb.url, {
    'poolSize': 500,
    'useUnifiedTopology': true
}, async (error, connection) => {
    if (error) {
        console.log(error.message);
    } else {
        console.log('Mongo Connected!');

        const db = connection.db(config.mongodb.database);

        console.log('Mongo Auth: Adding tblApps!');
        const apps = db.collection('tblApps');
        if ((await apps.countDocuments()).valueOf() == 0) {
            apps.insertOne({
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

            apps.createIndex({
                'name': 1
            }, {
                'unique': true
            });
        };
        
        console.log('Mongo Auth: Adding tblUsers!');
        const users = db.collection('tblUsers');
        if ((await users.countDocuments()).valueOf() == 0) {
            users.insertOne({
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
        
            users.createIndex({
                'email': 1
            }, {
                'unique': true
            });
        };
        
        console.log('Mongo Auth: Adding tblTokens!');
        const tokens = db.collection('tblTokens');
        if ((await tokens.countDocuments()).valueOf() == 0) {
            tokens.insertOne({
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
                    'expiry': new Date(),
                    'pushToken': '',
                    'tokenAddOn': {}
                },
                '_id': ObjectId('000000000000000000000001'),
                'appId': ObjectId('000000000000000000000001'),
                'device': 'server',
                'serverDate': new Date()
            });
        
            tokens.createIndex({
                'appId': 1,
                'device': 1,
                'description': 1,
                'token.expiry': 1,
                'bitid.auth.users.email': 1
            }, {
                'unique': true
            });
        };
        
        console.log('Mongo Auth: Adding tblScopes!');
        const scopes = db.collection('tblScopes');
        if ((await scopes.countDocuments()).valueOf() == 0) {
            scopes.insertOne({
                '_id': ObjectId('000000000000000000000001'),
                'url': '/xxx/xxx',
                'appId': ObjectId('000000000000000000000001'),
                'roles': [1, 2, 3, 4, 5],
                'serverDate': new Date(),
                'description': 'xxx'
            });
        
            scopes.createIndex({
                'url': 1
            }, {
                'unique': true
            });
        };
        
        console.log('Mongo Auth: Adding tblFeatures!');
        const features = db.collection('tblFeatures');
        if ((await features.countDocuments()).valueOf() == 0) {
            features.insertOne({
                '_id': ObjectId('000000000000000000000001'),
                'appId': ObjectId('000000000000000000000001'),
                'serverDate': new Date(),
                'description': 'xxx'
            });
        
            features.createIndex({
                'appId': 1
            }, {
                'unique': false
            });
        };
    };
});