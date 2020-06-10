var apps = db.getCollection("tblApps");
if (apps.count() == 0) {
    db.tblApps.insert({
        "bitid": {
            "auth": {
                "users": [
                    {
                        "role":  5,
                        "email": "xxx@xxx.co.za",
                    }
                ],
                "organizationOnly": 1
            }
        },
        "theme": {
            "color":        "",
            "background":   ""
        },
        "scopes": [
            {
                "url":  "/etc",
                "role": 5
            }
        ],
        "domains":      [
            "app.bitid.co.za"
        ],
        "_id":          ObjectId("000000000000000000000001"),
        "name":         "xxx",
        "icon":         "http://www.bitid.co.za/assets/logo.png", 
        "secret":       "xxx", 
        "serverDate":   new Date()
    });

    db.tblApps.createIndex({
        "name": 1
    }, {
        "unique": true
    });
};

var users = db.getCollection("tblUsers");
if (users.count() == 0) {
    var myUser = db.tblUsers.insert({
        "_id":          ObjectId("000000000000000000000001"),
        "salt":         "", 
        "hash":         "",
        "email":        "",
        "userName":     "",
        "serverDate":   new Date()
    });

    db.tblUsers.createIndex({
        "email": 1
    }, {
        "unique": true
    });
};

var tokens = db.getCollection("tblTokens");
if (tokens.count() == 0) {
    db.tblTokens.insert({
        "bitid": {
            "auth": {
                "users": [
                    {
                        "role":     5,
                        "email":    "xxx@xxx.co.za"
                    }
                ]
            }
        },
        "token": {
            "scopes": [
                {
                    "url":  "*",
                    "role": 5
                }
            ],
            "bearer":     "0000000000000000000000000000000000000000000000000000000000000000",
            "expiry":     ISODate(),
            "pushToken":  "",
            "tokenAddOn": {}
        },
        "_id":          ObjectId("000000000000000000000001"),
        "appId":        ObjectId("000000000000000000000001"),
        "device":       "server",
        "serverDate":   new Date()
    });

    db.tblTokens.createIndex({
        "appId":                    1,
        "device":                   1,
        "description":              1,
        "token.expiry":             1,
        "bitid.auth.users.email":   1
    }, {
        "unique": true
    });
};

var scopes = db.getCollection("tblScopes");
if (scopes.count() == 0) {
    db.tblScopes.insert({
        "_id":          ObjectId("000000000000000000000001"),
        "url":          "/xxx/xxx",
        "appId":        ObjectId("000000000000000000000001"),
        "roles":        [1, 2, 3, 4, 5],
        "serverDate":   new Date(),
        "description":  'xxx'
    });

    db.tblScopes.createIndex({
        "url": 1
    }, {
        "unique": true
    });
};