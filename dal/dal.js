const Q = require('q');
const db = require('../db/mongo');
const tools = require('../lib/tools');
const ObjectId = require('mongodb').ObjectId;
const ErrorResponse = require('../lib/error-response');

var module = function () {
	var dalApps = {
		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid': {
					'auth': {
						'users': args.req.body.users,
						'organizationOnly': args.req.body.organizationOnly || 0
					}
				},
				'url': args.req.body.url,
				'icon': args.req.body.icon,
				'name': args.req.body.name,
				'theme': args.req.body.theme || {},
				'scopes': args.req.body.scopes || [],
				'secret': args.req.body.secret,
				'domains': args.req.body.domains || [],
				'private': args.req.body.private || false,
				'serverDate': new Date()
			};

			if (typeof (args.req.body.google) != 'undefined') {
				params.google = {};
				if (typeof (args.req.body.google.database) != 'undefined') {
					params.google.database = args.req.body.google.database;
				};
				if (typeof (args.req.body.google.credentials) == 'object') {
					params.google.credentials = args.req.body.google.credentials;
				};
			} else {
				params.google = {
					'database': '',
					'credentials': {}
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

			var params = {
				'_id': ObjectId(args.req.body.appId)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'appId') {
						filter['_id'] = 1;
					} else if (f == 'role' || f == 'users') {
						filter['bitid.auth.users'] = 1;
					} else if (f == 'organizationOnly') {
						filter['bitid.auth.organizationOnly'] = 1;
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

		load: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.appId)
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

			var params = {
				'bitid.auth.users.email': args.req.body.header.email
			};

			if (typeof (args.req.body.appId) != 'undefined') {
				if (Array.isArray(args.req.body.appId)) {
					params._id = {
						$in: args.req.body.appId.map(id => ObjectId(id))
					};
				} else {
					params._id = ObjectId(args.req.body.appId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'appId') {
						filter['_id'] = 1;
					} else if (f == 'role' || f == 'users') {
						filter['bitid.auth.users'] = 1;
					} else if (f == 'organizationOnly') {
						filter['bitid.auth.organizationOnly'] = 1;
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

		share: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': args.req.body.header.email
					}
				},
				'bitid.auth.users.email': {
					$ne: args.req.body.email
				},
				'_id': ObjectId(args.req.body.appId)
			};

			var update = {
				$set: {
					'serverDate': new Date()
				},
				$push: {
					'bitid.auth.users': {
						'role': args.req.body.role,
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblApps'
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

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.appId)
			};

			var update = {
				$set: {
					'serverDate': new Date()
				}
			};
			if (typeof (args.req.body.google) != 'undefined') {
				if (typeof (args.req.body.google.database) != 'undefined') {
					update.$set['google.database'] = args.req.body.google.database;
				};
				if (typeof (args.req.body.google.credentials) == 'object') {
					update.$set['google.credentials'] = args.req.body.google.credentials;
				};
			};
			if (typeof (args.req.body.url) != 'undefined') {
				update.$set.url = args.req.body.url;
			};
			if (typeof (args.req.body.name) != 'undefined') {
				update.$set.name = args.req.body.name;
			};
			if (typeof (args.req.body.icon) != 'undefined') {
				update.$set.icon = args.req.body.icon;
			};
			if (typeof (args.req.body.theme) != 'undefined') {
				update.$set.theme = args.req.body.theme;
			};
			if (typeof (args.req.body.secret) != 'undefined') {
				update.$set.secret = args.req.body.secret;
			};
			if (typeof (args.req.body.scopes) != 'undefined') {
				update.$set.scopes = args.req.body.scopes;
			};
			if (typeof (args.req.body.domains) != 'undefined') {
				update.$set.domains = args.req.body.domains;
			};
			if (typeof (args.req.body.private) != 'undefined') {
				update.$set.private = args.req.body.private;
			};
			if (typeof (args.req.body.organizationOnly) != 'undefined' && args.req.body.organizationOnly !== null) {
				update.$set['bitid.auth.organizationOnly'] = args.req.body.organizationOnly;
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblApps'
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
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.appId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblApps'
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
						'appId': '$_id'
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
				'email': args.req.body.header.email,
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
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					args.app = result[0];

					var params = {
						'bitid': {
							'auth': {
								'users': [{
									'role': 5,
									'email': args.req.body.header.email
								}]
							}
						},
						'token': {
							'alias': [],
							'bearer': tools.encryption.generateRandomString(64),
							'scopes': args.app.scopes,
							'expiry': args.req.body.expiry,
							'timeZone': args.user.timeZone || 0,
							'tokenAddOn': {},
							'description': args.req.body.description
						},
						'appId': ObjectId(args.req.body.appId),
						'device': args.req.headers['user-agent'],
						'description': args.req.body.description
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblTokens'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
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

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.appId)
			};

			var update = {
				$set: {
					'serverDate': new Date()
				},
				$pull: {
					'bitid.auth.users': {
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblApps'
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

		updatesubscriber: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.appId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblApps'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'bitid.auth.users': {
							$elemMatch: {
								'email': args.req.body.email
							}
						},
						'_id': ObjectId(args.req.body.appId)
					};

					var update = {
						$set: {
							'bitid.auth.users.$.role': args.req.body.role
						}
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblApps'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
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

			var params = {
				'token': token,
				'appId': ObjectId(args.req.body.header.appId),
				'bitid.auth.users.email': args.req.body.header.email
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
						if (typeof(scope) == 'object' && typeof(scope) !== null) {
							scopes.push(scope.url);
						} else if (typeof(scope) == 'string' && typeof(scope) !== null) {
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
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					var scopes = [];
					token.scopes.map(scope => {
						if (typeof(scope) == 'object' && typeof(scope) !== null) {
							scopes.push(scope.url);
						} else if (typeof(scope) == 'string' && typeof(scope) !== null) {
							scopes.push(scope);
						};
					});
				
					var valid = false;
					var found = false;
					result.map(row => {
						if (row.url == args.req.originalUrl || row.url == args.req.body.reqURI || row.url == '*') {
							found = true;
							scopes.map(scope => {
								if (row.roles.includes(scope.role)) {
									valid = true;
								};
							});
						};
					});

					if (!found) {
						var err = new ErrorResponse();
						err.error.errors[0].code = 401;
						err.error.errors[0].reason = 'Scope not allowed: ' + args.req.reqURI;
						err.error.errors[0].message = 'Scope not allowed: ' + args.req.reqURI;
						deferred.reject(err);
					} else if (!valid) {
						var err = new ErrorResponse();
						err.error.errors[0].code = 401;
						err.error.errors[0].reason = 'Scope role not allowed: ' + args.req.reqURI;
						err.error.errors[0].message = 'Scope role not allowed: ' + args.req.reqURI;
						deferred.reject(err);
					} else {
						deferred.resolve(args);
					};
				}, null)
				.then(result => {
					var deferred = Q.defer();

					var now = new Date();
					var expiry = new Date(token.expiry);

					if (expiry < now) {
						var err = new ErrorResponse();
						err.error.errors[0].code = 401;
						err.error.errors[0].reason = 'Token Expired';
						err.error.errors[0].message = 'Token Expired';
						deferred.reject(err);
					} else {
						deferred.resolve(args);
					};

					return deferred.promise;
				}, null)
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
				}, null)
				.then(db.call, null)
				.then(result => {
					deferred.resolve([{
						'email': args.req.body.header.email,
						'appId': args.req.body.header.appId
					}]);
				}, err => {
					deferred.reject(err);
				});

			return deferred.promise;
		},

		verify: (args) => {
			var deferred = Q.defer();

			if (typeof (args.req.body.code) != 'undefined') {
				args.req.body.code = parseInt(args.req.body.code);
			};

			var params = {
				'email': args.req.body.header.email
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
						var user = result[0];

						if (user.validated == 1) {
							var err = new ErrorResponse();
							err.error.errors[0].code = 409;
							err.error.errors[0].reason = 'User is already verified';
							err.error.errors[0].message = 'User is already verified';
							deferred.reject(err);
						} else {
							var params = {
								'code': args.req.body.code,
								'email': args.req.body.header.email,
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
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.length > 0) {
						var params = {
							'email': args.req.body.header.email
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
				}, null)
				.then(db.call, null)
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

			if (typeof (args.req.headers.authorization) == 'undefined') {
				var err = new ErrorResponse();
				err.error.code = 401;
				err.error.errors[0].coded = 401;
				err.error.errors[0].reason = 'token not found';
				err.error.errors[0].message = 'token not found';
				deferred.reject(err);
				return false;
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
					return false;
				};
			};

			var params = {
				'token': args.req.headers.authorization,
				'appId': ObjectId(args.req.body.header.appId),
				'bitid.auth.users.email': args.req.body.header.email
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblTokens',
				'allowNoRecordsFound': true
			})
				.then(result => {
					var deferred = Q.defer();

					if (result.length > 0) {
						var scopes = [];
						args.req.headers.authorization.scopes.map(scope => {
							if (typeof(scope) == 'object') {
								scopes.push(scope.url);
							} else if (typeof(scope) == 'string') {
								scopes.push(scope);
							};
						});

						if (scopes.includes('*') || scopes.includes(args.req.body.scope)) {
							var params = {
								'url': args.req.body.scope
							};

							deferred.resolve({
								'params': params,
								'operation': 'find',
								'collection': 'tblScopes',
								'allowNoRecordsFound': true
							});
						} else {
							var err = new ErrorResponse();
							err.error.code = 401;
							err.error.errors[0].code = 401;
							err.error.errors[0].reason = 'Scope not present in token!';
							err.error.errors[0].message = 'Scope not present in token!';
							deferred.reject(err);
						};
					} else {
						var err = new ErrorResponse();
						err.error.code = 401;
						err.error.errors[0].code = 401;
						err.error.errors[0].reason = 'Token was not found!';
						err.error.errors[0].message = 'Token was not found!';
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.length > 0) {
						var params = {
							'_id': ObjectId(args.req.body.header.appId)
						};

						deferred.resolve({
							'params': params,
							'operation': 'find',
							'collection': 'tblApps',
							'allowNoRecordsFound': true
						});
					} else {
						var err = new ErrorResponse();
						err.error.code = 401;
						err.error.errors[0].code = 401;
						err.error.errors[0].reason = 'Scope was not found!';
						err.error.errors[0].message = 'Scope was not found!';
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.length > 0) {
						var expiry = new Date(args.req.headers.authorization.expiry);
						var current = new Date();

						if (expiry < current) {
							var err = new ErrorResponse();
							err.error.code = 401;
							err.error.errors[0].code = 401;
							err.error.errors[0].reason = 'This token has expired!';
							err.error.errors[0].message = 'This token has expired!';
							deferred.reject(err);
						} else {
							deferred.resolve(true);
						};
					} else {
						var err = new ErrorResponse();
						err.error.code = 401;
						err.error.errors[0].code = 401;
						err.error.errors[0].reason = 'App not found!';
						err.error.errors[0].message = 'App not found!';
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(result => dalStatistics.write(args), null)
				.then(result => {
					deferred.resolve(result);
				}, err => {
					deferred.reject(err);
				});

			return deferred.promise;
		},

		register: (args) => {
			var deferred = Q.defer();

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
				'email': args.req.body.header.email,
				'picture': '',
				'language': '',
				'timezone': 0,
				'username': '',
				'validated': 0,
				'serverDate': new Date()
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

			db.call({
				'params': params,
				'operation': 'insert',
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

		changeemail: (args) => {
			var deferred = Q.defer();

			if (typeof (args.req.body.email) == 'undefined') {
				var err = new ErrorResponse();
				err.error.errors[0].code = 503;
				err.error.errors[0].reason = 'A replacement email is required!';
				err.error.errors[0].message = 'A replacement email is required!';
				deferred.reject(err);
				return false;
			};

			var params = {
				'email': args.req.body.header.email
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
							'email': args.req.body.email
						};

						deferred.resolve({
							'params': params,
							'operation': 'find',
							'collection': 'tblUsers',
							'allowNoRecordsFound': true
						});
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'Account not yet registered!';
						err.error.errors[0].message = 'Account not yet registered!';
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.length == 0) {
						var params = {
							'email': args.req.body.header.email
						};

						var update = {
							$set: {
								'email': args.req.body.email
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
						err.error.errors[0].code = 71;
						err.error.errors[0].reason = 'An account with email address of ' + args.req.body.email + ' already exists!';
						err.error.errors[0].message = 'An account with email address of ' + args.req.body.email + ' already exists!';
						deferred.reject(err);
					};

					return deferred.promise;
				})
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					args.result = result;

					var params = {
						'bitid.auth.users': {
							$elemMatch: {
								'email': args.req.body.header.email
							}
						}
					};

					var update = {
						$set: {
							'bitid.auth.users.$.email': args.req.body.email
						}
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'updateMany',
						'collection': 'tblTokens'
					});

					return deferred.promise;
				})
				.then(db.call, null)
				.then(result => {
					deferred.resolve(args);
				}, err => {
					deferred.reject(err);
				});

			return deferred.promise;
		},

		allowaccess: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': args.req.body.header.email
			};

			if (typeof (args.req.body.expiry) == 'undefined') {
				args.req.body.expiry = Date.now() + 31 * 24 * 60 * 60 * 1000;
			};

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
				}, null)
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
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.length > 0) {
						args.app = result[0];

						var params = {
							'device': args.req.headers['user-agent'],
							'appId': ObjectId(args.req.body.header.appId),
							'description': args.req.body.description || args.app.name,
							'bitid.auth.users.email': args.req.body.header.email
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
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					if (!Array.isArray(args.req.body.scopes) || typeof (args.req.body.scopes) == 'undefined' || args.req.body.scopes.length == 0) {
						args.req.body.scopes = ['*'];
					};

					var params = {
						'bitid': {
							'auth': {
								'users': [{
									'role': 5,
									'email': args.req.body.header.email
								}]
							}
						},
						'token': {
							'bearer': tools.encryption.generateRandomString(64),
							'scopes': args.req.body.scopes,
							'expiry': args.req.body.expiry,
							'timeZone': args.user.timeZone || 0,
							'tokenAddOn': args.req.body.tokenAddOn,
							'description': args.req.body.description || args.app.name
						},
						'device': args.req.headers['user-agent'],
						'appId': ObjectId(args.req.body.header.appId),
						'description': args.req.body.description || args.app.name
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblTokens'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
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
				'email': args.req.body.header.email
			};

			if (typeof (args.req.body.expiry) == 'undefined') {
				args.req.body.expiry = Date.now() + 31 * 24 * 60 * 60 * 1000;
			};

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
				}, null)
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
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.length > 0) {
						args.app = result[0];

						var valid = true;

						const users = args.app.bitid.auth.users.map(user => user.email);
						if (args.app.private && !users.includes(args.req.body.header.email)) {
							valid = false;
						};

						if (valid) {
							var params = {
								'appId': ObjectId(args.req.body.header.appId),
								'device': args.req.headers['user-agent'],
								'description': args.req.body.description || args.app.name,
								'bitid.auth.users.email': args.req.body.header.email
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
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'bitid': {
							'auth': {
								'users': [{
									'role': 5,
									'email': args.req.body.header.email
								}]
							}
						},
						'token': {
							'bearer': tools.encryption.generateRandomString(64),
							'scopes': [{ 'url': '*', 'role': 4 }],
							'expiry': args.req.body.expiry,
							'timeZone': args.user.timeZone || 0,
							'tokenAddOn': args.req.body.tokenAddOn,
							'description': args.req.body.description || args.app.name
						},
						'appId': ObjectId(args.req.body.header.appId),
						'device': args.req.headers['user-agent'],
						'description': args.req.body.description || args.app.name
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblTokens'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = result[0];
					deferred.resolve(args);
				}, err => {
					deferred.reject(err);
				});

			return deferred.promise;
		},

		changepassword: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': args.req.body.header.email,
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
		}
	};

	var dalUsers = {
		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': args.req.body.header.email
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
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

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(__settings.client.appId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblApps'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {};

					if (typeof (args.req.body.email) != 'undefined' && args.req.body.email !== null) {
						if (Array.isArray(args.req.body.email) != 'undefined' && args.req.body.email.length > 0) {
							params.email = {
								$in: args.req.body.email
							};
						} else if (typeof (args.req.body.email) != 'string') {
							params.email = args.req.body.email;
						};
					};

					var filter = {};
					if (typeof (args.req.body.filter) != 'undefined') {
						filter['_id'] = 0;
						args.req.body.filter.map(f => {
							if (f == 'userId') {
								filter['_id'] = 1;
							} else {
								filter[f] = 1;
							};
						});
					};

					deferred.resolve({
						'params': params,
						'filter': filter,
						'operation': 'find',
						'collection': 'tblUsers'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
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
				'email': args.req.body.header.email
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
				'email': args.req.body.header.email
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
				}, null)
				.then(db.call, null)
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

	var dalScopes = {
		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.appId),
				'bitid.auth.users.email': args.req.body.header.email
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblApps'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'url': args.req.body.url,
						'appId': ObjectId(args.req.body.appId),
						'roles': args.req.body.roles,
						'serverDate': new Date(),
						'description': args.req.body.description
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblScopes'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
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

			var filter = {
				'url': 1,
				'_id': 1,
				'app': 1,
				'appId': 1,
				'roles': 1,
				'bitid': '$app.bitid',
				'description': 1
			};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter['_id'] = 0;
				filter['bitid'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'scopeId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid'] = '$app.bitid';
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$match: {
						'_id': ObjectId(args.req.body.scopeId)
					}
				},
				{
					$lookup: {
						'as': 'app',
						'from': 'tblApps',
						'localField': 'appId',
						'foreignField': '_id'
					}
				},
				{
					$unwind: '$app'
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblScopes'
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

			var filter = {
				'url': 1,
				'_id': 1,
				'app': 1,
				'appId': 1,
				'roles': 1,
				'bitid': '$app.bitid',
				'description': 1
			};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter['_id'] = 0;
				// filter['bitid'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'scopeId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid'] = '$app.bitid';
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						'as': 'app',
						'from': 'tblApps',
						'localField': 'appId',
						'foreignField': '_id'
					}
				},
				{
					$unwind: '$app'
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblScopes'
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

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.scopeId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblScopes'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': {
							$in: [
								result[0].appId,
								ObjectId(args.req.body.appId)
							]
						},
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': args.req.body.header.email
							}
						}
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
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					result = result.map(app => app._id.toString());

					var params = {
						'_id': ObjectId(args.req.body.scopeId)
					};
					var update = {
						$set: {
							'serverDate': new Date()
						}
					};
					if (typeof (args.req.body.url) != 'undefined') {
						update.$set.url = args.req.body.url;
					};
					if (typeof (args.req.body.roles) != 'undefined') {
						update.$set.roles = args.req.body.roles;
					};
					if (typeof (args.req.body.appId) != 'undefined') {
						if (result.includes(args.req.body.appId)) {
							update.$set.appId = args.req.body.appId;
						};
					};
					if (typeof (args.req.body.description) != 'undefined') {
						update.$set.description = args.req.body.description;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblScopes'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
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
				'_id': ObjectId(args.req.body.scopeId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblScopes'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': args.req.body.header.email
							}
						},
						'_id': result[0].appId
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
				}, null)
				.then(db.call, null)
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
				}, null)
				.then(db.call, null)
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
						'as': 'app',
						'from': 'tblApps',
						'localField': 'appId',
						'foreignField': '_id'
					}
				},
				{
					$match: {
						'_id': ObjectId(args.req.body.tokenId),
						'bitid.auth.users.email': args.req.body.header.email
					}
				},
				{
					$unwind: '$app'
				},
				{
					$project: {}
				}
			];

			if (typeof (args.req.body.filter) != 'undefined') {
				params[3].$project['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'tokenId') {
						params[3].$project['_id'] = 1;
					} else if (f == 'app') {
						params[3].$project.app = {
							'icon': '$app.icon',
							'name': '$app.name',
							'appId': '$app._id'
						};
					} else if (f == 'role' || f == 'users') {
						params[3].$project.bitid = 1;
					} else if (f == 'scopes') {
						params[3].$project.scopes = '$token.scopes';
					} else if (f == 'expiry') {
						params[3].$project.expiry = '$token.expiry';
					} else if (f == 'description') {
						params[3].$project.description = '$token.description';
					} else {
						params[3].$project[f] = 1;
					};
				});
			};
			if (Object.keys(params[3].$project).length == 0) {
				params[3].$project.app = {
					'icon': '$app.icon',
					'name': '$app.name',
					'appId': '$app._id'
				};
				params[3].$project._id = 1;
				params[3].$project.appId = 1;
				params[3].$project.bitid = 1;
				params[3].$project.device = 1;
				params[3].$project.scopes = '$token.scopes';
				params[3].$project.expiry = '$token.expiry';
				params[3].$project.description = '$token.description';
			};

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblTokens'
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
						'as': 'app',
						'from': 'tblApps',
						'localField': 'appId',
						'foreignField': '_id'
					}
				},
				{
					$match: {
						'bitid.auth.users.email': args.req.body.header.email
					}
				},
				{
					$unwind: '$app'
				},
				{
					$project: {}
				}
			];

			if (typeof (args.req.body.filter) != 'undefined') {
				params[3].$project['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'tokenId') {
						params[3].$project['_id'] = 1;
					} else if (f == 'app') {
						params[3].$project.app = {
							'icon': '$app.icon',
							'name': '$app.name',
							'appId': '$app._id'
						};
					} else if (f == 'role' || f == 'users') {
						params[3].$project.bitid = 1;
					} else if (f == 'scopes') {
						params[3].$project.scopes = '$token.scopes';
					} else if (f == 'expiry') {
						params[3].$project.expiry = '$token.expiry';
					} else if (f == 'description') {
						params[3].$project.description = '$token.description';
					} else {
						params[3].$project[f] = 1;
					};
				});
			};
			if (Object.keys(params[3].$project).length == 0) {
				params[3].$project.app = {
					'icon': '$app.icon',
					'name': '$app.name',
					'appId': '$app._id'
				};
				params[3].$project._id = 1;
				params[3].$project.bitid = 1;
				params[3].$project.device = 1;
				params[3].$project.scopes = '$token.scopes';
				params[3].$project.expiry = '$token.expiry';
				params[3].$project.description = '$token.description';
			};

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblTokens'
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

		share: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users.email': {
					$ne: args.req.body.email
				},
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.tokenId)
			};

			var update = {
				$set: {
					'serverDate': new Date()
				},
				$push: {
					'bitid.auth.users': {
						'role': args.req.body.role,
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblTokens'
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

		revoke: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 5
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.tokenId),
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblTokens'
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

		retrieve: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.tokenId),
				'appId': ObjectId(args.req.body.header.appId),
				'bitid.auth.users.email': args.req.body.header.email
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblTokens'
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

		generate: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': args.req.body.header.email,
				'validated': 1
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblUsers'
			})
				.then(result => {
					var deferred = Q.defer();

					args.user = result[0];

					var params = {
						'_id': ObjectId(args.req.body.appId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'find',
						'collection': 'tblApps'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					args.app = result[0];

					var params = {
						'bitid': {
							'auth': {
								'users': [{
									'role': 5,
									'email': args.req.body.header.email
								}]
							}
						},
						'token': {
							'alias': [],
							'bearer': tools.encryption.generateRandomString(64),
							'scopes': args.app.scopes,
							'expiry': args.req.body.expiry,
							'timeZone': args.user.timeZone || 0,
							'tokenAddOn': {},
							'description': args.req.body.description
						},
						'appId': ObjectId(args.req.body.appId),
						'device': args.req.headers['user-agent'],
						'description': args.req.body.description
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblTokens'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
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

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.tokenId)
			};

			var update = {
				$set: {
					'serverDate': new Date()
				},
				$pull: {
					'bitid.auth.users': {
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblTokens'
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

		updatesubscriber: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.tokenId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblTokens'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'bitid.auth.users': {
							$elemMatch: {
								'email': args.req.body.email
							}
						},
						'_id': ObjectId(args.req.body.tokenId)
					};

					var update = {
						$set: {
							'bitid.auth.users.$.role': args.req.body.role
						}
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblTokens'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
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

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.appId)
			};

			db.call({
				'params': params,
				'operation': 'find',
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
				}, null)
				.then(db.call, null)
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

			var match = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.featureId)
			};

			if (typeof (args.req.body.appId) != 'undefined' && args.req.body.appId !== null) {
				if (Array.isArray(args.req.body.appId) && args.req.body.appId.length < 0) {
					match.appId = {
						$in: args.req.body.appId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.appId) == 'string' && args.req.body.appId.length == 24) {
					match.appId = ObjectId(args.req.body.appId);
				};
			};

			var filter = {
				'_id': 1,
				'app': 1,
				'appId': 1,
				'title': 1,
				'description': 1,
				'bitid.auth.users': 1
			};

			var params = [
				{
					$lookup: {
						'as': 'app',
						'from': 'tblApps',
						'localField': 'appId',
						'foreignField': '_id'
					}
				},
				{
					$unwind: '$app'
				},
				{
					$project: {
						'_id': 1,
						'appId': 1,
						'title': 1,
						'bitid': '$app.bitid',
						'app.icon': 1,
						'app.name': 1,
						'serverDate': 1,
						'description': 1
					}
				},
				{
					$match: match
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblFeatures'
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

			var match = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2
						},
						'email': args.req.body.header.email
					}
				}
			};

			if (typeof (args.req.body.appId) != 'undefined' && args.req.body.appId !== null) {
				if (Array.isArray(args.req.body.appId) && args.req.body.appId.length < 0) {
					match.appId = {
						$in: args.req.body.appId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.appId) == 'string' && args.req.body.appId.length == 24) {
					match.appId = ObjectId(args.req.body.appId);
				};
			};

			if (typeof (args.req.body.featureId) != 'undefined' && args.req.body.featureId !== null) {
				if (Array.isArray(args.req.body.featureId) && args.req.body.featureId.length > 0) {
					match._id = {
						$in: args.req.body.featureId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.featureId) == 'string' && args.req.body.featureId.length == 24) {
					match._id = ObjectId(args.req.body.featureId);
				};
			};

			var filter = {
				'_id': 1,
				'app': 1,
				'appId': 1,
				'title': 1,
				'description': 1,
				'bitid.auth.users': 1
			};

			var params = [
				{
					$lookup: {
						'as': 'app',
						'from': 'tblApps',
						'localField': 'appId',
						'foreignField': '_id'
					}
				},
				{
					$unwind: '$app'
				},
				{
					$project: {
						'_id': 1,
						'appId': 1,
						'title': 1,
						'bitid': '$app.bitid',
						'app.icon': 1,
						'app.name': 1,
						'serverDate': 1,
						'description': 1
					}
				},
				{
					$match: match
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblFeatures'
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

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.appId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblApps'
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

					if (typeof (args.req.body.title) != 'undefined' && args.req.body.title !== null) {
						update.$set.title = args.req.body.title;
					};
					if (typeof (args.req.body.description) != 'undefined' && args.req.body.description !== null) {
						update.$set.description = args.req.body.description;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblFeatures'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
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

			var match = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2
						},
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.featureId)
			};

			var params = [
				{
					$lookup: {
						'as': 'app',
						'from': 'tblApps',
						'localField': 'appId',
						'foreignField': '_id'
					}
				},
				{
					$unwind: '$app'
				},
				{
					$project: {
						'_id': 1,
						'appId': 1,
						'title': 1,
						'bitid': '$app.bitid',
						'app.icon': 1,
						'app.name': 1,
						'serverDate': 1,
						'description': 1
					}
				},
				{
					$match: match
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
				}, null)
				.then(db.call, null)
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
				'email': args.req.body.header.email,
				'scope': args.req.body.scope,
				'appId': ObjectId(args.req.body.header.appId),
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

	return {
		'apps': dalApps,
		'auth': dalAuth,
		'users': dalUsers,
		'scopes': dalScopes,
		'tokens': dalTokens,
		'features': dalFeatures,
		'statistics': dalStatistics
	};
};

exports.module = module;