const Q = require('q');
const _ = require('lodash');
const db = require('../db/sql');
const sql = require('mssql');
const tools = require('../lib/tools');
const unwind = require('../lib/unwind');
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
				'_id': args.req.body.appId
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
				'_id': args.req.body.appId
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
				if (Array.isArray(args.req.body.appId) && args.req.body.appId.length > 0) {
					params._id = {
						$in: args.req.body.appId
					};
				} else if (typeof (args.req.body.appId) == 'string' && args.req.body.appId.length == 24) {
					params._id = args.req.body.appId;
				};
			};

			if (typeof (args.req.body.private) != 'undefined') {
				if (Array.isArray(args.req.body.private) && args.req.body.private.length > 0) {
					params.private = {
						$in: args.req.body.private
					};
				} else if (typeof (args.req.body.private) == 'boolean') {
					params.private = args.req.body.private;
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
				'_id': args.req.body.appId
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
				'_id': args.req.body.appId
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
				'_id': args.req.body.appId
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

			var AppsValidate = require('../classes/apps.validate');
			var params = new AppsValidate(args.req.body).wined();

			const request = new sql.Request(__database);
			Object.keys(params).map(key => request.input(key, params[key]));

			request.execute('v1_tblApps_Validate', (error, result) => {
				var err = new ErrorResponse();
				if (error) {
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				} else if (result.recordset.length == 0) {
					err.error.errors[0].code = 69;
					err.error.errors[0].reason = 'no records found';
					err.error.errors[0].message = 'no records found';
					deferred.reject(err);
				} else {
					args.app = unwind(result.recordset[0]);
					deferred.resolve(args);
				}
			})

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
									'_id': args.req.body.appId
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
						'appId': args.req.body.appId,
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
					if (error instanceof ErrorResponse) {
						deferred.reject(error);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 401;
						err.error.errors[0].reason = error.message;
						err.error.errors[0].message = error.message;
						deferred.reject(err);
					};
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
				'_id': args.req.body.appId
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
				'_id': args.req.body.appId
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
						'_id': args.req.body.appId
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
				'appId': args.req.body.header.appId,
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
						if (typeof (scope) == 'object' && typeof (scope) !== null) {
							scopes.push(scope.url);
						} else if (typeof (scope) == 'string' && typeof (scope) !== null) {
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
						if (typeof (scope) == 'object' && typeof (scope) !== null) {
							scopes.push(scope.url);
						} else if (typeof (scope) == 'string' && typeof (scope) !== null) {
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
						'_id': args.req.body.header.appId
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

			var AuthVerify = require('../classes/auth.verify');
			var params = new AuthVerify(args.req.body).wined();

			const request = new sql.Request(__database);
			Object.keys(params).map(key => request.input(key, params[key]));

			request.execute('v1_tblUsers_Verify', (error, result) => {
				var err = new ErrorResponse();
				if (error) {
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				} else if (result.recordset.length == 0) {
					err.error.errors[0].code = 69;
					err.error.errors[0].reason = 'no records found';
					err.error.errors[0].message = 'no records found';
					deferred.reject(err);
				} else {
					args.result = unwind(result.recordset[0]);
					if (args.result.updated == 0) {
						var err = new ErrorResponse();
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'Could not verify account, invalid code/email!';
						err.error.errors[0].message = 'Could not verify account, invalid code/email!';
						deferred.reject(err);
					} else {
						deferred.resolve(args);
					}
				}
			})

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
				'appId': args.req.body.header.appId,
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
							if (typeof (scope) == 'object') {
								scopes.push(scope.url);
							} else if (typeof (scope) == 'string') {
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
							'_id': args.req.body.header.appId
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

			var AuthRegister = require('../classes/auth.register');
			var params = new AuthRegister(args.req.body).wined();

			const request = new sql.Request(__database);
			Object.keys(params).map(key => request.input(key, params[key]));

			request.execute('v1_tblUsers_Add', (error, result) => {
				var err = new ErrorResponse();
				if (error) {
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				} else if (result.recordset.length == 0) {
					err.error.errors[0].code = 69;
					err.error.errors[0].reason = 'no records found';
					err.error.errors[0].message = 'no records found';
					deferred.reject(err);
				} else {
					args.user = result.recordset[0];
					args.user._id = args.user.userId;
					args.user.name = {
						last: args.user.nameLast,
						first: args.user.nameFirst
					};
					delete args.user.nameLast;
					delete args.user.nameFirst;
					args.result = args.user;
					deferred.resolve(args);
				}
			})

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
						'_id': args.req.body.header.appId
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
							'appId': args.req.body.header.appId,
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
						'appId': args.req.body.header.appId,
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

			/*
				-- get user
				-- check password match
				-- check user validated
				-- check app validated
				-- check allowed to log in to app
				-- generate token
			*/

			// var AuthVerify = require('../classes/auth.verify');
			// var params = new AuthVerify(args.req.body).wined();

			// const request = new sql.Request(__database);
			// Object.keys(params).map(key => request.input(key, params[key]));

			// request.execute('v1_tblUsers_Verify', (error, result) => {});

			var err = new ErrorResponse();
			const transaction = new sql.Transaction(__database);

			transaction.on('commit', result => {
				deferred.resolve(args);
			});

			transaction.on('rollback', aborted => {
				deferred.reject(err);
			});

			transaction.begin()
				.then(res => {
					return new sql.Request(transaction)
						.input('email', args.req.body.header.email)
						.execute('v1_tblUsers_Get');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.recordset.length > 0) {
						args.user = unwind(result.recordset[0]);
						var password = tools.encryption.sha512(args.req.body.password, args.user.salt);

						if (password.hash == args.user.hash) {
							if (args.user.validated == 1) {
								deferred.resolve(args);
							} else {
								err.error.errors[0].code = 401;
								err.error.errors[0].reason = 'Account verification is required!';
								err.error.errors[0].message = 'Account verification is required!';
								deferred.reject(err);
							};
						} else {
							err.error.errors[0].code = 401;
							err.error.errors[0].reason = 'Password is incorrect!';
							err.error.errors[0].message = 'Password is incorrect!';
							deferred.reject(err);
						};
					} else {
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'Account not yet registered!';
						err.error.errors[0].message = 'Account not yet registered!';
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => {
					return new sql.Request(transaction)
						.input('appId', args.req.body.header.appId)
						.input('userId', args.user.id)
						.execute('v1_tblApps_Get');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.recordset.length > 0) {
						args.app = unwind(result.recordset[0]);
						args.app.bitid = { auth: {} };
						deferred.resolve(args);
					} else {
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'Application not found!';
						err.error.errors[0].message = 'Application not found!';
						deferred.reject(err);
					};

					return deferred.promise;
				})
				.then(res => {
					return new sql.Request(transaction)
						.input('appId', args.req.body.header.appId)
						.input('userId', args.user.id)
						.execute('v1_tblAppsUsers_Get');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (args.app.private) {
						if (result.recordset.length == 0) {
							err.error.errors[0].code = 401;
							err.error.errors[0].reason = 'Application is private!';
							err.error.errors[0].message = 'Application is private!';
							deferred.reject(err);
						} else {
							deferred.resolve(args);
						};
					} else {
						deferred.resolve(args);
					};

					return deferred.promise;
				})
				.then(res => {
					return new sql.Request(transaction)
						.input('appId', args.req.body.header.appId)
						.input('userId', args.user.userId)
						.input('device', args.req.headers['user-agent'])
						.input('expiry', args.req.body.expiry)
						.input('description', args.req.body.description || args.app.name)
						.execute('v1_Tokens_Add');
				}, null)
				.then(res => {
					transaction.commit();
				}, err => {
					transaction.rollback();
				})

			// 	.then(result => {
			// 		var deferred = Q.defer();

			// 		var params = {
			// 			'bitid': {
			// 				'auth': {
			// 					'users': [{
			// 						'role': 5,
			// 						'email': args.req.body.header.email
			// 					}]
			// 				}
			// 			},
			// 			'token': {
			// 				'bearer': tools.encryption.generateRandomString(64),
			// 				'scopes': [{ 'url': '*', 'role': 4 }],
			// 				'expiry': args.req.body.expiry,
			// 				'timeZone': args.user.timeZone || 0,
			// 				'tokenAddOn': args.req.body.tokenAddOn,
			// 				'description': args.req.body.description || args.app.name
			// 			},
			// 			'appId': args.req.body.header.appId,
			// 			'device': args.req.headers['user-agent'],
			// 			'description': args.req.body.description || args.app.name
			// 		};

			// 		deferred.resolve({
			// 			'params': params,
			// 			'operation': 'insert',
			// 			'collection': 'tblTokens'
			// 		});

			// 		return deferred.promise;
			// 	}, null)
			// 	.then(db.call, null)
			// 	.then(result => {
			// 		args.result = result[0];
			// 		deferred.resolve(args);
			// 	}, err => {
			// 		deferred.reject(err);
			// 	});

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

			var UsersGet = require('../classes/users.get');
			var params = new UsersGet(args.req.body).wined();

			const request = new sql.Request(__database);
			Object.keys(params).map(key => request.input(key, params[key]));

			request.execute('v1_tblUsers_Get', (error, result) => {
				var err = new ErrorResponse();
				if (error) {
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				} else if (result.recordset.length == 0) {
					err.error.errors[0].code = 69;
					err.error.errors[0].reason = 'no records found';
					err.error.errors[0].message = 'no records found';
					deferred.reject(err);
				} else {
					args.user = unwind(result.recordset[0]);
					args.user._id = args.user.id;
					args.result = args.user;
					deferred.resolve(args);
				}
			})

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
				'_id': __settings.client.appId
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

			const request = new sql.Request(__database);
			request.input('url', args.req.body.url);
			request.input('appId', args.req.body.appId);
			request.input('userId', args.req.body.header.userId);
			request.input('description', args.req.body.description);

			request.execute('v1_Scopes_Add')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 70;
						err.error.errors[0].reason = 'no records inserted';
						err.error.errors[0].message = 'no records inserted';
						deferred.reject(err);
					}
				})
				.catch(error => {
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

			const request = new sql.Request(__database);
			request.input('userId', args.req.body.header.userId);
			request.input('scopeId', args.req.body.scopeId);

			request.execute('v1_Scopes_Get')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 70;
						err.error.errors[0].reason = 'no records found';
						err.error.errors[0].message = 'no records found';
						deferred.reject(err);
					}
				})
				.catch(error => {
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

			const request = new sql.Request(__database);
			request.input('userId', args.req.body.header.userId);

			request.execute('v1_Scopes_List')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = result.recordset.map(o => unwind(o));
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'no records found';
						err.error.errors[0].message = 'no records found';
						deferred.reject(err);
					}
				})
				.catch(error => {
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

			const request = new sql.Request(__database);
			request.input('userId', args.req.body.header.userId);

			request.execute('v1_Scopes_Load')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = result.recordset.map(o => unwind(o));
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'no records found';
						err.error.errors[0].message = 'no records found';
						deferred.reject(err);
					}
				})
				.catch(error => {
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

			const request = new sql.Request(__database);
			request.input('url', args.req.body.url);
			request.input('appId', args.req.body.appId);
			request.input('userId', args.req.body.header.userId);
			request.input('scopeId', args.req.body.scopeId);
			request.input('description', args.req.body.description);

			request.execute('v1_Scopes_Update')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 70;
						err.error.errors[0].reason = 'no records updated';
						err.error.errors[0].message = 'no records updated';
						deferred.reject(err);
					}
				})
				.catch(error => {
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

			const request = new sql.Request(__database);
			request.input('userId', args.req.body.header.userId);
			request.input('scopeId', args.req.body.scopeId);

			request.execute('v1_Scopes_Delete')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 70;
						err.error.errors[0].reason = 'no records updated';
						err.error.errors[0].message = 'no records updated';
						deferred.reject(err);
					}
				})
				.catch(error => {
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

			const request = new sql.Request(__database);
			request.input('userId', args.req.body.header.userId);
			request.input('tokenId', args.req.body.tokenId);

			request.execute('v1_Tokens_Get')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						result = result.recordset.map(o => unwind(o));

						args.result = {
							bitid: {
								auth: {
									users: _.uniqBy(result.map(o => ({ role: o.role, userId: o.userId })), 'userId')
								}
							},
							_id: result[0]._id,
							app: result[0].app,
							scopes: _.uniqBy(result, 'scopeId').map(o => o.scopeId),
							device: result[0].device,
							expiry: result[0].expiry,
							description: result[0].description,
						};
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'no records found';
						err.error.errors[0].message = 'no records found';
						deferred.reject(err);
					}
				})
				.catch(error => {
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

			const request = new sql.Request(__database);
			request.input('userId', args.req.body.header.userId);

			request.execute('v1_Tokens_List')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						result = _.mapValues(_.groupBy(result.recordset.map(o => unwind(o)), '_id'), o => o.map(i => _.omit(i, '_id')));

						args.result = [];
						Object.keys(result).map(tokenId => {
							var tmp = {
								bitid: {
									auth: {
										users: _.uniqBy(result[tokenId].map(o => ({ role: o.role, userId: o.userId })), 'userId')
									}
								},
								_id: tokenId,
								app: result[tokenId][0].app,
								scopes: _.uniqBy(result[tokenId], 'scopeId').map(o => o.scopeId),
								device: result[tokenId][0].device,
								expiry: result[tokenId][0].expiry,
								description: result[tokenId][0].description,
							};
							args.result.push(tmp);
						})

						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'no records found';
						err.error.errors[0].message = 'no records found';
						deferred.reject(err);
					}
				})
				.catch(error => {
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

			const request = new sql.Request(__database);
			request.input('role', args.req.body.role);
			request.input('userId', args.req.body.userId);
			request.input('adminId', args.req.body.header.userId);
			request.input('tokenId', args.req.body.tokenId);

			request.execute('v1_Tokens_Share')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 503;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					}
				})
				.catch(error => {
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

			const request = new sql.Request(__database);
			request.input('userId', args.req.body.header.userId);
			request.input('tokenId', args.req.body.tokenId);

			request.execute('v1_Tokens_Revoke')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 503;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					}
				})
				.catch(error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		download: (args) => {
			var deferred = Q.defer();

			const request = new sql.Request(__database);
			request.input('userId', args.req.body.header.userId);
			request.input('tokenId', args.req.body.tokenId);

			request.execute('v1_Tokens_Download')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						result = result.recordset.map(o => unwind(o));

						args.result = {
							token: {
								scopes: _.uniqBy(result, 'scopeId').map(o => o.scopeId),
								device: result[0].device,
								expiry: result[0].expiry,
								bearer: result[0].bearer,
								timezone: result[0].timezone,
								description: result[0].description,
							}
						};
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'no records found';
						err.error.errors[0].message = 'no records found';
						deferred.reject(err);
					}
				})
				.catch(error => {
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

			const request = new sql.Request(__database);
			request.input('appId', args.req.body.appId);
			request.input('userId', args.req.body.header.userId);
			request.input('tokenId', args.req.body.tokenId);

			request.execute('v1_Tokens_Retrieve')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						result = result.recordset.map(o => unwind(o));

						args.result = {
							token: {
								scopes: _.uniqBy(result, 'scopeId').map(o => o.scopeId),
								device: result[0].device,
								expiry: result[0].expiry,
								bearer: result[0].bearer,
								timezone: result[0].timezone,
								description: result[0].description,
							},
							_id: result[0]._id
						};
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'no records found';
						err.error.errors[0].message = 'no records found';
						deferred.reject(err);
					}
				})
				.catch(error => {
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

			var err = new ErrorResponse();
			const transaction = new sql.Transaction(__database);

			transaction.on('commit', result => {
				deferred.resolve(args);
			});

			transaction.on('rollback', aborted => {
				deferred.reject(err);
			});

			args.req.body.bearer = tools.encryption.generateRandomString(64);
			args.result = {
				token: {
					scopes: [],
					bearer: args.req.body.bearer,
					expiry: args.req.body.expiry,
					timezone: args.req.body.timezone,
					description: args.req.body.description
				}
			};

			transaction.begin()
				.then(res => {
					return new sql.Request(transaction)
						.input('userId', args.req.body.header.userId)
						.execute('v1_tblUsers_Get');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.user = unwind(result.recordset[0]);
						if (args.user.validated == 1) {
							deferred.resolve(args);
						} else {
							err.error.errors[0].code = 401;
							err.error.errors[0].reason = 'Account verification is required!';
							err.error.errors[0].message = 'Account verification is required!';
							deferred.reject(err);
						};
					} else {
						err.error.errors[0].code = 503;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => {
					return new sql.Request(transaction)
						.input('appId', args.req.body.appId)
						.execute('v1_tblApps_Validate');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						result = result.recordset.map(o => unwind(o));
						args.app = {
							bitid: {
								auth: {
									users: _.uniqBy(result.map(o => ({ role: o.role, userId: o.userId })), 'userId')
								}
							},
							_id: result[0]._id,
							app: result[0].app,
							scopes: _.uniqBy(result, 'scopeId').map(o => o.scopeId),
							domains: _.uniqBy(result, 'domain').map(o => o.domain)
						};
						args.result.token.scopes = args.app.scopes;
						deferred.resolve(args);
					} else {
						err.error.errors[0].code = 503;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => {
					return new sql.Request(transaction)
						.input('appId', args.req.body.appId)
						.input('userId', args.req.body.header.userId)
						.input('bearer', tools.encryption.generateRandomString(64))
						.input('device', args.req.headers['user-agent'])
						.input('expiry', args.req.body.expiry)
						.input('timezone', args.user.timezone)
						.input('description', args.req.body.description)
						.execute('v1_tblTokens_Add');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.tokenId = unwind(result.recordset[0])._id;
						args.result._id = args.tokenId;
						deferred.resolve(args);
					} else {
						err.error.errors[0].code = 503;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => {
					return new sql.Request(transaction)
						.input('role', 5)
						.input('userId', args.req.body.header.userId)
						.input('tokenId', args.tokenId)
						.execute('v1_tblTokensUsers_Add');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						deferred.resolve(args);
					} else {
						err.error.errors[0].code = 503;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => {
					return args.app.scopes.reduce((promise, scopeId) => promise.then(() => new sql.Request(transaction)
						.input('userId', args.req.body.header.userId)
						.input('scopeId', scopeId)
						.input('tokenId', args.tokenId)
						.execute('v1_tblTokensScopes_Add')
					), Promise.resolve())
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						deferred.resolve(args);
					} else {
						err.error.errors[0].code = 503;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => {
					transaction.commit();
				})
				.catch(err => {
					transaction.rollback();
				})

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			const request = new sql.Request(__database);
			request.input('userId', args.req.body.userId);
			request.input('adminId', args.req.body.header.userId);
			request.input('tokenId', args.req.body.tokenId);

			request.execute('v1_Tokens_Unsubscribe')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 503;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					}
				})
				.catch(error => {
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

			const request = new sql.Request(__database);
			request.input('role', args.req.body.role);
			request.input('userId', args.req.body.userId);
			request.input('adminId', args.req.body.header.userId);
			request.input('tokenId', args.req.body.tokenId);

			request.execute('v1_Tokens_Update_Subscriber')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 503;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					}
				})
				.catch(error => {
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
				'_id': args.req.body.appId
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblApps'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'appId': args.req.body.appId,
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
				'_id': args.req.body.featureId
			};

			if (typeof (args.req.body.appId) != 'undefined' && args.req.body.appId !== null) {
				if (Array.isArray(args.req.body.appId) && args.req.body.appId.length > 0) {
					match.appId = {
						$in: args.req.body.appId
					};
				} else if (typeof (args.req.body.appId) == 'string' && args.req.body.appId.length == 24) {
					match.appId = args.req.body.appId;
				};
			};

			var filter = {
				'_id': 1,
				'app': 1,
				'bitid': 1,
				'appId': 1,
				'title': 1,
				'description': 1
			};
			if (Array.isArray(args.req.body.filter) && args.req.body.filter.length) {
				filter = {};
				args.req.body.filter.map(key => {
					if (key == 'role') {
						filter['bitid'] = 1;
					} else if (key == 'featureId') {
						filter['_id'] = 1;
					} else {
						filter[key] = 1;
					};
				})
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
				if (Array.isArray(args.req.body.appId) && args.req.body.appId.length > 0) {
					match.appId = {
						$in: args.req.body.appId
					};
				} else if (typeof (args.req.body.appId) == 'string' && args.req.body.appId.length == 24) {
					match.appId = args.req.body.appId;
				};
			};

			if (typeof (args.req.body.featureId) != 'undefined' && args.req.body.featureId !== null) {
				if (Array.isArray(args.req.body.featureId) && args.req.body.featureId.length > 0) {
					match._id = {
						$in: args.req.body.featureId
					};
				} else if (typeof (args.req.body.featureId) == 'string' && args.req.body.featureId.length == 24) {
					match._id = args.req.body.featureId;
				};
			};

			var filter = {
				'_id': 1,
				'app': 1,
				'bitid': 1,
				'appId': 1,
				'title': 1,
				'description': 1
			};
			if (Array.isArray(args.req.body.filter) && args.req.body.filter.length) {
				filter = {};
				args.req.body.filter.map(key => {
					if (key == 'role') {
						filter['bitid'] = 1;
					} else if (key == 'featureId') {
						filter['_id'] = 1;
					} else {
						filter[key] = 1;
					};
				})
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
				'_id': args.req.body.appId
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblApps'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': args.req.body.featureId
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
				'_id': args.req.body.featureId
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
						'_id': args.req.body.featureId
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
				'appId': args.req.body.header.appId,
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