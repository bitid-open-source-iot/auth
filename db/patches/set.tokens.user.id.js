var params = [
    {
        $unwind: '$bitid.auth.users'
    },
    {
        $project: {
            _id: 1,
            email: '$bitid.auth.users.email'
        }
    },
    {
        $lookup: {
            as: 'user',
            from: 'tblUsers',
            localField: 'email',
            foreignField: 'email'
        }
    },
    {
        $unwind: '$user'
    },
    {
        $project: {
            '_id': 1,
            'email': 1,
            'userId': '$user._id',
        }
    }
];
var index = 0;
var maximum = db.tblTokens.aggregate(params).count();
var percentage = 0;

db.tblTokens.aggregate(params).forEach(token => {
    db.tblTokens.update({
        'bitid.auth.users': {
            $elemMatch: {
                'email': token.email
            }
        },
        '_id': token._id
    }, {
        $set: {
            'bitid.auth.users.$.id': token.userId
        }
    });
    index++;
    var progress = parseFloat(((index / maximum) * 100).toFixed(0));
    if (progress != percentage) {
        percentage = progress;
        print(percentage + '%');
    };
});