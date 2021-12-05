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
var maximum = db.tblApps.aggregate(params).count();
var percentage = 0;

db.tblApps.aggregate(params).forEach(app => {
    db.tblApps.update({
        'bitid.auth.users': {
            $elemMatch: {
                'email': app.email
            }
        },
        '_id': app._id
    }, {
        $set: {
            'bitid.auth.users.$.id': app.userId
        },
        $unset: {
            'bitid.auth.users.$.email': true
        }
    });
    index++;
    var progress = parseFloat(((index / maximum) * 100).toFixed(0));
    if (progress != percentage) {
        percentage = progress;
        print(percentage + '%');
    };
});