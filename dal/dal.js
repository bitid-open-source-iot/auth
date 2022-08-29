const Q = require('q');
const db = require('../db/mongo');
const tools = require('../lib/tools');
const unlink = (args) => JSON.parse(JSON.stringify(args));
const format = require('../lib/format');
const ObjectId = require('mongodb').ObjectId;
const ErrorResponse = require('../lib/error-response');

var module = function () {
	var dalApps = {
		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid': {
					'auth': {
						'apps': args.req.body.apps?.map(o => {
							return {
								'id': ObjectId(o.id),
								'role': o.role
							};
						}) || [],
						'users': args.req.body.users?.map(o => {
							return {
								'id': ObjectId(o.id),
								'role': o.role
							};
						}) || [],
						'groups': args.req.body.groups?.map(o => {
							return {
								'id': ObjectId(o.id),
								'role': o.role
							};
						}) || [],
						'private': args.req.body.private || true,
						'organizationOnly': args.req.body.organizationOnly || 0
					}
				},
				'icons': {
					'icon72x72': null,
					'icon96x96': null,
					'icon128x128': null,
					'icon144x144': null,
					'icon152x152': null,
					'icon192x192': null,
					'icon384x384': null,
					'icon512x512': null
				},
				'google': {
					'database': null,
					'credentials': {}
				},
				'url': args.req.body.url,
				'icon': args.req.body.icon,
				'name': args.req.body.name,
				'theme': args.req.body.theme || {},
				'config': args.req.body.config || {},
				'scopes': args.req.body.scopes || [],
				'secret': args.req.body.secret,
				'domains': args.req.body.domains || [],
				'favicon': args.req.body.favicon,
				'serverDate': new Date()
			};

			if (typeof (args.req.body.icons) != 'undefined' && args.req.body.icons != null) {
				if (typeof (args.req.body.icons.icon72x72) != 'undefined' && args.req.body.icons.icon72x72 != null) {
					params.icons.icon72x72 = args.req.body.icons.icon72x72;
				};
				if (typeof (args.req.body.icons.icon96x96) != 'undefined' && args.req.body.icons.icon96x96 != null) {
					params.icons.icon96x96 = args.req.body.icons.icon96x96;
				};
				if (typeof (args.req.body.icons.icon128x128) != 'undefined' && args.req.body.icons.icon128x128 != null) {
					params.icons.icon128x128 = args.req.body.icons.icon128x128;
				};
				if (typeof (args.req.body.icons.icon144x144) != 'undefined' && args.req.body.icons.icon144x144 != null) {
					params.icons.icon144x144 = args.req.body.icons.icon144x144;
				};
				if (typeof (args.req.body.icons.icon152x152) != 'undefined' && args.req.body.icons.icon152x152 != null) {
					params.icons.icon152x152 = args.req.body.icons.icon152x152;
				};
				if (typeof (args.req.body.icons.icon192x192) != 'undefined' && args.req.body.icons.icon192x192 != null) {
					params.icons.icon192x192 = args.req.body.icons.icon192x192;
				};
				if (typeof (args.req.body.icons.icon384x384) != 'undefined' && args.req.body.icons.icon384x384 != null) {
					params.icons.icon384x384 = args.req.body.icons.icon384x384;
				};
				if (typeof (args.req.body.icons.icon512x512) != 'undefined' && args.req.body.icons.icon512x512 != null) {
					params.icons.icon512x512 = args.req.body.icons.icon512x512;
				};
			};

			if (typeof (args.req.body.google) != 'undefined' && args.req.body.google != null) {
				if (typeof (args.req.body.google.database) != 'undefined' && args.req.body.google.database != null) {
					params.google.database = args.req.body.google.database;
				};
				if (typeof (args.req.body.google.credentials) == 'object' && args.req.body.google.credentials != null) {
					params.google.credentials = args.req.body.google.credentials;
				};
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblApps'
			})
				.then(result => {
					args.result = result[0];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$match: {}
				},
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'bitid.auth.private': false
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
			];

			if (typeof (args.req.body.appId) != 'undefined' && args.req.body.appId != null) {
				params[0].$match._id = ObjectId(args.req.body.appId);
			} else if (typeof (args.req.headers.origin) != 'undefined' && args.req.headers.origin != null) {
				params.domains = args.req.headers.origin.replace('http://', '').replace('https://', '').split('/')[0];
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

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblApps'
			})
				.then(result => {
					args.result = unlink(result[0]);
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		load: (args) => {
			var deferred = Q.defer();

			var params = {};

			if (typeof (args.req.body.appId) != 'undefined' && args.req.body.appId != null) {
				if (typeof (args.req.body.appId) == 'string' && args.req.body.appId?.length == 24) {
					params._id = ObjectId(args.req.body.appId);
				};
			};

			if (Object.keys(params).length == 0) {
				if (typeof (args.req.headers.origin) != 'undefined' && args.req.headers.origin != null) {
					params.domains = args.req.headers.origin.replace('http://', '').replace('https://', '').split('/')[0];
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'appId') {
						filter['_id'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblApps'
			})
				.then(result => {
					args.result = result[0];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
			];

			if (typeof (args.req.body.private) != 'undefined' && args.req.body.private != null) {
				if (Array.isArray(args.req.body.private) && args.req.body.private.length > 0) {
					params[2].$match.$or.push({
						private: {
							$in: args.req.body.private
						}
					});
				} else if (typeof (args.req.body.private) == 'boolean') {
					params[2].$match.$or.push({
						private: args.req.body.private
					});
				};
			};

			if (typeof (args.req.body.appId) != 'undefined' && args.req.body.appId != null) {
				if (Array.isArray(args.req.body.appId) && args.req.body.appId.length > 0) {
					params[2].$match.$or.map(param => {
						param._id = {
							$in: args.req.body.appId.filter(id => typeof (id) != 'undefined' && id != null && id?.length == 24).map(id => ObjectId(id))
						};
					});
				} else if (typeof (args.req.body.appId) == 'string' && args.req.body.appId?.length == 24) {
					params[2].$match.$or.map(param => {
						param._id = ObjectId(args.req.body.appId);
					});
				};
			};

			if (typeof (args.req.body.name) != 'undefined' && args.req.body.name != null) {
				params[2].$match.$or.map(param => {
					param.name = {
						$regex: args.req.body.name,
						$options: 'i'
					};
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

			if (typeof (args.req.body.limit) != 'undefined' && args.req.body.limit != null) {
				params.push({
					$limit: args.req.body.limit
				});
			};

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblApps'
			})
				.then(result => {
					args.result = unlink(result);
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		share: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.appId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': {
							$gte: 4
						}
					}
				},
				{
					$project: {
						'_id': 1,
						'role': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblApps'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.appId)
					};

					var update = {
						$set: {
							'serverDate': new Date()
						}
					};

					switch (args.req.body.type) {
						case ('app'):
							params['bitid.auth.apps.id'] = {
								$ne: ObjectId(args.req.body.id)
							};
							update.$push = {
								'bitid.auth.apps': {
									'id': ObjectId(args.req.body.id),
									'role': args.req.body.role
								}
							};
							break;
						case ('user'):
							params['bitid.auth.users.id'] = {
								$ne: ObjectId(args.req.body.id)
							};
							update.$push = {
								'bitid.auth.users': {
									'id': ObjectId(args.req.body.id),
									'role': args.req.body.role
								}
							};
							break;
						case ('group'):
							params['bitid.auth.groups.id'] = {
								$ne: ObjectId(args.req.body.id)
							};
							update.$push = {
								'bitid.auth.groups': {
									'id': ObjectId(args.req.body.id),
									'role': args.req.body.role
								}
							};
							break;
						default:
							deferred.reject({
								code: 503,
								message: 'Could not locate \'type\' in request payload!'
							});
							return;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblApps'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.appId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': {
							$gte: 2
						}
					}
				},
				{
					$project: {
						'_id': 1,
						'role': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblApps'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.appId)
					};

					var update = {
						$set: {
							'serverDate': new Date()
						}
					};
					if (typeof (args.req.body.google) != 'undefined' && args.req.body.google != null) {
						if (typeof (args.req.body.google.database) != 'undefined' && args.req.body.google.database != null) {
							update.$set['google.database'] = args.req.body.google.database;
						};
						if (typeof (args.req.body.google.credentials) == 'object' && args.req.body.google.credentials != null) {
							update.$set['google.credentials'] = args.req.body.google.credentials;
						};
					};
					if (typeof (args.req.body.url) != 'undefined' && args.req.body.url != null) {
						update.$set.url = args.req.body.url;
					};
					if (typeof (args.req.body.name) != 'undefined' && args.req.body.name != null) {
						update.$set.name = args.req.body.name;
					};
					if (typeof (args.req.body.icon) != 'undefined' && args.req.body.icon != null) {
						update.$set.icon = args.req.body.icon;
					};
					if (typeof (args.req.body.icons) != 'undefined' && args.req.body.icons != null) {
						if (typeof (args.req.body.icons.icon72x72) != 'undefined' && args.req.body.icons.icon72x72 != null) {
							update.$set['icons.icon72x72'] = args.req.body.icons.icon72x72;
						};
						if (typeof (args.req.body.icons.icon96x96) != 'undefined' && args.req.body.icons.icon96x96 != null) {
							update.$set['icons.icon96x96'] = args.req.body.icons.icon96x96;
						};
						if (typeof (args.req.body.icons.icon128x128) != 'undefined' && args.req.body.icons.icon128x128 != null) {
							update.$set['icons.icon128x128'] = args.req.body.icons.icon128x128;
						};
						if (typeof (args.req.body.icons.icon144x144) != 'undefined' && args.req.body.icons.icon144x144 != null) {
							update.$set['icons.icon144x144'] = args.req.body.icons.icon144x144;
						};
						if (typeof (args.req.body.icons.icon152x152) != 'undefined' && args.req.body.icons.icon152x152 != null) {
							update.$set['icons.icon152x152'] = args.req.body.icons.icon152x152;
						};
						if (typeof (args.req.body.icons.icon192x192) != 'undefined' && args.req.body.icons.icon192x192 != null) {
							update.$set['icons.icon192x192'] = args.req.body.icons.icon192x192;
						};
						if (typeof (args.req.body.icons.icon384x384) != 'undefined' && args.req.body.icons.icon384x384 != null) {
							update.$set['icons.icon384x384'] = args.req.body.icons.icon384x384;
						};
						if (typeof (args.req.body.icons.icon512x512) != 'undefined' && args.req.body.icons.icon512x512 != null) {
							update.$set['icons.icon512x512'] = args.req.body.icons.icon512x512;
						};
					};
					if (typeof (args.req.body.theme) != 'undefined' && args.req.body.theme != null) {
						update.$set.theme = args.req.body.theme;
					};
					if (typeof (args.req.body.config) != 'undefined' && args.req.body.config != null) {
						update.$set.config = args.req.body.config;
					};
					if (typeof (args.req.body.secret) != 'undefined' && args.req.body.secret != null) {
						update.$set.secret = args.req.body.secret;
					};
					if (typeof (args.req.body.scopes) != 'undefined' && args.req.body.scopes != null) {
						update.$set.scopes = args.req.body.scopes;
					};
					if (typeof (args.req.body.domains) != 'undefined' && args.req.body.domains != null) {
						update.$set.domains = args.req.body.domains;
					};
					if (typeof (args.req.body.favicon) != 'undefined' && args.req.body.favicon != null) {
						update.$set.favicon = args.req.body.favicon;
					};
					if (typeof (args.req.body.private) != 'undefined' && args.req.body.private != null) {
						update.$set['bitid.auth.private'] = args.req.body.private;
					};
					if (typeof (args.req.body.organizationOnly) != 'undefined' && args.req.body.organizationOnly != null) {
						update.$set['bitid.auth.organizationOnly'] = args.req.body.organizationOnly;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblApps'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.appId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': 5
					}
				},
				{
					$project: {
						'_id': 1,
						'role': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblApps'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.appId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'remove',
						'collection': 'tblApps'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		isadmin: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.appId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': {
							$gte: 1
						}
					}
				},
				{
					$project: {
						'_id': 1,
						'role': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblApps'
			})
				.then(result => {
					args.result = true;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		manifest: (args) => {
			var deferred = Q.defer();

			if (typeof (args.req.headers.origin) != 'undefined' && args.req.headers.origin != null) {
				args.req.headers.origin = args.req.headers.origin.replace('http://', '').replace('https://', '').split('/')[0];
			};

			if (typeof (args.req.headers.referer) != 'undefined' && args.req.headers.referer != null) {
				args.req.headers.referer = args.req.headers.referer.replace('http://', '').replace('https://', '').split('/')[0];
			};

			var match = {
				domains: args.req.headers.origin || args.req.headers.referer
			};

			var params = [
				{
					$match: match
				},
				{
					$project: {
						icons: [
							{
								src: '$icons.icon72x72',
								type: 'image/png',
								sizes: '72x72',
								purpose: 'maskable any'
							},
							{
								src: '$icons.icon96x96',
								type: 'image/png',
								sizes: '96x96',
								purpose: 'maskable any'
							},
							{
								src: '$icons.icon128x128',
								type: 'image/png',
								sizes: '128x128',
								purpose: 'maskable any'
							},
							{
								src: '$icons.icon144x144',
								type: 'image/png',
								sizes: '144x144',
								purpose: 'maskable any'
							},
							{
								src: '$icons.icon152x152',
								type: 'image/png',
								sizes: '152x152',
								purpose: 'maskable any'
							},
							{
								src: '$icons.icon192x192',
								type: 'image/png',
								sizes: '192x192',
								purpose: 'maskable any'
							},
							{
								src: '$icons.icon384x384',
								type: 'image/png',
								sizes: '384x384',
								purpose: 'maskable any'
							},
							{
								src: '$icons.icon512x512',
								type: 'image/png',
								sizes: '512x512',
								purpose: 'maskable any'
							}
						],
						name: '$name',
						scope: './',
						display: 'standalone',
						start_url: './',
						short_name: '$name',
						theme_color: '$theme.color',
						background_color: '$theme.background'
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblApps'
			})
				.then(result => {
					args.result = result[0];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		validate: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$match: {
						'_id': ObjectId(args.req.body.header.appId)
					}
				},
				{
					$project: {
						'url': 1,
						'icon': 1,
						'name': 1,
						'appId': '$_id',
						'config': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblApps'
			})
				.then(result => {
					args.app = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		allowaccess: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.header.userId),
				'validated': 1
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblUsers'
			})
				.then(result => {
					var deferred = Q.defer();

					if (result.length > 0) {
						args.user = result[0];
						var password = tools.encryption.sha512(args.req.body.password, args.user.salt);

						if (password.hash == args.user.hash) {
							if (args.user.validated == 1) {
								var params = {
									'_id': ObjectId(args.req.body.appId)
								};

								deferred.resolve({
									'params': params,
									'operation': 'find',
									'collection': 'tblApps'
								});
							} else {
								deferred.reject({
									code: 401,
									message: 'Account verification is required!'
								});
							};
						} else {
							deferred.reject({
								code: 401,
								message: 'Email/User ID or Password is incorrect!'
							});
						};
					} else {
						deferred.reject({
							code: 69,
							message: 'Account not yet registered!'
						});
					};

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					var deferred = Q.defer();

					args.app = result[0];

					var params = {
						'bitid': {
							'auth': {
								'apps': [],
								'users': [
									{
										'id': ObjectId(args.req.body.header.userId),
										'role': 5
									}
								],
								'groups': [],
								'private': true,
								'organizationOnly': 0
							}
						},
						'token': {
							'alias': [],
							'bearer': tools.encryption.generateRandomString(64),
							'scopes': args.app.scopes,
							'expiry': new Date(args.req.body.expiry),
							'timeZone': args.user.timeZone || 0,
							'tokenAddOn': {},
							'description': args.req.body.description
						},
						'appId': ObjectId(args.req.body.appId),
						'device': args.req.headers['user-agent'],
						'disabled': false,
						'description': args.req.body.description
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblTokens'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result[0];
					args.result.user = {
						privacyPolicy: args.user.privacyPolicy,
						termsAndConditions: args.user.termsAndConditions
					};
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.appId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$project: {
						'_id': 1,
						'role': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblApps'
			})
				.then(result => {
					var deferred = Q.defer();

					if (args.req.body.id == args.req.body.header.userId && result[0].role == 5) {
						deferred.reject({
							code: 503,
							message: 'An owner may not be unsubscribed!'
						});
					} else {
						var params = {
							'_id': ObjectId(args.req.body.appId)
						};

						var update = {
							$set: {
								'serverDate': new Date()
							}
						};

						switch (args.req.body.type) {
							case ('app'):
								update.$pull = {
									'bitid.auth.apps': {
										'id': ObjectId(args.req.body.id)
									}
								};
								break;
							case ('user'):
								update.$pull = {
									'bitid.auth.users': {
										'id': ObjectId(args.req.body.id)
									}
								};
								break;
							case ('group'):
								update.$pull = {
									'bitid.auth.groups': {
										'id': ObjectId(args.req.body.id)
									}
								};
								break;
							default:
								deferred.reject({
									code: 503,
									message: 'Could not locate \'type\' in request payload!'
								});
								return;
						};

						deferred.resolve({
							'params': params,
							'update': update,
							'operation': 'update',
							'collection': 'tblApps'
						});
					};

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		updatesubscriber: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.appId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': {
							$gte: 4
						}
					}
				},
				{
					$project: {
						'_id': 1,
						'role': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblApps'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.appId)
					};

					var update = {
						$set: {
							'serverDate': new Date()
						}
					};

					switch (args.req.body.type) {
						case ('app'):
							params['bitid.auth.apps'] = {
								$elemMatch: {
									'id': ObjectId(args.req.body.id)
								}
							};
							update.$set = {
								'bitid.auth.apps.$.role': args.req.body.role
							};
							break;
						case ('user'):
							params['bitid.auth.users'] = {
								$elemMatch: {
									'id': ObjectId(args.req.body.id)
								}
							};
							update.$set = {
								'bitid.auth.users.$.role': args.req.body.role
							};
							break;
						case ('group'):
							params['bitid.auth.groups'] = {
								$elemMatch: {
									'id': ObjectId(args.req.body.id)
								}
							};
							update.$set = {
								'bitid.auth.groups.$.role': args.req.body.role
							};
							break;
						default:
							deferred.reject({
								code: 503,
								message: 'Could not locate \'type\' in request payload!'
							});
							return;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblApps'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalAuth = {
		auth: (args) => {
			var deferred = Q.defer();

			var token = JSON.parse(args.req.headers.authorization);
			token.expiry = new Date(token.expiry);

			var params = {
				'token': token,
				'appId': ObjectId(args.req.body.header.appId),
				'disabled': false,
				'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblTokens'
			})
				.then(result => {
					var deferred = Q.defer();

					var scopes = [];
					token.scopes.map(scope => {
						if (typeof (scope) == 'object' && typeof (scope) != null) {
							scopes.push(scope.url);
						} else if (typeof (scope) == 'string' && typeof (scope) != null) {
							scopes.push(scope);
						};
					});

					var params = {
						'url': {
							$in: scopes
						}
					};

					var filter = {
						'url': 1,
						'roles': 1
					};

					deferred.resolve({
						'params': params,
						'filter': filter,
						'operation': 'find',
						'collection': 'tblScopes'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					var deferred = Q.defer();

					var scopes = [];
					token.scopes.map(scope => {
						if (typeof (scope) == 'object' && typeof (scope) != null) {
							scopes.push(scope.url);
						} else if (typeof (scope) == 'string' && typeof (scope) != null) {
							scopes.push(scope);
						};
					});

					var found = false;
					result.map(row => {
						if (row.url == args.req.body.reqURI || row.url == '*') {
							found = true;
						};
					});

					if (!found) {
						var err = new ErrorResponse();
						err.error.code = 401;
						err.error.errors[0].code = 401;
						err.error.errors[0].reason = 'Scope not allowed: ' + args.req.body.reqURI;
						err.error.errors[0].message = 'Scope not allowed: ' + args.req.body.reqURI;
						deferred.reject(err);
					} else {
						deferred.resolve(args);
					};

					return deferred.promise;
				})
				.then(result => {
					var deferred = Q.defer();

					var now = new Date();
					var expiry = new Date(token.expiry);

					if (expiry < now) {
						var err = new ErrorResponse();
						err.error.code = 401;
						err.error.errors[0].code = 401;
						err.error.errors[0].reason = 'Token Expired';
						err.error.errors[0].message = 'Token Expired';
						deferred.reject(err);
					} else {
						deferred.resolve(args);
					};

					return deferred.promise;
				})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.header.appId)
					};

					var filter = {
						'_id': 1
					};

					deferred.resolve({
						'params': params,
						'filter': filter,
						'operation': 'find',
						'collection': 'tblApps'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					deferred.resolve([{
						'email': format.email(args.req.body.header.email),
						'appId': args.req.body.header.appId,
						'userId': args.req.body.header.userId
					}]);
				}, err => {
					deferred.reject(err);
				});

			return deferred.promise;
		},

		verify: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': format.email(args.req.body.email)
			};

			var filter = {
				'_id': 1,
				'name': 1,
				'email': 1,
				'validated': 1
			};

			db.call({
				'limit': 1,
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblUsers',
				'allowNoRecordsFound': true
			})
				.then(result => {
					var deferred = Q.defer();

					if (result.length > 0) {
						args.user = result[0];

						if (args.user.validated == 1) {
							var err = new ErrorResponse();
							err.error.errors[0].code = 409;
							err.error.errors[0].reason = 'User is already verified';
							err.error.errors[0].message = 'User is already verified';
							deferred.reject(err);
						} else {
							if (typeof (args.req.body.code) != 'undefined' && args.req.body.code != null) {
								args.req.body.code = parseInt(args.req.body.code);
							};

							var params = {
								'code': args.req.body.code,
								'email': format.email(args.req.body.email),
								'validated': 0
							};

							deferred.resolve({
								'params': params,
								'operation': 'find',
								'collection': 'tblUsers',
								'allowNoRecordsFound': true
							});
						};
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 401;
						err.error.errors[0].reason = 'Account not yet registered!';
						err.error.errors[0].message = 'Account not yet registered!';
						deferred.reject(err);
					};

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					var deferred = Q.defer();

					if (result.length > 0) {
						var params = {
							'email': format.email(args.req.body.email)
						};

						var update = {
							$set: {
								'validated': 1
							}
						};

						deferred.resolve({
							'params': params,
							'update': update,
							'operation': 'update',
							'collection': 'tblUsers'
						});
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 401;
						err.error.errors[0].reason = 'Account registered but verification incorrect!';
						err.error.errors[0].message = 'Account registered but verification incorrect!';
						deferred.reject(err);
					};

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, err => {
					deferred.reject(err);
				});

			return deferred.promise;
		},

		validate: (args) => {
			var deferred = Q.defer();

			if (typeof (args.req.headers.authorization) == 'undefined' || args.req.headers.authorization == null) {
				var err = new ErrorResponse();
				err.error.code = 401;
				err.error.errors[0].coded = 401;
				err.error.errors[0].reason = 'token not found';
				err.error.errors[0].message = 'token not found';
				deferred.reject(err);
				return;
			} else {
				try {
					args.req.headers.authorization = JSON.parse(args.req.headers.authorization);
				} catch (error) {
					var err = new ErrorResponse();
					err.error.code = 401;
					err.error.errors[0].coded = 401;
					err.error.errors[0].reason = 'invalid token object';
					err.error.errors[0].message = 'invalid token object';
					deferred.reject(err);
					return;
				};
			};

			args.req.headers.authorization.expiry = new Date(args.req.headers.authorization.expiry);

			var match = {
				'appId': ObjectId(args.req.body.header.appId)
			};
			Object.keys(args.req.headers.authorization).map(key => {
				match['token.' + key] = args.req.headers.authorization[key];
			});
			delete match['token.expiry'];

			var params = [
				{
					$match: match
				},
				{
					$lookup: {
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: [ObjectId(args.req.body.header.appId), '$_id']
											}
										]
									}
								}
							},
							{
								$project: {
									'_id': 1
								}
							}
						],
						as: '_app',
						from: 'tblApps'
					}
				},
				{
					$unwind: {
						path: '$_app',
						preserveNullAndEmptyArrays: true
					}
				},
				{
					$lookup: {
						pipeline: [
							{
								$match: {
									$expr: {
										$or: [
											{
												$eq: [args.req.body.scope, '$url']
											}
										]
									}
								}
							},
							{
								$project: {
									'_id': 1
								}
							}
						],
						as: '_scope',
						from: 'tblScopes'
					}
				},
				{
					$unwind: {
						path: '$_scope',
						preserveNullAndEmptyArrays: true
					}
				},
				{
					$lookup: {
						let: {
							'appId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.apps.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.apps.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.groups.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.groups.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'disabled': false,
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'disabled': false,
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'disabled': false,
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							}
						]
					}
				},
				{
					$project: {
						'_id': 1,
						'_app': 1,
						'_scope': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblTokens',
				'allowNoRecordsFound': true
			})
				.then(result => {
					var deferred = Q.defer();

					if (result.length > 0) {
						if (!result[0]._app || result[0]._app?.length === 0) {
							deferred.reject({
								code: 401,
								message: 'App was not found!'
							});
						} else if (!result[0]._scope || result[0]._scope?.length === 0) {
							deferred.reject({
								code: 401,
								message: 'Scope was not found!'
							});
						} else {
							var scopes = [];
							args.req.headers.authorization.scopes.map(scope => {
								if (typeof (scope) == 'object') {
									scopes.push(scope.url);
								} else if (typeof (scope) == 'string') {
									scopes.push(scope);
								};
							});

							if (scopes.includes('*') || scopes.includes(args.req.body.scope)) {
								deferred.resolve(result);
							} else {
								deferred.reject({
									code: 401,
									message: 'Scope not present in token!'
								});
							};
						}
					} else {
						deferred.reject({
							code: 401,
							message: 'Token was not found or has expired!'
						});
					};

					return deferred.promise;
				})
				.then(result => dalStatistics.write(args))
				.then(async result => {
					var params = [
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
														$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
														$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
										'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
									},
									{
										'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
									},
									{
										'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
									}
								]
							}
						},
						{
							$project: {
								_id: 1
							}
						}
					];

					return {
						'params': params,
						'operation': 'aggregate',
						'collection': 'tblApps',
						'allowNoRecordsFound': true
					};
				})
				.then(db.call)
				.then(async result => {
					args.apps = result.map(o => o._id.toString());

					var params = [
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
														$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
														$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
										'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
									},
									{
										'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
									},
									{
										'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
									}
								]
							}
						},
						{
							$project: {
								_id: 1
							}
						}
					];

					return {
						'params': params,
						'operation': 'aggregate',
						'collection': 'tblGroups',
						'allowNoRecordsFound': true
					};
				})
				.then(db.call)
				.then(result => {
					args.groups = result.map(o => o._id.toString());
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		register: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': format.email(args.req.body.email)
			};

			var filter = {
				'_id': 1,
				'validated': 1
			};

			db.call({
				'limit': 1,
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblUsers',
				'allowNoRecordsFound': true
			})
				.then(result => {
					var deferred = Q.defer();

					if (result.length == 0) {
						var params = {
							'name': {
								'last': '',
								'first': '',
								'middle': ''
							},
							'number': {
								'tel': '',
								'mobile': ''
							},
							'address': {
								'billing': {
									'company': {
										'vat': '',
										'reg': ''
									},
									'street': '',
									'suburb': '',
									'country': '',
									'cityTown': '',
									'additional': '',
									'postalCode': ''
								},
								'physical': {
									'company': {
										'vat': '',
										'reg': ''
									},
									'street': '',
									'suburb': '',
									'country': '',
									'cityTown': '',
									'additional': '',
									'postalCode': ''
								},
								'same': false
							},
							'identification': {
								'type': '',
								'number': ''
							},
							'code': Math.floor(Math.random() * 900000 + 100000),
							'salt': args.req.body.salt,
							'hash': args.req.body.hash,
							'email': format.email(args.req.body.email),
							'picture': '',
							'language': '',
							'timezone': 0,
							'username': '',
							'validated': 0,
							'serverDate': new Date(),
							'privacyPolicy': false,
							'newsAndChanges': false,
							'termsAndConditions': false
						};

						if (typeof (args.req.body.picture) != 'undefined') {
							params.picture = args.req.body.picture;
						};
						if (typeof (args.req.body.language) != 'undefined') {
							params.language = args.req.body.language;
						};
						if (typeof (args.req.body.timezone) != 'undefined') {
							params.timezone = args.req.body.timezone;
						};
						if (typeof (args.req.body.username) != 'undefined') {
							params.username = args.req.body.username;
						};
						if (typeof (args.req.body.name) != 'undefined') {
							if (typeof (args.req.body.name.last) != 'undefined') {
								params.name.last = args.req.body.name.last;
							};
							if (typeof (args.req.body.name.first) != 'undefined') {
								params.name.first = args.req.body.name.first;
							};
							if (typeof (args.req.body.name.middle) != 'undefined') {
								params.name.middle = args.req.body.name.middle;
							};
						};
						if (typeof (args.req.body.number) != 'undefined') {
							if (typeof (args.req.body.number.tel) != 'undefined') {
								params.number.tel = args.req.body.number.tel;
							};
							if (typeof (args.req.body.number.mobile) != 'undefined') {
								params.number.mobile = args.req.body.number.mobile;
							};
						};
						if (typeof (args.req.body.address) != 'undefined') {
							if (typeof (args.req.body.address.billing) != 'undefined') {
								if (typeof (args.req.body.address.billing.company) != 'undefined') {
									if (typeof (args.req.body.address.billing.company.vat) != 'undefined') {
										params.address.billing.company.vat = args.req.body.address.billing.company.vat;
									};
									if (typeof (args.req.body.address.billing.company.reg) != 'undefined') {
										params.address.billing.company.reg = args.req.body.address.billing.company.reg;
									};
								};
								if (typeof (args.req.body.address.billing.street) != 'undefined') {
									params.address.billing.street = args.req.body.address.billing.street;
								};
								if (typeof (args.req.body.address.billing.suburb) != 'undefined') {
									params.address.billing.suburb = args.req.body.address.billing.suburb;
								};
								if (typeof (args.req.body.address.billing.country) != 'undefined') {
									params.address.billing.country = args.req.body.address.billing.country;
								};
								if (typeof (args.req.body.address.billing.cityTown) != 'undefined') {
									params.address.billing.cityTown = args.req.body.address.billing.cityTown;
								};
								if (typeof (args.req.body.address.billing.additional) != 'undefined') {
									params.address.billing.additional = args.req.body.address.billing.additional;
								};
								if (typeof (args.req.body.address.billing.postalCode) != 'undefined') {
									params.address.billing.postalCode = args.req.body.address.billing.postalCode;
								};
							};
							if (typeof (args.req.body.address.physical) != 'undefined') {
								if (typeof (args.req.body.address.physical.company) != 'undefined') {
									if (typeof (args.req.body.address.physical.company.vat) != 'undefined') {
										params.address.physical.company.vat = args.req.body.address.physical.company.vat;
									};
									if (typeof (args.req.body.address.physical.company.reg) != 'undefined') {
										params.address.physical.company.reg = args.req.body.address.physical.company.reg;
									};
								};
								if (typeof (args.req.body.address.physical.street) != 'undefined') {
									params.address.physical.street = args.req.body.address.physical.street;
								};
								if (typeof (args.req.body.address.physical.suburb) != 'undefined') {
									params.address.physical.suburb = args.req.body.address.physical.suburb;
								};
								if (typeof (args.req.body.address.physical.country) != 'undefined') {
									params.address.physical.country = args.req.body.address.physical.country;
								};
								if (typeof (args.req.body.address.physical.cityTown) != 'undefined') {
									params.address.physical.cityTown = args.req.body.address.physical.cityTown;
								};
								if (typeof (args.req.body.address.physical.additional) != 'undefined') {
									params.address.physical.additional = args.req.body.address.physical.additional;
								};
								if (typeof (args.req.body.address.physical.postalCode) != 'undefined') {
									params.address.physical.postalCode = args.req.body.address.physical.postalCode;
								};
							};
							if (typeof (args.req.body.address.same) != 'undefined') {
								params.address.same = args.req.body.address.same;
							};
						};
						if (typeof (args.req.body.identification) != 'undefined') {
							if (typeof (args.req.body.identification.type) != 'undefined') {
								params.identification.type = args.req.body.identification.type;
							};
							if (typeof (args.req.body.identification.number) != 'undefined') {
								params.identification.number = args.req.body.identification.number;
							};
						};
						if (typeof (args.req.body.privacyPolicy) != 'undefined') {
							params.privacyPolicy = args.req.body.privacyPolicy;
						};
						if (typeof (args.req.body.newsAndChanges) != 'undefined') {
							params.newsAndChanges = args.req.body.newsAndChanges;
						};
						if (typeof (args.req.body.termsAndConditions) != 'undefined') {
							params.termsAndConditions = args.req.body.termsAndConditions;
						};

						deferred.resolve({
							'params': params,
							'operation': 'insert',
							'collection': 'tblUsers'
						});
					} else if (result[0].validated == 0) {
						deferred.reject({
							code: 72,
							message: 'Account has been created but is awaiting email verification!'
						});
					} else {
						deferred.reject({
							code: 70,
							message: 'This account already exists!'
						});
					};

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.user = result[0];
					args.result = result[0];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		changeemail: (args) => {
			var deferred = Q.defer();

			if (typeof (args.req.body.email) == 'undefined') {
				var err = new ErrorResponse();
				err.error.errors[0].code = 503;
				err.error.errors[0].reason = 'A replacement email is required!';
				err.error.errors[0].message = 'A replacement email is required!';
				deferred.reject(err);
			} else {
				var params = {
					'_id': ObjectId(args.req.body.header.userId)
				};

				db.call({
					'params': params,
					'operation': 'find',
					'collection': 'tblUsers',
					'allowNoRecordsFound': true
				})
					.then(result => {
						var deferred = Q.defer();

						if (result.length > 0) {
							var params = {
								'email': format.email(args.req.body.email)
							};

							deferred.resolve({
								'params': params,
								'operation': 'find',
								'collection': 'tblUsers',
								'allowNoRecordsFound': true
							});
						} else {
							deferred.reject({
								code: 69,
								message: 'Account not yet registered!'
							});
						};

						return deferred.promise;
					})
					.then(db.call)
					.then(result => {
						var deferred = Q.defer();

						if (result.length == 0) {
							var params = {
								'_id': ObjectId(args.req.body.header.userId)
							};

							var update = {
								$set: {
									'email': format.email(args.req.body.email)
								}
							};

							deferred.resolve({
								'params': params,
								'update': update,
								'operation': 'update',
								'collection': 'tblUsers'
							});
						} else {
							deferred.reject({
								code: 71,
								message: 'An account with email address of ' + args.req.body.email + ' already exists!'
							});
						};

						return deferred.promise;
					})
					.then(db.call)
					.then(result => {
						args.result = result;
						deferred.resolve(args);
					}, error => {
						var err = new ErrorResponse();
						err.error.errors[0].code = error.code;
						err.error.errors[0].reason = error.message;
						err.error.errors[0].message = error.message;
						deferred.reject(err);
					});
			};

			return deferred.promise;
		},

		allowaccess: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.header.userId)
			};

			if (typeof (args.req.body.expiry) == 'undefined') {
				args.req.body.expiry = Date.now() + 31 * 24 * 60 * 60 * 1000;
			};
			args.req.body.expiry = new Date(args.req.body.expiry);

			if (typeof (args.req.body.tokenAddOn) == 'undefined') {
				args.req.body.tokenAddOn = {};
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblUsers',
				'allowNoRecordsFound': true
			})
				.then(result => {
					var deferred = Q.defer();

					if (result.length > 0) {
						args.user = result[0];

						if (args.user.validated == 1) {
							deferred.resolve(args);
						} else {
							var err = new ErrorResponse();
							err.error.errors[0].code = 401;
							err.error.errors[0].reason = 'Account verification is required!';
							err.error.errors[0].message = 'Account verification is required!';
							deferred.reject(err);
						};
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'Account not yet registered!';
						err.error.errors[0].message = 'Account not yet registered!';
						deferred.reject(err);
					};

					return deferred.promise;
				})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.header.appId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'find',
						'collection': 'tblApps',
						'allowNoRecordsFound': true
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					var deferred = Q.defer();

					if (result.length > 0) {
						args.app = result[0];

						var params = {
							'device': args.req.headers['user-agent'],
							'appId': ObjectId(args.req.body.header.appId),
							'description': args.req.body.description || args.app.name,
							'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
						};

						deferred.resolve({
							'params': params,
							'operation': 'remove',
							'collection': 'tblTokens',
							'allowNoRecordsFound': true
						});
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'Application not found!';
						err.error.errors[0].message = 'Application not found!';
						deferred.reject(err);
					};

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					var deferred = Q.defer();

					if (!Array.isArray(args.req.body.scopes) || typeof (args.req.body.scopes) == 'undefined' || args.req.body.scopes.length == 0) {
						args.req.body.scopes = ['*'];
					};

					var params = {
						'bitid': {
							'auth': {
								'apps': [],
								'users': [
									{
										'id': ObjectId(args.req.body.header.userId),
										'role': 5
									}
								],
								'groups': [],
								'private': true,
								'organizationOnly': 0
							}
						},
						'token': {
							'bearer': tools.encryption.generateRandomString(64),
							'scopes': args.req.body.scopes,
							'expiry': new Date(args.req.body.expiry),
							'timeZone': args.user.timeZone || 0,
							'tokenAddOn': args.req.body.tokenAddOn,
							'description': args.req.body.description || args.app.name
						},
						'appId': ObjectId(args.req.body.header.appId),
						'device': args.req.headers['user-agent'],
						'disabled': false,
						'description': args.req.body.description || args.app.name
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblTokens'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result[0];
					deferred.resolve(args);
				}, err => {
					deferred.reject(err);
				});

			return deferred.promise;
		},

		authenticate: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': format.email(args.req.body.email)
			};

			var filter = {
				'_id': 1,
				'salt': 1,
				'hash': 1,
				'validated': 1
			};

			if (typeof (args.req.body.expiry) == 'undefined') {
				args.req.body.expiry = Date.now() + 31 * 24 * 60 * 60 * 1000;
			};
			args.req.body.expiry = new Date(args.req.body.expiry);

			if (typeof (args.req.body.tokenAddOn) == 'undefined') {
				args.req.body.tokenAddOn = {};
			};

			db.call({
				'limit': 1,
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblUsers',
				'allowNoRecordsFound': true
			})
				.then(result => {
					var deferred = Q.defer();

					if (result.length > 0) {
						args.user = result[0];
						var password = tools.encryption.sha512(args.req.body.password, args.user.salt);

						if (password.hash == args.user.hash) {
							if (args.user.validated == 1) {
								deferred.resolve(args);
							} else {
								var err = new ErrorResponse();
								err.error.errors[0].code = 401;
								err.error.errors[0].reason = 'Account verification is required!';
								err.error.errors[0].message = 'Account verification is required!';
								deferred.reject(err);
							};
						} else {
							var err = new ErrorResponse();
							err.error.errors[0].code = 401;
							err.error.errors[0].reason = 'Password is incorrect!';
							err.error.errors[0].message = 'Password is incorrect!';
							deferred.reject(err);
						};
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'Account not yet registered!';
						err.error.errors[0].message = 'Account not yet registered!';
						deferred.reject(err);
					};

					return deferred.promise;
				})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.header.appId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'find',
						'collection': 'tblApps',
						'allowNoRecordsFound': true
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					var deferred = Q.defer();

					if (result.length > 0) {
						args.app = result[0];

						var valid = true;

						const users = args.app.bitid.auth.users.map(user => user.id.toString());
						if (args.app.private && !users.includes(args.user).toString()) {
							valid = false;
						};

						if (valid) {
							var params = {
								'appId': ObjectId(args.req.body.header.appId),
								'device': args.req.headers['user-agent'],
								'description': args.req.body.description || args.app.name,
								'bitid.auth.users.id': args.user._id
							};

							deferred.resolve({
								'params': params,
								'operation': 'remove',
								'collection': 'tblTokens',
								'allowNoRecordsFound': true
							});
						} else {
							var err = new ErrorResponse();
							err.error.errors[0].code = 401;
							err.error.errors[0].reason = 'Application is private!';
							err.error.errors[0].message = 'Application is private!';
							deferred.reject(err);
						};
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'Application not found!';
						err.error.errors[0].message = 'Application not found!';
						deferred.reject(err);
					};

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'bitid': {
							'auth': {
								'apps': [],
								'users': [
									{
										'id': args.user._id,
										'role': 5
									}
								],
								'groups': [],
								'private': true,
								'organizationOnly': 0
							}
						},
						'token': {
							'bearer': tools.encryption.generateRandomString(64),
							'scopes': [
								'*'
							],
							'expiry': new Date(args.req.body.expiry),
							'timeZone': args.user.timeZone || 0,
							'tokenAddOn': args.req.body.tokenAddOn,
							'description': args.req.body.description || args.app.name
						},
						'appId': ObjectId(args.req.body.header.appId),
						'device': args.req.headers['user-agent'],
						'disabled': false,
						'description': args.req.body.description || args.app.name
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblTokens'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result[0];
					args.result.userId = args.user._id;
					deferred.resolve(args);
				}, err => {
					deferred.reject(err);
				});

			return deferred.promise;
		},

		resetpassword: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': format.email(args.req.body.email)
			};

			var filter = {
				'_id': 1,
				'name': 1,
				'email': 1,
				'validated': 1
			};

			db.call({
				'limit': 1,
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblUsers',
				'allowNoRecordsFound': true
			})
				.then(result => {
					var deferred = Q.defer();

					if (result.length > 0) {
						args.user = result[0];

						if (args.user.validated == 0) {
							deferred.reject({
								code: 409,
								message: 'User is already verified'
							});
						} else {
							args.user.password = tools.random(16);
							var encryption = tools.encryption.saltHashPassword(args.user.password);

							var params = {
								'email': format.email(args.req.body.email)
							};
							var update = {
								$set: {
									'salt': encryption.salt,
									'hash': encryption.hash,
									'serverDate': new Date()
								}
							};

							deferred.resolve({
								'params': params,
								'update': update,
								'operation': 'update',
								'collection': 'tblUsers'
							});
						};
					} else {
						deferred.reject({
							code: 401,
							message: 'Account not yet registered!'
						});
					};

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		changepassword: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.header.userId),
				'validated': 1
			};

			var update = {
				$set: {
					'salt': args.password.salt,
					'hash': args.password.hash
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblUsers'
			})
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		changepassword: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.header.userId),
				'validated': 1
			};

			var filter = {
				'salt': 1,
				'hash': 1
			};

			db.call({
				'limit': 1,
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblUsers'
			})
				.then(result => {
					var deferred = Q.defer();

					var encryption = tools.encryption.sha512(args.req.body.old, result[0].salt);
					if (encryption.hash == result[0].hash) {
						var password = tools.encryption.saltHashPassword(args.req.body.new);

						var params = {
							'_id': ObjectId(args.req.body.header.userId)
						};
						var update = {
							$set: {
								'salt': password.salt,
								'hash': password.hash
							}
						};

						deferred.resolve({
							'params': params,
							'update': update,
							'operation': 'update',
							'collection': 'tblUsers'
						});
					} else {
						deferred.reject({
							code: 401,
							message: 'Password is incorrect!'
						});
					};

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalUsers = {
		id: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': format.email(args.req.body.header.email)
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'limit': 1,
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblUsers'
			})
				.then(result => {
					args.result = unlink(result[0]._id);
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.header.userId)
			};

			var filter = {};
			if (Array.isArray(args.req.body.filter) && args.req.body.filter?.length > 0) {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'userId') {
						filter['_id'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblUsers'
			})
				.then(result => {
					args.user = result[0];
					args.result = result[0];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$match: {
						'_id': ObjectId(__settings.client.appId)
					}
				},
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'bitid.auth.private': false
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$project: {
						'_id': 1,
						'role': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblApps'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {};

					if (typeof (args.req.body.name) != 'undefined' && args.req.body.name != null) {
						params.$or = [];
						params.$or.push({
							'name.last': {
								$regex: args.req.body.name,
								$options: 'i'
							}
						});
						params.$or.push({
							'name.first': {
								$regex: args.req.body.name,
								$options: 'i'
							}
						});
					};

					if (typeof (args.req.body.email) != 'undefined' && args.req.body.email != null) {
						if (Array.isArray(args.req.body.email) && args.req.body.email?.length > 0) {
							params.email = {
								$in: format.email(args.req.body.email)
							};
						} else if (typeof (args.req.body.email) == 'string') {
							params.email = args.req.body.email;
						};
					};

					if (typeof (args.req.body.userId) != 'undefined' && args.req.body.userId != null) {
						if (Array.isArray(args.req.body.userId) && args.req.body.userId?.length > 0) {
							params._id = {
								$in: args.req.body.userId.filter(id => typeof (id) != 'undefined' && id != null && id?.length == 24).map(id => ObjectId(id))
							};
						} else if (typeof (args.req.body.userId) == 'string' && args.req.body.userId?.length == 24) {
							params._id = ObjectId(args.req.body.userId);
						};
					};

					if (typeof (args.req.body.validated) != 'undefined') {
						if (Array.isArray(args.req.body.validated) && args.req.body.validated.length > 0) {
							params.validated = {
								$in: args.req.body.validated
							};
						} else if (typeof (args.req.body.validated) == 'boolean') {
							params.validated = args.req.body.validated;
						};
					};

					var filter = {};
					if (result[0].role < 4) {
						filter = {
							'_id': 1,
							'name': 1,
							'email': 1,
							'picture': 1
						};
					} else if (Array.isArray(args.req.body.filter) && args.req.body.filter?.length > 0) {
						filter['_id'] = 0;
						args.req.body.filter.map(f => {
							if (f == 'userId') {
								filter['_id'] = 1;
							} else {
								filter[f] = 1;
							};
						});
					};

					var limit = 10000;
					if (typeof (args.req.body.limit) != 'undefined' || args.req.body.limit != null) {
						limit = args.req.body.limit;
					};

					deferred.resolve({
						'limit': limit,
						'params': params,
						'filter': filter,
						'operation': 'find',
						'collection': 'tblUsers'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.header.userId)
			};

			var update = {
				$set: {
					'serverDate': new Date()
				}
			};
			if (typeof (args.req.body.picture) != 'undefined') {
				update.$set.picture = args.req.body.picture;
			};
			if (typeof (args.req.body.language) != 'undefined') {
				update.$set.language = args.req.body.language;
			};
			if (typeof (args.req.body.timezone) != 'undefined') {
				update.$set.timezone = args.req.body.timezone;
			};
			if (typeof (args.req.body.username) != 'undefined') {
				update.$set.username = args.req.body.username;
			};
			if (typeof (args.req.body.name) != 'undefined') {
				if (typeof (args.req.body.name.last) != 'undefined') {
					update.$set['name.last'] = args.req.body.name.last;
				};
				if (typeof (args.req.body.name.first) != 'undefined') {
					update.$set['name.first'] = args.req.body.name.first;
				};
				if (typeof (args.req.body.name.middle) != 'undefined') {
					update.$set['name.middle'] = args.req.body.name.middle;
				};
			};
			if (typeof (args.req.body.number) != 'undefined') {
				if (typeof (args.req.body.number.tel) != 'undefined') {
					update.$set['number.tel'] = args.req.body.number.tel;
				};
				if (typeof (args.req.body.number.mobile) != 'undefined') {
					update.$set['number.mobile'] = args.req.body.number.mobile;
				};
			};
			if (typeof (args.req.body.address) != 'undefined') {
				if (typeof (args.req.body.address.billing) != 'undefined') {
					if (typeof (args.req.body.address.billing.company) != 'undefined') {
						if (typeof (args.req.body.address.billing.company.vat) != 'undefined') {
							update.$set['address.billing.company.vat'] = args.req.body.address.billing.company.vat;
						};
						if (typeof (args.req.body.address.billing.company.reg) != 'undefined') {
							update.$set['address.billing.company.reg'] = args.req.body.address.billing.company.reg;
						};
					};
					if (typeof (args.req.body.address.billing.street) != 'undefined') {
						update.$set['address.billing.street'] = args.req.body.address.billing.street;
					};
					if (typeof (args.req.body.address.billing.suburb) != 'undefined') {
						update.$set['address.billing.suburb'] = args.req.body.address.billing.suburb;
					};
					if (typeof (args.req.body.address.billing.country) != 'undefined') {
						update.$set['address.billing.country'] = args.req.body.address.billing.country;
					};
					if (typeof (args.req.body.address.billing.cityTown) != 'undefined') {
						update.$set['address.billing.cityTown'] = args.req.body.address.billing.cityTown;
					};
					if (typeof (args.req.body.address.billing.additional) != 'undefined') {
						update.$set['address.billing.additional'] = args.req.body.address.billing.additional;
					};
					if (typeof (args.req.body.address.billing.postalCode) != 'undefined') {
						update.$set['address.billing.postalCode'] = args.req.body.address.billing.postalCode;
					};
				};
				if (typeof (args.req.body.address.physical) != 'undefined') {
					if (typeof (args.req.body.address.physical.company) != 'undefined') {
						if (typeof (args.req.body.address.physical.company.vat) != 'undefined') {
							update.$set['address.physical.company.vat'] = args.req.body.address.physical.company.vat;
						};
						if (typeof (args.req.body.address.physical.company.reg) != 'undefined') {
							update.$set['address.physical.company.reg'] = args.req.body.address.physical.company.reg;
						};
					};
					if (typeof (args.req.body.address.physical.street) != 'undefined') {
						update.$set['address.physical.street'] = args.req.body.address.physical.street;
					};
					if (typeof (args.req.body.address.physical.suburb) != 'undefined') {
						update.$set['address.physical.suburb'] = args.req.body.address.physical.suburb;
					};
					if (typeof (args.req.body.address.physical.country) != 'undefined') {
						update.$set['address.physical.country'] = args.req.body.address.physical.country;
					};
					if (typeof (args.req.body.address.physical.cityTown) != 'undefined') {
						update.$set['address.physical.cityTown'] = args.req.body.address.physical.cityTown;
					};
					if (typeof (args.req.body.address.physical.additional) != 'undefined') {
						update.$set['address.physical.additional'] = args.req.body.address.physical.additional;
					};
					if (typeof (args.req.body.address.physical.postalCode) != 'undefined') {
						update.$set['address.physical.postalCode'] = args.req.body.address.physical.postalCode;
					};
				};
				if (typeof (args.req.body.address.same) != 'undefined') {
					update.$set['address.same'] = args.req.body.address.same;
				};
			};
			if (typeof (args.req.body.identification) != 'undefined') {
				if (typeof (args.req.body.identification.type) != 'undefined') {
					update.$set['identification.type'] = args.req.body.identification.type;
				};
				if (typeof (args.req.body.identification.number) != 'undefined') {
					update.$set['identification.number'] = args.req.body.identification.number;
				};
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblUsers'
			})
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.header.userId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblUsers'
			})
				.then(result => {
					var deferred = Q.defer();

					args.user = result[0];
					var password = tools.encryption.sha512(args.req.body.password, args.user.salt);
					if (password.hash == args.user.hash) {
						deferred.resolve({
							'params': params,
							'operation': 'remove',
							'collection': 'tblUsers'
						});
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 401;
						err.error.errors[0].reason = 'Password is incorrect!';
						err.error.errors[0].message = 'Password is incorrect!';
						deferred.reject(err);
					};

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalConfig = {
		get: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$match: {}
				},
				{
					$project: {
						'_id': 1,
						'icon': 1,
						'name': 1,
						'theme': 1,
						'favicon': 1
					}
				}
			];

			if (typeof (args.req.body.appId) != 'undefined' && args.req.body.appId != null) {
				if (Array.isArray(args.req.body.appId) && args.req.body.appId?.length > 0) {
					params[0].$match._id = {
						$in: args.req.body.appId.filter(id => typeof (id) == 'string' && id?.length == 24).map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.appId) == 'string' && args.req.body.appId?.length == 24) {
					params[0].$match._id = ObjectId(args.req.body.appId);
				};
			};

			if (Object.keys(params).length == 0) {
				if (typeof (args.req.headers.origin) != 'undefined' && args.req.headers.origin != null) {
					params[0].$match.domains = args.req.headers.origin.replace('http://', '').replace('https://', '').split('/')[0];
				};
			};

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblApps'
			})
				.then(result => {
					args.result = unlink(result[0]);
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalScopes = {
		add: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.appId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': {
							$gte: 2
						}
					}
				},
				{
					$project: {
						'_id': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblApps'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'url': args.req.body.url,
						'appId': ObjectId(args.req.body.appId),
						'serverDate': new Date(),
						'description': args.req.body.description
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblScopes'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result[0];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': '$appId'
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: ['$_id', '$$appId']
											}
										]
									}
								}
							},
							{
								$project: {
									'_id': 1,
									'icon': 1,
									'name': 1,
									'bitid': 1
								}
							}
						],
						as: '_base',
						from: 'tblApps'
					}
				},
				{
					$unwind: '$_base'
				},
				{
					$lookup: {
						let: {
							'appId': '$_base.bitid.auth.apps.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': '$_base.bitid.auth.groups.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.scopeId),
								'_base.bitid.private': false
							},
							{
								'_id': ObjectId(args.req.body.scopeId),
								'_base.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.scopeId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.scopeId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							}
						]
					}
				},
				{
					$addFields: {
						'app': {
							'icon': '$_base.icon',
							'name': '$_base.name'
						},
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
														input: '$_base.bitid.auth.apps'
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
																	},
																	then: true,
																	else: false
																}
															}
														},
														as: 'user',
														input: '$_base.bitid.auth.users'
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
														input: '$_base.bitid.auth.groups'
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
			];

			var filter = {};
			if (Array.isArray(args.req.body.filter) && args.req.body.filter?.length > 0) {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'scopeId') {
						filter['_id'] = 1;
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

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblScopes'
			})
				.then(result => {
					args.result = unlink(result[0]);
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$match: {}
				},
				{
					$lookup: {
						let: {
							'appId': '$appId'
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$or: [
											{
												$eq: ['$_id', '$$appId']
											}
										]
									}
								}
							},
							{
								$project: {
									'_id': 1,
									'icon': 1,
									'name': 1,
									'bitid': 1
								}
							}
						],
						as: '_base',
						from: 'tblApps'
					}
				},
				{
					$unwind: '$_base'
				},
				{
					$lookup: {
						let: {
							'appId': '$_base.bitid.auth.apps.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': '$_base.bitid.auth.groups.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_base.bitid.auth.private': false
							},
							{
								'_base.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							}
						]
					}
				},
				{
					$addFields: {
						'app': {
							'icon': '$_base.icon',
							'name': '$_base.name'
						},
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
														input: '$_base.bitid.auth.apps'
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
																	},
																	then: true,
																	else: false
																}
															}
														},
														as: 'user',
														input: '$_base.bitid.auth.users'
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
														input: '$_base.bitid.auth.groups'
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
			];

			if (typeof (args.req.body.appId) != 'undefined' && args.req.body.appId != null) {
				if (Array.isArray(args.req.body.appId) && args.req.body.appId?.length > 0) {
					params[0].$match = {
						'appId': {
							$in: args.req.body.appId.filter(id => typeof (id) == 'string' && id?.length == 24).map(id => ObjectId(id))
						}
					};
				} else if (typeof (args.req.body.appId) == 'string' && args.req.body.appId?.length == 24) {
					params[0].$match = {
						'appId': ObjectId(args.req.body.appId)
					};
				};
			};

			if (typeof (args.req.body.scopeId) != 'undefined' && args.req.body.scopeId != null) {
				if (Array.isArray(args.req.body.scopeId) && args.req.body.scopeId?.length > 0) {
					params[0].$match = {
						'_id': {
							$in: args.req.body.scopeId.filter(id => typeof (id) == 'string' && id?.length == 24).map(id => ObjectId(id))
						}
					};
				} else if (typeof (args.req.body.scopeId) == 'string' && args.req.body.scopeId?.length == 24) {
					params[0].$match = {
						'_id': ObjectId(args.req.body.scopeId)
					};
				};
			};
			if (Object.keys(params[0].$match).length == 0) {
				params.splice(0, 1);
			};

			var filter = {};
			if (Array.isArray(args.req.body.filter) && args.req.body.filter?.length > 0) {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'scopeId') {
						filter['_id'] = 1;
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

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblScopes'
			})
				.then(result => {
					args.result = unlink(result);
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': '$appId'
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: ['$_id', '$$appId']
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
						as: '_base',
						from: 'tblApps'
					}
				},
				{
					$unwind: '$_base'
				},
				{
					$lookup: {
						let: {
							'appId': '$_base.bitid.auth.apps.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': '$_base.bitid.auth.groups.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.scopeId),
								'_base.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.scopeId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.scopeId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
														input: '$_base.bitid.auth.apps'
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
																	},
																	then: true,
																	else: false
																}
															}
														},
														as: 'user',
														input: '$_base.bitid.auth.users'
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
														input: '$_base.bitid.auth.groups'
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
				},
				{
					$match: {
						'role': {
							$gte: 2
						}
					}
				},
				{
					$project: {
						'_id': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblScopes'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.scopeId)
					};
					var update = {
						$set: {
							'serverDate': new Date()
						}
					};

					if (typeof (args.req.body.url) != 'undefined' && args.req.body.url != null) {
						update.$set.url = args.req.body.url;
					};
					if (typeof (args.req.body.description) != 'undefined' && args.req.body.description != null) {
						update.$set.description = args.req.body.description;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblScopes'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': '$appId'
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: ['$_id', '$$appId']
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
						as: '_base',
						from: 'tblApps'
					}
				},
				{
					$unwind: '$_base'
				},
				{
					$lookup: {
						let: {
							'appId': '$_base.bitid.auth.apps.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': '$_base.bitid.auth.groups.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.scopeId),
								'_base.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.scopeId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.scopeId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
														input: '$_base.bitid.auth.apps'
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
																	},
																	then: true,
																	else: false
																}
															}
														},
														as: 'user',
														input: '$_base.bitid.auth.users'
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
														input: '$_base.bitid.auth.groups'
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
				},
				{
					$match: {
						'role': {
							$gte: 2
						}
					}
				},
				{
					$project: {
						'_id': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblScopes'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.scopeId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'remove',
						'collection': 'tblScopes'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalGroups = {
		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid': {
					'auth': {
						'apps': args.req.body.apps?.map(o => {
							return {
								'id': ObjectId(o.id),
								'role': o.role
							};
						}) || [],
						'users': args.req.body.users?.map(o => {
							return {
								'id': ObjectId(o.id),
								'role': o.role
							};
						}) || [],
						'groups': args.req.body.groups?.map(o => {
							return {
								'id': ObjectId(o.id),
								'role': o.role
							};
						}) || [],
						'private': args.req.body.private || true,
						'organizationOnly': args.req.body.organizationOnly || 0
					}
				},
				'appId': [],
				'serverDate': new Date(),
				'description': args.req.body.description
			};

			if (Array.isArray(args.req.body.appId)) {
				params.appId = args.req.body.appId?.filter(id => typeof (id) == 'string' && id?.length == 24).map(id => ObjectId(id))
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblGroups'
			})
				.then(result => {
					args.result = result[0];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.groupId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.groupId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.groupId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
			];

			var filter = {};
			if (Array.isArray(args.req.body.filter) && args.req.body.filter?.length > 0) {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'groupId') {
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

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblGroups'
			})
				.then(result => {
					args.result = unlink(result[0]);
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
			];

			if (typeof (args.req.body.appId) != 'undefined' && args.req.body.appId != null) {
				if (Array.isArray(args.req.body.appId) && args.req.body.appId.length > 0) {
					params[2].$match.$or.map(param => {
						param._id = {
							$in: args.req.body.appId.filter(id => typeof (id) != 'undefined' && id != null && id?.length == 24).map(id => ObjectId(id))
						};
					});
				} else if (typeof (args.req.body.appId) == 'string' && args.req.body.appId?.length == 24) {
					params[2].$match.$or.map(param => {
						param._id = ObjectId(args.req.body.appId);
					});
				};
			};

			if (typeof (args.req.body.private) != 'undefined' && args.req.body.private != null) {
				if (Array.isArray(args.req.body.private) && args.req.body.private.length > 0) {
					params[2].$match.$or.map(param => {
						param['bitid.auth.private'] = {
							$in: args.req.body.private
						};
					});
				} else if (typeof (args.req.body.private) == 'boolean') {
					params[2].$match.$or.map(param => {
						param['bitid.auth.private'] = args.req.body.private;
					});
				};
			};

			if (typeof (args.req.body.description) != 'undefined' && args.req.body.description != null) {
				params[2].$match.$or.map(param => {
					param.description = {
						$regex: args.req.body.description,
						$options: 'i'
					};
				});
			};

			var filter = {};
			if (Array.isArray(args.req.body.filter) && args.req.body.filter?.length > 0) {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'groupId') {
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

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblGroups'
			})
				.then(result => {
					args.result = unlink(result);
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		share: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.groupId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.groupId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.groupId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': {
							$gte: 4
						}
					}
				},
				{
					$project: {
						'_id': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblGroups'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.groupId)
					};

					var update = {
						$set: {
							'serverDate': new Date()
						}
					};

					switch (args.req.body.type) {
						case ('app'):
							params['bitid.auth.apps.id'] = {
								$ne: ObjectId(args.req.body.id)
							};
							update.$push = {
								'bitid.auth.apps': {
									'id': ObjectId(args.req.body.id),
									'role': args.req.body.role
								}
							};
							break;
						case ('user'):
							params['bitid.auth.users.id'] = {
								$ne: ObjectId(args.req.body.id)
							};
							update.$push = {
								'bitid.auth.users': {
									'id': ObjectId(args.req.body.id),
									'role': args.req.body.role
								}
							};
							break;
						case ('group'):
							params['bitid.auth.groups.id'] = {
								$ne: ObjectId(args.req.body.id)
							};
							update.$push = {
								'bitid.auth.groups': {
									'id': ObjectId(args.req.body.id),
									'role': args.req.body.role
								}
							};
							break;
						default:
							deferred.reject({
								code: 503,
								message: 'Could not locate \'type\' in request payload!'
							});
							return;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblGroups'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.groupId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.groupId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.groupId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': {
							$gte: 2
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblGroups'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.groupId)
					};

					var update = {
						$set: {
							'serverDate': new Date()
						}
					};

					if (typeof (args.req.body.private) != 'undefined' && args.req.body.private != null) {
						update.$set['bitid.auth.private'] = args.req.body.private;
					};
					if (Array.isArray(args.req.body.appId)) {
						update.$set.appId = args.req.body.appId.filter(id => typeof (id) == 'string' && id?.length == 24).map(id => ObjectId(id));
					};
					if (typeof (args.req.body.description) != 'undefined' && args.req.body.description != null) {
						update.$set.description = args.req.body.description;
					};
					if (typeof (args.req.body.organizationOnly) != 'undefined' && args.req.body.organizationOnly != null) {
						update.$set['bitid.auth.organizationOnly'] = args.req.body.organizationOnly;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblGroups'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.groupId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.groupId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.groupId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': 5
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblGroups'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.groupId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'remove',
						'collection': 'tblGroups'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.groupId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.groupId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.groupId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$project: {
						'_id': 1,
						'role': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblGroups'
			})
				.then(result => {
					var deferred = Q.defer();

					if (args.req.body.id == args.req.body.header.userId && result[0].role == 5) {
						deferred.reject({
							code: 503,
							message: 'An owner may not be unsubscribed!'
						});
					} else {
						var params = {
							'_id': ObjectId(args.req.body.groupId)
						};

						var update = {
							$set: {
								'serverDate': new Date()
							}
						};

						switch (args.req.body.type) {
							case ('app'):
								update.$pull = {
									'bitid.auth.apps': {
										'id': ObjectId(args.req.body.id)
									}
								};
								break;
							case ('user'):
								update.$pull = {
									'bitid.auth.users': {
										'id': ObjectId(args.req.body.id)
									}
								};
								break;
							case ('group'):
								update.$pull = {
									'bitid.auth.groups': {
										'id': ObjectId(args.req.body.id)
									}
								};
								break;
							default:
								deferred.reject({
									code: 503,
									message: 'Could not locate \'type\' in request payload!'
								});
								return;
						};

						deferred.resolve({
							'params': params,
							'update': update,
							'operation': 'update',
							'collection': 'tblGroups'
						});
					};

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		changeowner: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.groupId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.groupId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.groupId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': {
							$gte: 5
						}
					}
				},
				{
					$project: {
						'_id': 1,
						'role': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblGroups'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.groupId)
					};

					var update = {
						$set: {
							'serverDate': new Date()
						}
					};

					switch (args.req.body.type) {
						case ('app'):
							params['bitid.auth.apps'] = {
								$elemMatch: {
									'id': ObjectId(args.req.body.id)
								}
							};
							update.$set = {
								'bitid.auth.apps.$.role': 5
							};
							break;
						case ('user'):
							params['bitid.auth.users'] = {
								$elemMatch: {
									'id': ObjectId(args.req.body.id)
								}
							};
							update.$set = {
								'bitid.auth.users.$.role': 5
							};
							break;
						case ('group'):
							params['bitid.auth.groups'] = {
								$elemMatch: {
									'id': ObjectId(args.req.body.id)
								}
							};
							update.$set = {
								'bitid.auth.groups.$.role': 5
							};
							break;
						default:
							deferred.reject({
								code: 503,
								message: 'Could not locate \'type\' in request payload!'
							});
							return;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblGroups'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.groupId)
					};

					var update = {
						$set: {
							'serverDate': new Date()
						}
					};

					switch (args.req.body.type) {
						case ('app'):
							params['bitid.auth.apps'] = {
								$elemMatch: {
									'id': ObjectId(args.req.body.header.userId)
								}
							};
							update.$set = {
								'bitid.auth.apps.$.role': 4
							};
							break;
						case ('user'):
							params['bitid.auth.users'] = {
								$elemMatch: {
									'id': ObjectId(args.req.body.header.userId)
								}
							};
							update.$set = {
								'bitid.auth.users.$.role': 4
							};
							break;
						case ('group'):
							params['bitid.auth.groups'] = {
								$elemMatch: {
									'id': ObjectId(args.req.body.header.userId)
								}
							};
							update.$set = {
								'bitid.auth.groups.$.role': 4
							};
							break;
						default:
							deferred.reject({
								code: 503,
								message: 'Could not locate \'type\' in request payload!'
							});
							return;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblGroups'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		updatesubscriber: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.groupId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.groupId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.groupId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': {
							$gte: 4
						}
					}
				},
				{
					$project: {
						'_id': 1,
						'role': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblGroups'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.groupId)
					};

					var update = {
						$set: {
							'serverDate': new Date()
						}
					};

					switch (args.req.body.type) {
						case ('app'):
							params['bitid.auth.apps'] = {
								$elemMatch: {
									'id': ObjectId(args.req.body.id)
								}
							};
							update.$set = {
								'bitid.auth.apps.$.role': args.req.body.role
							};
							break;
						case ('user'):
							params['bitid.auth.users'] = {
								$elemMatch: {
									'id': ObjectId(args.req.body.id)
								}
							};
							update.$set = {
								'bitid.auth.users.$.role': args.req.body.role
							};
							break;
						case ('group'):
							params['bitid.auth.groups'] = {
								$elemMatch: {
									'id': ObjectId(args.req.body.id)
								}
							};
							update.$set = {
								'bitid.auth.groups.$.role': args.req.body.role
							};
							break;
						default:
							deferred.reject({
								code: 503,
								message: 'Could not locate \'type\' in request payload!'
							});
							return;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblGroups'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalTokens = {
		get: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': '$appId'
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: ['$_id', '$$appId']
											}
										]
									}
								}
							},
							{
								$project: {
									'_id': 1,
									'icon': 1,
									'name': 1,
									'bitid': 1
								}
							}
						],
						as: '_base',
						from: 'tblApps'
					}
				},
				{
					$unwind: '$_base'
				},
				{
					$lookup: {
						let: {
							'appId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.apps.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.apps.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.groups.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.groups.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.tokenId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.tokenId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.tokenId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							}
						]
					}
				},
				{
					$addFields: {
						'app': {
							'icon': '$_base.icon',
							'name': '$_base.name'
						},
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
			];

			var filter = {};
			if (Array.isArray(args.req.body.filter) && args.req.body.filter?.length > 0) {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'tokenId') {
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

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblTokens'
			})
				.then(result => {
					args.result = unlink(result[0]);
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': '$appId'
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: ['$_id', '$$appId']
											}
										]
									}
								}
							},
							{
								$project: {
									'_id': 1,
									'icon': 1,
									'name': 1,
									'bitid': 1
								}
							}
						],
						as: '_base',
						from: 'tblApps'
					}
				},
				{
					$unwind: '$_base'
				},
				{
					$lookup: {
						let: {
							'appId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.apps.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.apps.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.groups.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.groups.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							}
						]
					}
				},
				{
					$addFields: {
						'app': {
							'icon': '$_base.icon',
							'name': '$_base.name'
						},
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
			];

			if (typeof (args.req.body.appId) != 'undefined' && args.req.body.appId != null) {
				if (Array.isArray(args.req.body.appId) && args.req.body.appId.length > 0) {
					params[4].$match.$or.map(param => {
						param.appId = {
							$in: args.req.body.appId.filter(id => typeof (id) != 'undefined' && id != null && id?.length == 24).map(id => ObjectId(id))
						};
					});
				} else if (typeof (args.req.body.appId) == 'string' && args.req.body.appId?.length == 24) {
					params[4].$match.$or.map(param => {
						param.appId = ObjectId(args.req.body.appId);
					});
				};
			};

			if (typeof (args.req.body.tokenId) != 'undefined' && args.req.body.tokenId != null) {
				if (Array.isArray(args.req.body.tokenId) && args.req.body.tokenId.length > 0) {
					params[4].$match.$or.map(param => {
						param._id = {
							$in: args.req.body.tokenId.filter(id => typeof (id) != 'undefined' && id != null && id?.length == 24).map(id => ObjectId(id))
						};
					});
				} else if (typeof (args.req.body.tokenId) == 'string' && args.req.body.tokenId?.length == 24) {
					params[4].$match.$or.map(param => {
						param._id = ObjectId(args.req.body.tokenId);
					});
				};
			};

			var filter = {};
			if (Array.isArray(args.req.body.filter) && args.req.body.filter?.length > 0) {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'tokenId') {
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

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblTokens'
			})
				.then(result => {
					args.result = unlink(result);
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		share: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.apps.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.apps.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.groups.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.groups.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.tokenId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.tokenId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.tokenId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': {
							$gte: 4
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblTokens'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.tokenId)
					};

					var update = {
						$set: {
							'serverDate': new Date()
						}
					};

					switch (args.req.body.type) {
						case ('app'):
							params['bitid.auth.apps.id'] = {
								$ne: ObjectId(args.req.body.id)
							};
							update.$push = {
								'bitid.auth.apps': {
									'id': ObjectId(args.req.body.id),
									'role': args.req.body.role
								}
							};
							break;
						case ('user'):
							params['bitid.auth.users.id'] = {
								$ne: ObjectId(args.req.body.id)
							};
							update.$push = {
								'bitid.auth.users': {
									'id': ObjectId(args.req.body.id),
									'role': args.req.body.role
								}
							};
							break;
						case ('group'):
							params['bitid.auth.groups.id'] = {
								$ne: ObjectId(args.req.body.id)
							};
							update.$push = {
								'bitid.auth.groups': {
									'id': ObjectId(args.req.body.id),
									'role': args.req.body.role
								}
							};
							break;
						default:
							deferred.reject({
								code: 503,
								message: 'Could not locate \'type\' in request payload!'
							});
							return;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblTokens'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.apps.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.apps.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.groups.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.groups.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.tokenId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.tokenId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.tokenId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': {
							$gte: 2
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblTokens'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.tokenId)
					};

					var update = {
						$set: {
							'serverDate': new Date()
						}
					};

					if (typeof (args.req.body.disabled) != 'undefined' && args.req.body.disabled != null) {
						update.$set.disabled = args.req.body.disabled;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblTokens'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		revoke: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.apps.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.apps.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.groups.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.groups.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.tokenId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.tokenId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.tokenId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': 5
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblTokens'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.tokenId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'remove',
						'collection': 'tblTokens'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		retrieve: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': '$appId'
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: ['$_id', '$$appId']
											}
										]
									}
								}
							},
							{
								$project: {
									'_id': 1,
									'icon': 1,
									'name': 1,
									'bitid': 1
								}
							}
						],
						as: '_base',
						from: 'tblApps'
					}
				},
				{
					$unwind: '$_base'
				},
				{
					$lookup: {
						let: {
							'appId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.apps.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.apps.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.groups.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.groups.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.tokenId),
								'appId': ObjectId(args.req.body.header.appId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.tokenId),
								'appId': ObjectId(args.req.body.header.appId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.tokenId),
								'appId': ObjectId(args.req.body.header.appId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							}
						]
					}
				},
				{
					$project: {
						'_id': 1,
						'token': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblTokens'
			})
				.then(result => {
					args.result = unlink(result[0]);
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		generate: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.header.userId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblUsers'
			})
				.then(result => {
					var deferred = Q.defer();

					args.user = result[0];

					if (args.user.validated == 1) {
						var params = [
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
															$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
															$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
											'_id': ObjectId(args.req.body.appId),
											'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
										},
										{
											'_id': ObjectId(args.req.body.appId),
											'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
										},
										{
											'_id': ObjectId(args.req.body.appId),
											'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
										},
										{
											'_id': ObjectId(args.req.body.appId),
											'bitid.auth.private': false
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
																					$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
						];

						deferred.resolve({
							'params': params,
							'operation': 'aggregate',
							'collection': 'tblApps'
						});
					} else {
						deferred.reject({
							'code': 503,
							'message': 'Account not validated'
						});
					};

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					var deferred = Q.defer();

					args.app = result[0];

					var params = {
						'bitid': {
							'auth': {
								'apps': [],
								'users': [
									{
										'id': ObjectId(args.req.body.header.userId),
										'role': 5
									}
								],
								'groups': [],
								'private': true,
								'organizationOnly': 0
							}
						},
						'token': {
							'alias': [],
							'bearer': tools.encryption.generateRandomString(64),
							'scopes': args.app.scopes,
							'expiry': new Date(args.req.body.expiry),
							'timeZone': args.user.timeZone || 0,
							'tokenAddOn': {},
							'description': args.req.body.description
						},
						'appId': ObjectId(args.req.body.appId),
						'device': args.req.headers['user-agent'],
						'disabled': false,
						'description': args.req.body.description
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblTokens'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result[0];
					args.result.email = args.user.email;
					args.result.userId = args.user._id;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.apps.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.apps.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.groups.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.groups.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.tokenId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.tokenId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.tokenId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblTokens'
			})
				.then(result => {
					var deferred = Q.defer();

					if (args.req.body.id == args.req.body.header.userId && result[0].role == 5) {
						deferred.reject({
							code: 503,
							message: 'An owner may not be unsubscribed!'
						});
					} else {
						var params = {
							'_id': ObjectId(args.req.body.tokenId)
						};

						var update = {
							$set: {
								'serverDate': new Date()
							}
						};

						switch (args.req.body.type) {
							case ('app'):
								update.$pull = {
									'bitid.auth.apps': {
										'id': ObjectId(args.req.body.id)
									}
								};
								break;
							case ('user'):
								update.$pull = {
									'bitid.auth.users': {
										'id': ObjectId(args.req.body.id)
									}
								};
								break;
							case ('group'):
								update.$pull = {
									'bitid.auth.groups': {
										'id': ObjectId(args.req.body.id)
									}
								};
								break;
							default:
								deferred.reject({
									code: 503,
									message: 'Could not locate \'type\' in request payload!'
								});
								return;
						};

						deferred.resolve({
							'params': params,
							'update': update,
							'operation': 'update',
							'collection': 'tblTokens'
						});
					};

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		updatesubscriber: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.apps.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.apps.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': {
								$cond: {
									'if': {
										'$ne': [
											{
												'$type': '$bitid.auth.groups.id'
											},
											'array'
										]
									},
									'then': [],
									'else': '$bitid.auth.groups.id'
								}
							}
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.tokenId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.tokenId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.tokenId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': {
							$gte: 4
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblTokens'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.tokenId)
					};

					var update = {
						$set: {
							'serverDate': new Date()
						}
					};

					switch (args.req.body.type) {
						case ('app'):
							params['bitid.auth.apps'] = {
								$elemMatch: {
									'id': ObjectId(args.req.body.id)
								}
							};
							update.$set = {
								'bitid.auth.apps.$.role': args.req.body.role
							};
							break;
						case ('user'):
							params['bitid.auth.users'] = {
								$elemMatch: {
									'id': ObjectId(args.req.body.id)
								}
							};
							update.$set = {
								'bitid.auth.users.$.role': args.req.body.role
							};
							break;
						case ('group'):
							params['bitid.auth.groups'] = {
								$elemMatch: {
									'id': ObjectId(args.req.body.id)
								}
							};
							update.$set = {
								'bitid.auth.groups.$.role': args.req.body.role
							};
							break;
						default:
							deferred.reject({
								code: 503,
								message: 'Could not locate \'type\' in request payload!'
							});
							return;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblTokens'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalFeatures = {
		add: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.appId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': {
							$gte: 2
						}
					}
				},
				{
					$project: {
						'_id': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblApps'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'appId': ObjectId(args.req.body.appId),
						'title': args.req.body.title,
						'serverDate': new Date(),
						'description': args.req.body.description
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblFeatures'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result[0];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': '$appId'
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: ['$_id', '$$appId']
											}
										]
									}
								}
							},
							{
								$project: {
									'_id': 1,
									'icon': 1,
									'name': 1,
									'bitid': 1
								}
							}
						],
						as: '_base',
						from: 'tblApps'
					}
				},
				{
					$unwind: '$_base'
				},
				{
					$lookup: {
						let: {
							'appId': '$_base.bitid.auth.apps.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': '$_base.bitid.auth.groups.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.featureId),
								'_base.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.featureId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.featureId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							}
						]
					}
				},
				{
					$addFields: {
						'app': {
							'icon': '$_base.icon',
							'name': '$_base.name'
						},
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
														input: '$_base.bitid.auth.apps'
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
																	},
																	then: true,
																	else: false
																}
															}
														},
														as: 'user',
														input: '$_base.bitid.auth.users'
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
														input: '$_base.bitid.auth.groups'
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
			];

			var filter = {};
			if (Array.isArray(args.req.body.filter) && args.req.body.filter?.length > 0) {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'featureId') {
						filter['_id'] = 1;
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

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblFeatures'
			})
				.then(result => {
					args.result = unlink(result[0]);
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$match: {}
				},
				{
					$lookup: {
						let: {
							'appId': '$appId'
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: ['$_id', '$$appId']
											}
										]
									}
								}
							},
							{
								$project: {
									'_id': 1,
									'icon': 1,
									'name': 1,
									'bitid': 1
								}
							}
						],
						as: '_base',
						from: 'tblApps'
					}
				},
				{
					$unwind: '$_base'
				},
				{
					$lookup: {
						let: {
							'appId': '$_base.bitid.auth.apps.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': '$_base.bitid.auth.groups.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_base.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							}
						]
					}
				},
				{
					$addFields: {
						'app': {
							'icon': '$_base.icon',
							'name': '$_base.name'
						},
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
														input: '$_base.bitid.auth.apps'
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
																	},
																	then: true,
																	else: false
																}
															}
														},
														as: 'user',
														input: '$_base.bitid.auth.users'
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
														input: '$_base.bitid.auth.groups'
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
			];

			if (typeof (args.req.body.appId) != 'undefined' && args.req.body.appId != null) {
				if (Array.isArray(args.req.body.appId) && args.req.body.appId?.length > 0) {
					params[0].$match = {
						'appId': {
							$in: args.req.body.appId.filter(id => typeof (id) == 'string' && id?.length == 24).map(id => ObjectId(id))
						}
					};
				} else if (typeof (args.req.body.appId) == 'string' && args.req.body.appId?.length == 24) {
					params[0].$match = {
						'appId': ObjectId(args.req.body.appId)
					};
				};
			};

			if (typeof (args.req.body.featureId) != 'undefined' && args.req.body.featureId != null) {
				if (Array.isArray(args.req.body.featureId) && args.req.body.featureId?.length > 0) {
					params[0].$match = {
						'_id': {
							$in: args.req.body.featureId.filter(id => typeof (id) == 'string' && id?.length == 24).map(id => ObjectId(id))
						}
					};
				} else if (typeof (args.req.body.featureId) == 'string' && args.req.body.featureId?.length == 24) {
					params[0].$match = {
						'_id': ObjectId(args.req.body.featureId)
					};
				};
			};
			if (Object.keys(params[0].$match).length == 0) {
				params.splice(0, 1);
			};

			var filter = {};
			if (Array.isArray(args.req.body.filter) && args.req.body.filter?.length > 0) {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'featureId') {
						filter['_id'] = 1;
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

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblFeatures'
			})
				.then(result => {
					args.result = unlink(result);
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': '$appId'
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: ['$_id', '$$appId']
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
						as: '_base',
						from: 'tblApps'
					}
				},
				{
					$unwind: '$_base'
				},
				{
					$lookup: {
						let: {
							'appId': '$_base.bitid.auth.apps.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': '$_base.bitid.auth.groups.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.featureId),
								'_base.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.featureId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.featureId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
														input: '$_base.bitid.auth.apps'
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
																	},
																	then: true,
																	else: false
																}
															}
														},
														as: 'user',
														input: '$_base.bitid.auth.users'
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
														input: '$_base.bitid.auth.groups'
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
				},
				{
					$match: {
						'role': {
							$gte: 2
						}
					}
				},
				{
					$project: {
						'_id': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblFeatures'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.featureId)
					};

					var update = {
						$set: {
							'serverDate': new Date()
						}
					};

					if (typeof (args.req.body.title) != 'undefined' && args.req.body.title != null) {
						update.$set.title = args.req.body.title;
					};
					if (typeof (args.req.body.description) != 'undefined' && args.req.body.description != null) {
						update.$set.description = args.req.body.description;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblFeatures'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': '$appId'
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: ['$_id', '$$appId']
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
						as: '_base',
						from: 'tblApps'
					}
				},
				{
					$unwind: '$_base'
				},
				{
					$lookup: {
						let: {
							'appId': '$_base.bitid.auth.apps.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': '$_base.bitid.auth.groups.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.featureId),
								'_base.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.featureId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.featureId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
														input: '$_base.bitid.auth.apps'
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
																	},
																	then: true,
																	else: false
																}
															}
														},
														as: 'user',
														input: '$_base.bitid.auth.users'
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
														input: '$_base.bitid.auth.groups'
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
				},
				{
					$match: {
						'role': {
							$gte: 2
						}
					}
				},
				{
					$project: {
						'_id': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblFeatures'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.featureId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'remove',
						'collection': 'tblFeatures'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalStatistics = {
		write: (args) => {
			var deferred = Q.defer();

			var params = {
				'scope': args.req.body.scope,
				'appId': ObjectId(args.req.body.header.appId),
				'userId': ObjectId(args.req.body.header.userId),
				'serverDate': new Date()
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblUsage'
			})
				.then(result => {
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		usage: (args) => {
			var deferred = Q.defer();

			var params = {};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblUsage'
			})
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalTipsAndUpdates = {
		add: (args) => {
			var deferred = Q.defer();

			var params = [
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.appId),
								'bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.appId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
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
				},
				{
					$match: {
						'role': {
							$gte: 2
						}
					}
				},
				{
					$project: {
						'_id': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblApps'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'data': args.req.body.data,
						'appId': ObjectId(args.req.body.appId),
						'title': args.req.body.title,
						'subtitle': args.req.body.subtitle,
						'serverDate': new Date()
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblTipsAndUpdates'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result[0];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': '$appId'
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: ['$_id', '$$appId']
											}
										]
									}
								}
							},
							{
								$project: {
									'_id': 1,
									'icon': 1,
									'name': 1,
									'bitid': 1
								}
							}
						],
						as: '_base',
						from: 'tblApps'
					}
				},
				{
					$unwind: '$_base'
				},
				{
					$lookup: {
						let: {
							'appId': '$_base.bitid.auth.apps.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': '$_base.bitid.auth.groups.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.itemId),
								'_base.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.itemId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.itemId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							}
						]
					}
				},
				{
					$addFields: {
						'app': {
							'icon': '$_base.icon',
							'name': '$_base.name'
						},
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
														input: '$_base.bitid.auth.apps'
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
																	},
																	then: true,
																	else: false
																}
															}
														},
														as: 'user',
														input: '$_base.bitid.auth.users'
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
														input: '$_base.bitid.auth.groups'
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
			];

			var filter = {};
			if (Array.isArray(args.req.body.filter) && args.req.body.filter?.length > 0) {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'itemId') {
						filter['_id'] = 1;
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

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblTipsAndUpdates'
			})
				.then(result => {
					args.result = unlink(result[0]);
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$match: {}
				},
				{
					$lookup: {
						let: {
							'appId': '$appId'
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: ['$_id', '$$appId']
											}
										]
									}
								}
							},
							{
								$project: {
									'_id': 1,
									'icon': 1,
									'name': 1,
									'bitid': 1
								}
							}
						],
						as: '_base',
						from: 'tblApps'
					}
				},
				{
					$unwind: '$_base'
				},
				{
					$lookup: {
						let: {
							'appId': '$_base.bitid.auth.apps.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': '$_base.bitid.auth.groups.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_base.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							}
						]
					}
				},
				{
					$addFields: {
						'app': {
							'icon': '$_base.icon',
							'name': '$_base.name'
						},
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
														input: '$_base.bitid.auth.apps'
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
																	},
																	then: true,
																	else: false
																}
															}
														},
														as: 'user',
														input: '$_base.bitid.auth.users'
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
														input: '$_base.bitid.auth.groups'
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
			];

			if (typeof (args.req.body.appId) != 'undefined' && args.req.body.appId != null) {
				if (Array.isArray(args.req.body.appId) && args.req.body.appId?.length > 0) {
					params[0].$match = {
						'appId': {
							$in: args.req.body.appId.filter(id => typeof (id) == 'string' && id?.length == 24).map(id => ObjectId(id))
						}
					};
				} else if (typeof (args.req.body.appId) == 'string' && args.req.body.appId?.length == 24) {
					params[0].$match = {
						'appId': ObjectId(args.req.body.appId)
					};
				};
			};

			if (typeof (args.req.body.itemId) != 'undefined' && args.req.body.itemId != null) {
				if (Array.isArray(args.req.body.itemId) && args.req.body.itemId?.length > 0) {
					params[0].$match = {
						'_id': {
							$in: args.req.body.itemId.filter(id => typeof (id) == 'string' && id?.length == 24).map(id => ObjectId(id))
						}
					};
				} else if (typeof (args.req.body.itemId) == 'string' && args.req.body.itemId?.length == 24) {
					params[0].$match = {
						'_id': ObjectId(args.req.body.itemId)
					};
				};
			};
			if (Object.keys(params[0].$match).length == 0) {
				params.splice(0, 1);
			};

			var filter = {};
			if (Array.isArray(args.req.body.filter) && args.req.body.filter?.length > 0) {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'itemId') {
						filter['_id'] = 1;
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

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblTipsAndUpdates'
			})
				.then(result => {
					args.result = unlink(result);
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': '$appId'
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: ['$_id', '$$appId']
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
						as: '_base',
						from: 'tblApps'
					}
				},
				{
					$unwind: '$_base'
				},
				{
					$lookup: {
						let: {
							'appId': '$_base.bitid.auth.apps.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': '$_base.bitid.auth.groups.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.itemId),
								'_base.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.itemId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.itemId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
														input: '$_base.bitid.auth.apps'
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
																	},
																	then: true,
																	else: false
																}
															}
														},
														as: 'user',
														input: '$_base.bitid.auth.users'
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
														input: '$_base.bitid.auth.groups'
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
				},
				{
					$match: {
						'role': {
							$gte: 2
						}
					}
				},
				{
					$project: {
						'_id': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblTipsAndUpdates'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.itemId)
					};

					var update = {
						$set: {
							'serverDate': new Date()
						}
					};

					if (typeof (args.req.body.data) != 'undefined' && args.req.body.data != null) {
						update.$set.data = args.req.body.data;
					};
					if (typeof (args.req.body.title) != 'undefined' && args.req.body.title != null) {
						update.$set.title = args.req.body.title;
					};
					if (typeof (args.req.body.subtitle) != 'undefined' && args.req.body.subtitle != null) {
						update.$set.subtitle = args.req.body.subtitle;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblTipsAndUpdates'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						let: {
							'appId': '$appId'
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [
											{
												$eq: ['$_id', '$$appId']
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
						as: '_base',
						from: 'tblApps'
					}
				},
				{
					$unwind: '$_base'
				},
				{
					$lookup: {
						let: {
							'appId': '$_base.bitid.auth.apps.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
							'groupId': '$_base.bitid.auth.groups.id'
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
												$in: [ObjectId(args.req.body.header.userId), '$bitid.auth.users.id']
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
								'_id': ObjectId(args.req.body.itemId),
								'_base.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.itemId),
								'_apps.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
							},
							{
								'_id': ObjectId(args.req.body.itemId),
								'_groups.bitid.auth.users.id': ObjectId(args.req.body.header.userId)
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
														input: '$_base.bitid.auth.apps'
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
																		$eq: ['$$user.id', ObjectId(args.req.body.header.userId)]
																	},
																	then: true,
																	else: false
																}
															}
														},
														as: 'user',
														input: '$_base.bitid.auth.users'
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
														input: '$_base.bitid.auth.groups'
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
				},
				{
					$match: {
						'role': {
							$gte: 2
						}
					}
				},
				{
					$project: {
						'_id': 1
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblTipsAndUpdates'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.itemId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'remove',
						'collection': 'tblTipsAndUpdates'
					});

					return deferred.promise;
				})
				.then(db.call)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	return {
		'apps': dalApps,
		'auth': dalAuth,
		'users': dalUsers,
		'config': dalConfig,
		'scopes': dalScopes,
		'groups': dalGroups,
		'tokens': dalTokens,
		'features': dalFeatures,
		'statistics': dalStatistics,
		'tipsAndUpdates': dalTipsAndUpdates
	};
};

exports.module = module;