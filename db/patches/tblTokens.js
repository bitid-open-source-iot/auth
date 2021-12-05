db.tblTokens.updateMany({
    'bitid.auth.apps': {
        $exists: false
    }
}, {
    $set: {
        'bitid.auth.apps': []
    }
});

db.tblTokens.updateMany({
    'bitid.auth.groups': {
        $exists: false
    }
}, {
    $set: {
        'bitid.auth.groups': []
    }
});

db.tblTokens.updateMany({
    'bitid.auth.private': {
        $exists: false
    }
}, {
    $set: {
        'bitid.auth.private': true
    }
});