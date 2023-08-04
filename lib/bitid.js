const ObjectId = require('mongodb').ObjectId;

exports.add = (args) => {

    return new Promise((resolve, reject) => {
        try {
            let params = {
                'bitid': {
                    'auth': {
                        'v1': [
                            // {
                            //     'type': 'app|user|group',
                            //     'id': ObjectId(Id),
                            //     'role': role
                            // }
                        ]
                    }
                }
            }

            for (let i = 0; i < args.req.body?.apps?.length; i++) {
                const app = args.req.body.apps[i];
                params.bitid.auth.v1.push({
                    'type': 'app',
                    'id': ObjectId(app.id),
                    'role': app.role
                })
            }

            for (let i = 0; i < args.req.body?.users?.length; i++) {
                const user = args.req.body.users[i];
                params.bitid.auth.v1.push({
                    'type': 'user',
                    'id': ObjectId(user.id),
                    'role': user.role
                })
            }


            for (let i = 0; i < args.req.body?.groups?.length; i++) {
                const group = args.req.body.groups[i];
                params.bitid.auth.v1.push({
                    'type': 'group',
                    'id': ObjectId(group.id),
                    'role': group.role
                })
            }

            resolve(params.bitid.auth.v1);
        } catch (err) {
            reject(err);
        }
    });
};


exports.list = (args) => {

    return new Promise((resolve, reject) => {
        try {
            var params = []

            params.push(
                {
                    $match: {
                        $and: [
                            {
                                '_id': {
                                    $in: args.req.validate.apps.map(app => ObjectId(app))
                                }
                            }
                        ]
                    }
                }
            );

            if (typeof (args.req.body.private) != 'undefined' && args.req.body.private != null) {
                if (Array.isArray(args.req.body.private) && args.req.body.private.length > 0) {
                    let param = params.find(p => typeof (p.$match.$and) != 'undefined' && p.$match.$and != null);
                    if (typeof (param) != 'undefined') {
                        param.$match.$and.push({
                            "bitid.auth.private": {
                                $in: args.req.body.private
                            }
                        });
                    }
                } else if (typeof (args.req.body.private) == 'boolean') {
                    let param = params.find(p => typeof (p.$match.$and) != 'undefined' && p.$match.$and != null);
                    if (typeof (param) != 'undefined') {
                        param.$match.$and.push({
                            "bitid.auth.private": args.req.body.private
                        });
                    };
                };
            };

            if (typeof (args.req.body.appId) != 'undefined' && args.req.body.appId != null) {
                if (Array.isArray(args.req.body.appId) && args.req.body.appId.length > 0) {
                    let param = params.find(p => typeof (p.$match.$and) != 'undefined' && p.$match.$and != null);
                    if (typeof (param) != 'undefined') {
                        param.$match.$and.push({
                            _id: {
                                $in: args.req.body.appId.filter(id => typeof (id) != 'undefined' && id != null && id?.length == 24).map(id => ObjectId(id))
                            }
                        });
                    };
                } else if (typeof (args.req.body.appId) == 'string' && args.req.body.appId?.length == 24) {
                    let param = params.find(p => typeof (p.$match.$and) != 'undefined' && p.$match.$and != null);
                    if (typeof (param) != 'undefined') {
                        param.$match.$and.push({
                            _id: ObjectId(args.req.body.appId)
                        });
                    };
                };
            };

            if (typeof (args.req.body.name) != 'undefined' && args.req.body.name != null) {
                if (Array.isArray(args.req.body.name) && args.req.body.name.length > 0) {
                    let param = params.find(p => typeof (p.$match.$and) != 'undefined' && p.$match.$and != null);
                    if (typeof (param) != 'undefined') {
                        param.$match.$and.push({
                            name: {
                                $in: args.req.body.name.filter(name => typeof (name) != 'undefined' && name != null && name?.length > 0).map(name => {
                                    return {
                                        $regex: name,
                                        $options: 'i'
                                    };
                                })
                            }
                        });
                    };
                } else if (typeof (args.req.body.name) == 'string' && args.req.body.name?.length > 0) {
                    let param = params.find(p => typeof (p.$match.$and) != 'undefined' && p.$match.$and != null);
                    if (typeof (param) != 'undefined') {
                        param.$match.$and.push({
                            name: {
                                $regex: args.req.body.name,
                                $options: 'i'
                            }
                        });
                    };
                };
            };

            if (typeof (args.req.body.limit) != 'undefined' && args.req.body.limit != null) {
                params.push({
                    $limit: args.req.body.limit
                });
            };


            var filter = {};
            if (Array.isArray(args.req.body.filter) && args.req.body.filter?.length > 0) {
                filter['_id'] = 0;
                args.req.body.filter.map(f => {
                    if (f == 'appId') {
                        filter['_id'] = 1;
                    } else if (f == 'apps') {
                        filter['bitid.auth.apps'] = 1;
                    } else if (f == 'users') {
                        filter['bitid.auth.users'] = 1;
                    } else if (f == 'groups') {
                        filter['bitid.auth.groups'] = 1;
                    } else if (f == 'private') {
                        filter['bitid.auth.private'] = 1;
                    } else if (f == 'organizationOnly') {
                        filter['bitid.auth.organizationOnly'] = 1;
                    } else {
                        filter[f] = 1;
                    };
                });
            };
            if (Object.keys(filter).length > 0) {
                params.push({
                    $project: filter
                });
            };

            let listParams = {
                params: params,
                filter: filter
            }
            resolve(listParams)

        } catch (err) {
            reject(err);
        }
    });
};

exports.getHighestRole = (args, type) => {

    return new Promise((resolve, reject) => {
        try {
            var role = 0
            switch (type) {
                case 'app':
                    role = args.apps?.map(o => o.role).sort((a, b) => {
                        return b - a;
                    })[0];
                    break;
                case 'user':
                    role = args.users?.map(o => o.role).sort((a, b) => {
                        return b - a;
                    })[0];
                    break;
                case 'group':
                    role = args.groups?.map(o => o.role).sort((a, b) => {
                        return b - a;
                    })[0];
                    break;
                default:
                    role = 0;
                    break;
            };
            resolve(role)
        }catch(err){
            reject(err);
        }
    });
};


/**
 * The old way
 */
// var params = {
//     'bitid': {
//         'auth': {
//             'apps': args.req.body.apps?.map(o => {
//                 return {
//                     'id': ObjectId(o.id),
//                     'role': o.role
//                 };
//             }) || [],
//             'users': args.req.body.users?.map(o => {
//                 return {
//                     'id': ObjectId(o.id),
//                     'role': o.role
//                 };
//             }) || [],
//             'groups': args.req.body.groups?.map(o => {
//                 return {
//                     'id': ObjectId(o.id),
//                     'role': o.role
//                 };
//             }) || [],
//             'private': args.req.body.private || true,
//             'organizationOnly': args.req.body.organizationOnly || 0
//         }
//     },