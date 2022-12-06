db.tblScopes.createIndex({
    'appId': 1,
    'url': 1
}, {
    'unique': true
})