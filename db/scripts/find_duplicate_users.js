db.tblUsers.aggregate([
    {
        $project: {
            email: {
                $toLower: '$email'
            },
            _id: 1
        }
    },
    {
        $group: {
            _id: {
                email: '$email',
                appId: '$appId',
                platform: '$platform'
            },
            count: {
                $sum: 1
            },
            records: {
                $push: {
                    date: {
                        $convert: {
                            input: '$_id',
                            to: 'date'
                        }
                    },
                    userId: '$_id'
                }
            }
        }
    },
    {
        $match: {
            count: {
                $gte: 2
            }
        }
    }
]);