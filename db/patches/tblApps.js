db.tblApps.updateMany({
    'bitid.auth.apps': {
        $exists: false
    }
}, {
    $set: {
        'bitid.auth.apps': []
    }
});

db.tblApps.updateMany({
    'bitid.auth.groups': {
        $exists: false
    }
}, {
    $set: {
        'bitid.auth.groups': []
    }
});

db.tblApps.updateMany({
    'bitid.auth.private': {
        $exists: false
    }
}, {
    $set: {
        'bitid.auth.private': true
    }
});