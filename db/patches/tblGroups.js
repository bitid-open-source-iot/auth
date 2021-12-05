db.tblGroups.updateMany({
    'bitid.auth.apps': {
        $exists: false
    }
}, {
    $set: {
        'bitid.auth.apps': []
    }
});

db.tblGroups.updateMany({
    'bitid.auth.groups': {
        $exists: false
    }
}, {
    $set: {
        'bitid.auth.groups': []
    }
});

db.tblGroups.updateMany({
    'bitid.auth.private': {
        $exists: false
    }
}, {
    $set: {
        'bitid.auth.private': true
    }
});