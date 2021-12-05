db.tblApps.aggregate([
    {
        $lookup: {
            let: {
                'appId': '$bitid.auth.apps.id'
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {
                                    $in: ['$_id', '$$appId']
                                },
                                {
                                    $in: [ObjectId('61ab90103b8728cb8ddf32f5'), '$bitid.auth.users.id']
                                }
                            ]
                        }
                    }
                },
                {
                    $project: {
                        '_id': 1,
                        'bitid': 1
                    }
                }
            ],
            as: '_apps',
            from: 'tblApps'
        }
    },
    {
        $lookup: {
            let: {
                'groupId': '$bitid.auth.groups.id'
            },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {
                                    $in: ['$_id', '$$groupId']
                                },
                                {
                                    $in: [ObjectId('61ab90103b8728cb8ddf32f5'), '$bitid.auth.users.id']
                                }
                            ]
                        }
                    }
                },
                {
                    $project: {
                        '_id': 1,
                        'bitid': 1
                    }
                }
            ],
            as: '_groups',
            from: 'tblGroups'
        }
    },
    {
        $match: {
            $or: [
                {
                    '_id': ObjectId('000000000000000000000002'),
                    'bitid.auth.users.id': ObjectId('61ab90103b8728cb8ddf32f5')
                },
                {
                    '_id': ObjectId('000000000000000000000002'),
                    '_apps.bitid.auth.users.id': ObjectId('61ab90103b8728cb8ddf32f5')
                },
                {
                    '_id': ObjectId('000000000000000000000002'),
                    '_groups.bitid.auth.users.id': ObjectId('61ab90103b8728cb8ddf32f5')
                }
            ]
        }
    },
    {
        $addFields: {
            'role': {
                $reduce: {
                    in: {
                        $cond: {
                            if: {
                                $gte: ['$$this.role', '$$value']
                            },
                            then: '$$this.role',
                            else: '$$value'
                        }
                    },
                    input: {
                        $filter: {
                            cond: {
                                $eq: ['$$item.match', true]
                            },
                            input: {
                                $concatArrays: [
                                    {
                                        $map: {
                                            in: {
                                                id: '$$app.id',
                                                role: '$$app.role',
                                                match: {
                                                    $cond: {
                                                        if: {
                                                            $in: ['$$app.id', '$_apps._id']
                                                        },
                                                        then: true,
                                                        else: false
                                                    }
                                                }
                                            },
                                            as: 'app',
                                            input: '$bitid.auth.apps'
                                        }
                                    },
                                    {
                                        $map: {
                                            in: {
                                                id: '$$user.id',
                                                role: '$$user.role',
                                                match: {
                                                    $cond: {
                                                        if: {
                                                            $eq: ['$$user.id', ObjectId('61ab90103b8728cb8ddf32f5')]
                                                        },
                                                        then: true,
                                                        else: false
                                                    }
                                                }
                                            },
                                            as: 'user',
                                            input: '$bitid.auth.users'
                                        }
                                    },
                                    {
                                        $map: {
                                            in: {
                                                id: '$$group.id',
                                                role: '$$group.role',
                                                match: {
                                                    $cond: {
                                                        if: {
                                                            $in: ['$$group.id', '$_groups._id']
                                                        },
                                                        then: true,
                                                        else: false
                                                    }
                                                }
                                            },
                                            as: 'group',
                                            input: '$bitid.auth.groups'
                                        }
                                    }
                                ]
                            },
                            as: 'item'
                        }
                    },
                    initialValue: 0
                }
            }
        }
    }
]);