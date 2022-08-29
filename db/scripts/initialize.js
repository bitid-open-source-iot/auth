const tblApps = db.getCollection('tblApps')
if (tblApps.count() == 0) {
    db.tblApps.insertOne({
        'bitid': {
            'auth': {
                'apps': [
                    {
                        'id': ObjectId('000000000000000000000001'),
                        'role': 4
                    }
                ],
                'users': [
                    {
                        'id': ObjectId('000000000000000000000001'),
                        'role': 5
                    }
                ],
                'groups': [
                    {
                        'id': ObjectId('000000000000000000000001'),
                        'role': 3
                    }
                ],
                'private': true,
                'organizationOnly': 1
            }
        },
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
        'theme': {
            'color': '#000000',
            'background': '#FFFFFF'
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
            ObjectId('000000000000000000000001'),
            ObjectId('000000000000000000000002'),
            ObjectId('000000000000000000000003'),
            ObjectId('000000000000000000000004'),
            ObjectId('000000000000000000000005'),
            ObjectId('000000000000000000000006'),
            ObjectId('000000000000000000000007'),
            ObjectId('000000000000000000000008'),
            ObjectId('000000000000000000000009'),
            ObjectId('000000000000000000000010'),
            ObjectId('000000000000000000000011'),
            ObjectId('000000000000000000000012'),
            ObjectId('000000000000000000000013'),
            ObjectId('000000000000000000000014'),
            ObjectId('000000000000000000000015'),
            ObjectId('000000000000000000000016'),
            ObjectId('000000000000000000000017'),
            ObjectId('000000000000000000000018'),
            ObjectId('000000000000000000000019'),
            ObjectId('000000000000000000000020'),
            ObjectId('000000000000000000000021'),
            ObjectId('000000000000000000000022'),
            ObjectId('000000000000000000000023'),
            ObjectId('000000000000000000000024'),
            ObjectId('000000000000000000000025'),
            ObjectId('000000000000000000000026'),
            ObjectId('000000000000000000000027'),
            ObjectId('000000000000000000000028'),
            ObjectId('000000000000000000000029'),
            ObjectId('000000000000000000000030'),
            ObjectId('000000000000000000000031'),
            ObjectId('000000000000000000000032'),
            ObjectId('000000000000000000000033'),
            ObjectId('000000000000000000000034'),
            ObjectId('000000000000000000000035'),
            ObjectId('000000000000000000000036'),
            ObjectId('000000000000000000000037'),
            ObjectId('000000000000000000000038'),
            ObjectId('000000000000000000000039'),
            ObjectId('000000000000000000000040'),
            ObjectId('000000000000000000000041'),
            ObjectId('000000000000000000000042'),
            ObjectId('000000000000000000000043'),
            ObjectId('000000000000000000000044'),
            ObjectId('000000000000000000000045'),
            ObjectId('000000000000000000000046'),
            ObjectId('000000000000000000000047'),
            ObjectId('000000000000000000000048'),
            ObjectId('000000000000000000000049'),
            ObjectId('000000000000000000000050'),
            ObjectId('000000000000000000000051'),
            ObjectId('000000000000000000000052'),
            ObjectId('000000000000000000000053'),
            ObjectId('000000000000000000000054'),
            ObjectId('000000000000000000000055'),
            ObjectId('000000000000000000000056'),
            ObjectId('000000000000000000000057'),
            ObjectId('000000000000000000000058'),
            ObjectId('000000000000000000000059'),
            ObjectId('000000000000000000000060'),
            ObjectId('000000000000000000000061'),
            ObjectId('000000000000000000000062')
        ],
        'domains': [
            '127.0.0.1:9000',
            'auth.bitid.co.za'
        ],
        '_id': ObjectId('000000000000000000000001'),
        'url': 'auth.bitid.co.za',
        'name': 'Auth',
        'icon': 'http://www.bitid.co.za/assets/logo.png',
        'secret': 'xxx',
        'serverDate': ISODate()
    })

    db.tblApps.createIndex({
        '_id': 1,
        'bitid.auth.apps.id': 1
    }, {
        'unique': false
    })

    db.tblApps.createIndex({
        '_id': 1,
        'bitid.auth.users.id': 1
    }, {
        'unique': false
    })

    db.tblApps.createIndex({
        '_id': 1,
        'bitid.auth.groups.id': 1
    }, {
        'unique': false
    })
}

const tblUsers = db.getCollection('tblUsers')
if (tblUsers.count() == 0) {
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
        'serverDate': ISODate()
    })

    db.tblUsers.createIndex({
        'email': 1
    }, {
        'unique': true
    })
}

const tblUsage = db.getCollection('tblUsage')
if (tblUsage.count() == 0) {
    db.tblUsage.insertOne({
        "_id": ObjectId("000000000000000000000001"),
        "scope": "/users/get",
        "appId": ObjectId("000000000000000000000001"),
        "userId": ObjectId("000000000000000000000001"),
        "serverDate": ISODate()
    })

    db.tblUsage.createIndex({
        'userId': 1,
        'serverDate': 1
    }, {
        'unique': false
    })

    db.tblUsage.createIndex({
        'appId': 1,
        'serverDate': 1
    }, {
        'unique': false
    })
}

const tblTokens = db.getCollection('tblTokens')
if (tblTokens.count() == 0) {
    db.tblTokens.insertOne({
        'bitid': {
            'auth': {
                'apps': [
                    {
                        'id': ObjectId('000000000000000000000001'),
                        'role': 4
                    }
                ],
                'users': [
                    {
                        'id': ObjectId('000000000000000000000001'),
                        'role': 5
                    }
                ],
                'groups': [
                    {
                        'id': ObjectId('000000000000000000000001'),
                        'role': 3
                    }
                ],
                'private': true,
                'organizationOnly': 1
            }
        },
        'token': {
            'scopes': [
                ObjectId('000000000000000000000001'),
                ObjectId('000000000000000000000002'),
                ObjectId('000000000000000000000003'),
                ObjectId('000000000000000000000004'),
                ObjectId('000000000000000000000005'),
                ObjectId('000000000000000000000006'),
                ObjectId('000000000000000000000007'),
                ObjectId('000000000000000000000008'),
                ObjectId('000000000000000000000009'),
                ObjectId('000000000000000000000010'),
                ObjectId('000000000000000000000011'),
                ObjectId('000000000000000000000012'),
                ObjectId('000000000000000000000013'),
                ObjectId('000000000000000000000014'),
                ObjectId('000000000000000000000015'),
                ObjectId('000000000000000000000016'),
                ObjectId('000000000000000000000017'),
                ObjectId('000000000000000000000018'),
                ObjectId('000000000000000000000019'),
                ObjectId('000000000000000000000020'),
                ObjectId('000000000000000000000021'),
                ObjectId('000000000000000000000022'),
                ObjectId('000000000000000000000023'),
                ObjectId('000000000000000000000024'),
                ObjectId('000000000000000000000025'),
                ObjectId('000000000000000000000026'),
                ObjectId('000000000000000000000027'),
                ObjectId('000000000000000000000028'),
                ObjectId('000000000000000000000029'),
                ObjectId('000000000000000000000030'),
                ObjectId('000000000000000000000031'),
                ObjectId('000000000000000000000032'),
                ObjectId('000000000000000000000033'),
                ObjectId('000000000000000000000034'),
                ObjectId('000000000000000000000035'),
                ObjectId('000000000000000000000036'),
                ObjectId('000000000000000000000037'),
                ObjectId('000000000000000000000038'),
                ObjectId('000000000000000000000039'),
                ObjectId('000000000000000000000040'),
                ObjectId('000000000000000000000041'),
                ObjectId('000000000000000000000042'),
                ObjectId('000000000000000000000043'),
                ObjectId('000000000000000000000044'),
                ObjectId('000000000000000000000045'),
                ObjectId('000000000000000000000046'),
                ObjectId('000000000000000000000047'),
                ObjectId('000000000000000000000048'),
                ObjectId('000000000000000000000049'),
                ObjectId('000000000000000000000050'),
                ObjectId('000000000000000000000051'),
                ObjectId('000000000000000000000052'),
                ObjectId('000000000000000000000053'),
                ObjectId('000000000000000000000054'),
                ObjectId('000000000000000000000055'),
                ObjectId('000000000000000000000056'),
                ObjectId('000000000000000000000057'),
                ObjectId('000000000000000000000058'),
                ObjectId('000000000000000000000059'),
                ObjectId('000000000000000000000060'),
                ObjectId('000000000000000000000061'),
                ObjectId('000000000000000000000062')
            ],
            'bearer': '0000000000000000000000000000000000000000000000000000000000000000',
            'expiry': ISODate(),
            'tokenAddOn': {}
        },
        '_id': ObjectId('000000000000000000000001'),
        'appId': ObjectId('000000000000000000000001'),
        'device': 'server',
        'serverDate': ISODate()
    })

    db.tblTokens.createIndex({
        'appId': 1,
        'device': 1,
        'description': 1,
        'token.expiry': 1,
        'bitid.auth.apps.id': 1
    }, {
        'unique': false
    })

    db.tblTokens.createIndex({
        'appId': 1,
        'device': 1,
        'description': 1,
        'token.expiry': 1,
        'bitid.auth.users.id': 1
    }, {
        'unique': false
    })

    db.tblTokens.createIndex({
        'appId': 1,
        'device': 1,
        'description': 1,
        'token.expiry': 1,
        'bitid.auth.groups.id': 1
    }, {
        'unique': false
    })
}

const tblGroups = db.getCollection('tblGroups')
if (tblGroups.count() == 0) {
    db.tblGroups.insertOne({
        'bitid': {
            'auth': {
                'apps': [
                    {
                        'id': ObjectId('000000000000000000000001'),
                        'role': 4
                    }
                ],
                'users': [
                    {
                        'id': ObjectId('000000000000000000000001'),
                        'role': 5
                    }
                ],
                'groups': [
                    {
                        'id': ObjectId('000000000000000000000001'),
                        'role': 3
                    }
                ],
                'private': true,
                'organizationOnly': 1
            }
        },
        '_id': ObjectId('000000000000000000000001'),
        'appId': [ObjectId('000000000000000000000001')],
        'serverDate': ISODate(),
        'description': 'server'
    })

    db.tblGroups.createIndex({
        '_id': 1,
        'bitid.auth.apps.id': 1
    }, {
        'unique': false
    })

    db.tblGroups.createIndex({
        '_id': 1,
        'bitid.auth.users.id': 1
    }, {
        'unique': false
    })

    db.tblGroups.createIndex({
        '_id': 1,
        'bitid.auth.groups.id': 1
    }, {
        'unique': false
    })
}

const tblScopes = db.getCollection('tblScopes')
if (tblScopes.count() == 0) {
    db.tblScopes.insertOne({
        '_id': ObjectId('000000000000000000000001'),
        'url': '/xxx/xxx',
        'appId': ObjectId('000000000000000000000001'),
        'roles': [1, 2, 3, 4, 5],
        'serverDate': ISODate(),
        'description': 'xxx'
    })

    db.tblScopes.createIndex({
        'url': 1
    }, {
        'unique': true
    })
}

const tblFeatures = db.getCollection('tblFeatures')
if (tblFeatures.count() == 0) {
    db.tblFeatures.insertOne({
        '_id': ObjectId('000000000000000000000001'),
        'appId': ObjectId('000000000000000000000001'),
        'serverDate': ISODate(),
        'description': 'xxx'
    })

    db.tblFeatures.createIndex({
        'appId': 1
    }, {
        'unique': false
    })
}

const tblTipsAndUpdates = db.getCollection('tblTipsAndUpdates')
if (tblTipsAndUpdates.count() == 0) {
    db.tblTipsAndUpdates.insertOne({
        '_id': ObjectId('000000000000000000000001'),
        'data': 'xxx',
        'appId': ObjectId('000000000000000000000001'),
        'title': 'xxx',
        'subtitle': 'xxx',
        'serverDate': ISODate(),
    })

    db.tblTipsAndUpdates.createIndex({
        'appId': 1
    }, {
        'unique': false
    })
}