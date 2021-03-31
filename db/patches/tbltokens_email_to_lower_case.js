var query = [
    {
        $unwind: '$bitid.auth.users'
    },
    {
        $project: {
            email: {
                $toLower: '$bitid.auth.users.email'
            },
            _id: 1,
            _email: '$bitid.auth.users.email'
        }
    }
];
var index = 0;
var maximum = db.tblTokens.aggregate(query).toArray().length;
var percentage = 0;

db.tblTokens.aggregate(query).forEach(row => {
    db.tblTokens.update({
        'bitid.auth.users': {
            $elemMatch: {
                'email': row._email
            }
        },
        _id: row._id
    }, {
        $set: {
            'bitid.auth.users.$.email': row.email
        }
    });
    index++;
    var progress = parseFloat(((index / maximum) * 100).toFixed(0));
    if (progress != percentage) {
        percentage = progress;
        print(percentage + '%');
    }; 
});