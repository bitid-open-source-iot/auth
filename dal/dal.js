const Q = require('q');
const _ = require('lodash');
const sql = require('mssql');
const tools = require('../lib/tools');
const unwind = require('../lib/unwind');
const project = require('../lib/project');
const ErrorResponse = require('../lib/error-response');

var module = function () {
	var dalApps = {
		add: (args) => {
			var deferred = Q.defer();

			var err = new ErrorResponse();
			const transaction = new sql.Transaction(__database);

			transaction.on('commit', result => {
				deferred.resolve(args);
			});

			transaction.on('rollback', aborted => {
				deferred.reject(err);
			});

			args.req.body.private = args.req.body.private ? 1 : 0;
			if (typeof (args.req.body.google.credentials) == 'object' && args.req.body.google.credentials != null) {
				args.req.body.google.credentials = JSON.stringify(args.req.body.google.credentials);
			};

			transaction.begin()
				.then(res => {
					return new sql.Request(transaction)
						.input('url', args.req.body.url)
						.input('icon', args.req.body.icon)
						.input('name', args.req.body.name)
						.input('secret', args.req.body.secret)
						.input('userId', args.req.body.header.userId)
						.input('expiry', args.req.body.expiry)
						.input('private', args.req.body.private)
						.input('themeColor', args.req.body.theme.color)
						.input('googleDatabase', args.req.body.google.database)
						.input('themeBackground', args.req.body.theme.background)
						.input('organizationOnly', args.req.body.organizationOnly)
						.input('googleCredentials', args.req.body.google.credentials)
						.execute('v1_Apps_Add');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						err.error.errors[0].code = result.recordset[0].code;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => {
					return args.req.body.users.reduce((promise, user) => promise.then(() => new sql.Request(transaction)
						.input('role', user.role)
						.input('appId', args.result._id)
						.input('userId', user.userId)
						.execute('v1_Apps_Add_User')
					), Promise.resolve())
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						deferred.resolve(args);
					} else {
						err.error.errors[0].code = result.recordset[0].code;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => {
					return args.req.body.scopes.reduce((promise, scopeId) => promise.then(() => new sql.Request(transaction)
						.input('appId', args.result._id)
						.input('userId', args.req.body.header.userId)
						.input('scopeId', scopeId)
						.execute('v1_Apps_Add_Scope')
					), Promise.resolve())
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						deferred.resolve(args);
					} else {
						err.error.errors[0].code = result.recordset[0].code;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => {
					return args.req.body.domains.reduce((promise, url) => promise.then(() => new sql.Request(transaction)
						.input('url', url)
						.input('appId', args.result._id)
						.input('userId', args.req.body.header.userId)
						.execute('v1_Apps_Add_Domain')
					), Promise.resolve())
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						deferred.resolve(args);
					} else {
						err.error.errors[0].code = result.recordset[0].code;
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

		get: (args) => {
			var deferred = Q.defer();

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

			const request = new sql.Request(__database);

			request.input('appId', args.req.body.appId);
			request.input('userId', args.req.body.header.userId);

			request.execute('v1_Apps_Get')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						result = result.recordset.map(o => unwind(o));
						args.result = {
							bitid: {
								auth: {
									users: _.uniqBy(result.map(o => ({ role: o.role, email: o.email, status: o.status, userId: o.userId })), 'userId'),
									organizationOnly: result[0].organization.only
								}
							},
							scopes: _.uniqBy(result, 'scopeId').map(o => o.scopeId),
							domains: _.uniqBy(result, 'domain').map(o => o.domain),
							_id: result[0]._id,
							url: result[0].url,
							icon: result[0].icon,
							name: result[0].name,
							theme: result[0].theme,
							expiry: result[0].expiry,
							google: result[0].google,
							secret: result[0].secret,
							private: new Boolean(result[0].private)
						};
						try {
							args.result.google.credentials = JSON.parse(args.result.google.credentials);
						} catch (error) {
							args.result.google.credentials = {};
						};
						args.result = project(args.result, filter);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = result.recordset[0].code;
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

		load: (args) => {
			var deferred = Q.defer();

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

			const request = new sql.Request(__database);

			request.input('appId', args.req.body.appId);

			request.execute('v1_Apps_Load')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						result = result.recordset.map(o => unwind(o));
						args.result = {
							_id: result[0]._id,
							url: result[0].url,
							icon: result[0].icon,
							name: result[0].name,
							theme: result[0].theme,
							scopes: _.uniqBy(result, 'scopeId').map(o => o.scopeId),
							domains: _.uniqBy(result, 'domain').map(o => o.domain),
							private: new Boolean(result[0].private)
						};
						args.result = project(args.result, filter);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = result.recordset[0].code;
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

		list: (args) => {
			var deferred = Q.defer();

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

			const request = new sql.Request(__database);

			request.input('userId', args.req.body.header.userId);

			request.execute('v1_Apps_List')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = _.chain(result.recordset.map(o => unwind(o))).groupBy('_id').map((apps, key) => {
							try {
								apps[0].google.credentials = JSON.parse(apps[0].google.credentials);
							} catch (error) {
								apps[0].google.credentials = {};
							};
							return {
								bitid: {
									auth: {
										users: _.uniqBy(apps.map(o => ({ role: o.role, email: o.email, status: o.status, userId: o.userId })), 'userId'),
										organizationOnly: apps[0].organization.only
									}
								},
								scopes: _.uniqBy(apps, 'scopeId').map(o => o.scopeId),
								domains: _.uniqBy(apps, 'domain').map(o => o.domain),
								_id: apps[0]._id,
								url: apps[0].url,
								icon: apps[0].icon,
								name: apps[0].name,
								theme: apps[0].theme,
								google: apps[0].google,
								expiry: apps[0].expiry,
								secret: apps[0].secret,
								private: new Boolean(apps[0].private)
							}
						}).value();
						args.result = args.result.map(o => project(o, filter));
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = result.recordset[0].code;
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

		share: (args) => {
			var deferred = Q.defer();

			const request = new sql.Request(__database);

			request.input('role', args.req.body.role);
			request.input('appId', args.req.body.appId);
			request.input('email', args.req.body.email);
			request.input('adminId', args.req.body.header.userId);

			request.execute('v1_Apps_Share')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = result.recordset[0].code;
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

		update: (args) => {
			var deferred = Q.defer();

			if (typeof (args.req.body.url) == 'undefined' || args.req.body.url == null) {
				args.req.body.url = null
			}
			if (typeof (args.req.body.icon) == 'undefined' || args.req.body.icon == null) {
				args.req.body.icon = null
			}
			if (typeof (args.req.body.name) == 'undefined' || args.req.body.name == null) {
				args.req.body.name = null
			}
			if (typeof (args.req.body.theme) == 'undefined' || args.req.body.theme == null) {
				args.req.body.theme = {}
				if (typeof (args.req.body.theme.color) == 'undefined' || args.req.body.theme.color == null) {
					args.req.body.theme.color = null
				}
				if (typeof (args.req.body.theme.background) == 'undefined' || args.req.body.theme.background == null) {
					args.req.body.theme.background = null
				}
			}
			if (typeof (args.req.body.expiry) == 'undefined' || args.req.body.expiry == null) {
				args.req.body.expiry = null
			}
			if (typeof (args.req.body.secret) == 'undefined' || args.req.body.secret == null) {
				args.req.body.secret = null
			}
			if (typeof (args.req.body.google) == 'undefined' || args.req.body.google == null) {
				args.req.body.google = {}
				if (typeof (args.req.body.google.database) == 'undefined' || args.req.body.google.database == null) {
					args.req.body.google.database = null
				}
				if (typeof (args.req.body.google.credentials) == 'undefined' || args.req.body.google.credentials == null) {
					args.req.body.google.credentials = null
				}
			}
			if (typeof (args.req.body.private) == 'undefined' || args.req.body.private == null) {
				args.req.body.private = null
			}
			if (typeof (args.req.body.google.credentials) == 'object' && args.req.body.google.credentials != null) {
				args.req.body.google.credentials = JSON.stringify(args.req.body.google.credentials);
			};

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
						.input('url', args.req.body.url)
						.input('icon', args.req.body.icon)
						.input('name', args.req.body.name)
						.input('appId', args.req.body.appId)
						.input('expiry', args.req.body.expiry)
						.input('secret', args.req.body.secret)
						.input('userId', args.req.body.header.userId)
						.input('private', args.req.body.private)
						.input('themeColor', args.req.body.theme.color)
						.input('googleDatabase', args.req.body.google.database)
						.input('themeBackground', args.req.body.theme.background)
						.input('googleCredentials', args.req.body.google.credentials)
						.execute('v1_Apps_Update');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						err.error.errors[0].code = result.recordset[0].code;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => {
					if (Array.isArray(args.req.body.scopes) && args.req.body.scopes.length > 0) {
						return new sql.Request(transaction)
							.input('appId', args.req.body.appId)
							.execute('v1_Apps_Purge_Scopes');
					} else {
						return Promise.resolve();
					};
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (typeof (args.req.body.scopes) == 'undefined' && args.req.body.scopes == null) {
						deferred.resolve(args);
					} else if (result.returnValue == 1 && result.recordset.length > 0) {
						deferred.resolve(args);
					} else {
						err.error.errors[0].code = result.recordset[0].code;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => {
					if (Array.isArray(args.req.body.scopes) && args.req.body.scopes.length > 0) {
						return args.req.body.scopes.reduce((promise, scopeId) => promise.then(() => new sql.Request(transaction)
							.input('appId', args.req.body.appId)
							.input('userId', args.req.body.header.userId)
							.input('scopeId', scopeId)
							.execute('v1_Apps_Add_Scope')
						), Promise.resolve());
					} else {
						return Promise.resolve();
					};
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (typeof (args.req.body.scopes) == 'undefined' && args.req.body.scopes == null) {
						deferred.resolve(args);
					} else if (result.returnValue == 1 && result.recordset.length > 0) {
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
					if (Array.isArray(args.req.body.domains) && args.req.body.domains.length > 0) {
						return new sql.Request(transaction)
							.input('appId', args.req.body.appId)
							.execute('v1_Apps_Purge_Domains');
					} else {
						return Promise.resolve();
					};
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (typeof (args.req.body.domains) == 'undefined' && args.req.body.domains == null) {
						deferred.resolve(args);
					} else if (result.returnValue == 1 && result.recordset.length > 0) {
						deferred.resolve(args);
					} else {
						err.error.errors[0].code = result.recordset[0].code;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => {
					if (Array.isArray(args.req.body.domains) && args.req.body.domains.length > 0) {
						return args.req.body.domains.reduce((promise, url) => promise.then(() => new sql.Request(transaction)
							.input('url', url)
							.input('appId', args.req.body.appId)
							.input('userId', args.req.body.header.userId)
							.execute('v1_Apps_Add_Domain')
						), Promise.resolve())
					} else {
						return Promise.resolve();
					};
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (typeof (args.req.body.domains) == 'undefined' && args.req.body.domains == null) {
						deferred.resolve(args);
					} else if (result.returnValue == 1 && result.recordset.length > 0) {
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

		delete: (args) => {
			var deferred = Q.defer();

			const request = new sql.Request(__database);

			request.input('appId', args.req.body.appId);
			request.input('userId', args.req.body.header.userId);

			request.execute('v1_Apps_Delete')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = result.recordset[0].code;
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

		allowaccess: (args) => {
			var deferred = Q.defer();

			if (typeof (args.req.body.expiry) != 'undefined' && args.req.body.expiry != null) {
				args.req.body.expiry = new Date(args.req.body.expiry);
			};

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
						.input('email', args.req.body.header.email)
						.execute('v1_Users_Get_By_Email');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.user = unwind(result.recordset[0]);
						var password = tools.encryption.sha512(args.req.body.password, args.user.salt);

						if (password.hash == args.user.hash) {
							if (args.user.validated == 1) {
								args.result.userId = args.user._id;
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
						.execute('v1_Apps_Validate');
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
							expiry: result[0].expiry,
							scopes: _.uniqBy(result, 'scopeId').map(o => o.scopeId),
							private: result[0].private,
							domains: _.uniqBy(result, 'domain').map(o => o.domain)
						};

						args.result.token.scopes = args.app.scopes;
						args.result.token.roles = args.app.bitid.auth.users.filter((o => o.userId == args.req.body.header.userId));

						if (typeof (args.req.body.expiry) == 'undefined') {
							args.req.body.expiry = new Date(Date.now() + parseInt(args.app.expiry));
						};

						if (args.app.private) {
							if (!args.app.bitid.auth.users.map(o => o.userId).includes(args.user._id)) {
								err.error.errors[0].code = 403;
								err.error.errors[0].reason = 'Application is private!';
								err.error.errors[0].message = 'Application is private!';
								deferred.reject(err);
							} else {
								deferred.resolve(args);
							};
						} else {
							deferred.resolve(args);
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
						.input('userId', args.user._id)
						.input('bearer', args.req.body.bearer)
						.input('device', args.req.headers['user-agent'])
						.input('expiry', args.req.body.expiry)
						.input('timezone', args.user.timezone)
						.input('description', args.req.body.description || args.app.app.name)
						.input('roles', JSON.stringify(args.result.token.roles))
						.execute('v1_Tokens_Add');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.tokenId = unwind(result.recordset[0])._id;
						args.result._id = args.tokenId;
						args.result.token.timezone = args.user.timezone;
						args.result.token.description = args.req.body.description || args.app.app.name;
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
						.input('userId', args.user._id)
						.input('tokenId', args.tokenId)
						.execute('v1_Tokens_Add_User');
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
						.input('userId', args.user._id)
						.input('scopeId', scopeId)
						.input('tokenId', args.tokenId)
						.execute('v1_Tokens_Add_Scope')
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

			request.input('appId', args.req.body.appId);
			request.input('userId', args.req.body.userId);
			request.input('adminId', args.req.body.header.userId);

			request.execute('v1_Apps_Unsubscribe')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = result.recordset[0].code;
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

		requestaccess: (args) => {
			var deferred = Q.defer();

			var err = new ErrorResponse();
			const transaction = new sql.Transaction(__database);

			transaction.on('commit', result => {
				deferred.resolve(args);
			});

			transaction.on('rollback', aborted => {
				deferred.reject(err);
			});

			args.result = {};

			transaction.begin()
				.then(res => new sql.Request(transaction).input('email', args.req.body.header.email).execute('v1_Users_Get_By_Email'), null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.user = unwind(result.recordset[0]);
						var password = tools.encryption.sha512(args.req.body.password, args.user.salt);

						if (password.hash == args.user.hash) {
							if (args.user.validated == 1) {
								args.result.userId = args.user._id;
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
						err.error.errors[0].code = 503;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => new sql.Request(transaction).input('appId', args.req.body.appId).execute('v1_Apps_Validate'), null)
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
							expiry: result[0].expiry,
							scopes: _.uniqBy(result, 'scopeId').map(o => o.scopeId),
							private: result[0].private,
							domains: _.uniqBy(result, 'domain').map(o => o.domain)
						};

						if (typeof (args.req.body.expiry) == 'undefined') {
							args.req.body.expiry = new Date(Date.now() + parseInt(args.app.expiry));
						};

						deferred.resolve(args);
					} else {
						err.error.errors[0].code = 503;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => new sql.Request(transaction).input('appId', args.req.body.appId).input('userId', args.user._id).execute('v1_Apps_Request_Access'), null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = result.recordset[0];
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

		updatesubscriber: (args) => {
			var deferred = Q.defer();

			const request = new sql.Request(__database);

			request.input('role', args.req.body.role);
			request.input('appId', args.req.body.appId);
			request.input('status', args.req.body.status);
			request.input('userId', args.req.body.userId);
			request.input('adminId', args.req.body.header.userId);

			request.execute('v1_Apps_Update_Subscriber')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = result.recordset[0].code;
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

	var dalAuth = {
		verify: (args) => {
			var deferred = Q.defer();

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
						.input('code', args.req.body.code)
						.input('email', args.req.body.header.email)
						.input('appId', args.req.body.header.appId)
						.execute('v1_Auth_Verify');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
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
						.input('scope', args.req.originalUrl)
						.input('appId', args.req.body.header.appId)
						.input('userId', args.result.userId)
						.execute('v1_Usage_Add');
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

		validate: (args) => {
			var deferred = Q.defer();

			if (typeof (args.req.headers.authorization) == 'undefined' || args.req.headers.authorization == null) {
				var err = new ErrorResponse();
				err.error.code = 401;
				err.error.errors[0].code = 401;
				err.error.errors[0].reason = 'Token not found in header!';
				err.error.errors[0].message = 'Token not found in header!';
				deferred.reject(err);
				return deferred.promise;
			} else {
				try {
					if (typeof (args.req.headers.authorization) == 'string') {
						args.req.headers.authorization = JSON.parse(args.req.headers.authorization);
					};
				} catch (error) {
					var err = new ErrorResponse();
					err.error.code = 401;
					err.error.errors[0].code = 401;
					err.error.errors[0].reason = 'Invalid token object in header!';
					err.error.errors[0].message = 'Invalid token object in header!';
					deferred.reject(err);
					return deferred.promise;
				};
			};

			args.req.headers.authorization.expiry = new Date(args.req.headers.authorization.expiry);

			const request = new sql.Request(__database);

			request.input('appId', args.req.body.header.appId);
			request.input('scope', args.req.body.scope);
			request.input('userId', args.req.body.header.userId);
			request.input('expiry', args.req.headers.authorization.expiry);
			request.input('bearer', args.req.headers.authorization.bearer);
			request.input('description', args.req.headers.authorization.description);
			request.input('roles', args.req.headers.authorization.roles || '');

			request.execute('v1_Auth_Validate')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 401;
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

		register: (args) => {
			var deferred = Q.defer();

			if (typeof (args.req.body.picture) == 'undefined' || args.req.body.picture == null) {
				args.req.body.picture = null
			}
			if (typeof (args.req.body.language) == 'undefined' || args.req.body.language == null) {
				args.req.body.language = null
			}
			if (typeof (args.req.body.timezone) == 'undefined' || args.req.body.timezone == null) {
				args.req.body.timezone = null
			}
			if (typeof (args.req.body.username) == 'undefined' || args.req.body.username == null) {
				args.req.body.username = null
			}
			if (typeof (args.req.body.name) == 'undefined' || args.req.body.name == null) {
				args.req.body.name = {};
				if (typeof (args.req.body.name.last) == 'undefined' || args.req.body.name.last == null) {
					args.req.body.name.last = null
				}
				if (typeof (args.req.body.name.first) == 'undefined' || args.req.body.name.first == null) {
					args.req.body.name.first = null
				}
				if (typeof (args.req.body.name.middle) == 'undefined' || args.req.body.name.middle == null) {
					args.req.body.name.middle = null
				}
			}
			if (typeof (args.req.body.number) == 'undefined' || args.req.body.number == null) {
				args.req.body.number = {};
				if (typeof (args.req.body.number.tel) == 'undefined' || args.req.body.number.tel == null) {
					args.req.body.number.tel = null
				}
				if (typeof (args.req.body.number.mobile) == 'undefined' || args.req.body.number.mobile == null) {
					args.req.body.number.mobile = null
				}
			}
			if (typeof (args.req.body.address) == 'undefined' || args.req.body.address == null) {
				args.req.body.address = {};
				if (typeof (args.req.body.address.same) == 'undefined' || args.req.body.address.same == null) {
					args.req.body.address.same = null
				}
				if (typeof (args.req.body.address.billing) == 'undefined' || args.req.body.address.billing == null) {
					args.req.body.address.billing = {}
					if (typeof (args.req.body.address.billing.street) == 'undefined' || args.req.body.address.billing.street == null) {
						args.req.body.address.billing.street = null
					}
					if (typeof (args.req.body.address.billing.suburb) == 'undefined' || args.req.body.address.billing.suburb == null) {
						args.req.body.address.billing.suburb = null
					}
					if (typeof (args.req.body.address.billing.country) == 'undefined' || args.req.body.address.billing.country == null) {
						args.req.body.address.billing.country = null
					}
					if (typeof (args.req.body.address.billing.cityTown) == 'undefined' || args.req.body.address.billing.cityTown == null) {
						args.req.body.address.billing.cityTown = null
					}
					if (typeof (args.req.body.address.billing.additional) == 'undefined' || args.req.body.address.billing.additional == null) {
						args.req.body.address.billing.additional = null
					}
					if (typeof (args.req.body.address.billing.postalCode) == 'undefined' || args.req.body.address.billing.postalCode == null) {
						args.req.body.address.billing.postalCode = null
					}
					if (typeof (args.req.body.address.billing.company) == 'undefined' || args.req.body.address.billing.company == null) {
						args.req.body.address.billing.company = {}
						if (typeof (args.req.body.address.billing.company.vat) == 'undefined' || args.req.body.address.billing.company.vat == null) {
							args.req.body.address.billing.company.vat = null
						}
						if (typeof (args.req.body.address.billing.company.reg) == 'undefined' || args.req.body.address.billing.company.reg == null) {
							args.req.body.address.billing.company.reg = null
						}
					}
				}
				if (typeof (args.req.body.address.physical) == 'undefined' || args.req.body.address.physical == null) {
					args.req.body.address.physical = {}
					if (typeof (args.req.body.address.physical.street) == 'undefined' || args.req.body.address.physical.street == null) {
						args.req.body.address.physical.street = null
					}
					if (typeof (args.req.body.address.physical.suburb) == 'undefined' || args.req.body.address.physical.suburb == null) {
						args.req.body.address.physical.suburb = null
					}
					if (typeof (args.req.body.address.physical.country) == 'undefined' || args.req.body.address.physical.country == null) {
						args.req.body.address.physical.country = null
					}
					if (typeof (args.req.body.address.physical.cityTown) == 'undefined' || args.req.body.address.physical.cityTown == null) {
						args.req.body.address.physical.cityTown = null
					}
					if (typeof (args.req.body.address.physical.additional) == 'undefined' || args.req.body.address.physical.additional == null) {
						args.req.body.address.physical.additional = null
					}
					if (typeof (args.req.body.address.physical.postalCode) == 'undefined' || args.req.body.address.physical.postalCode == null) {
						args.req.body.address.physical.postalCode = null
					}
					if (typeof (args.req.body.address.physical.company) == 'undefined' || args.req.body.address.physical.company == null) {
						args.req.body.address.physical.company = {}
						if (typeof (args.req.body.address.physical.company.vat) == 'undefined' || args.req.body.address.physical.company.vat == null) {
							args.req.body.address.physical.company.vat = null
						}
						if (typeof (args.req.body.address.physical.company.reg) == 'undefined' || args.req.body.address.physical.company.reg == null) {
							args.req.body.address.physical.company.reg = null
						}
					}
				}
			}
			if (typeof (args.req.body.identification) == 'undefined' || args.req.body.identification == null) {
				args.req.body.identification = {}
				if (typeof (args.req.body.identification.type) == 'undefined' || args.req.body.identification.type == null) {
					args.req.body.identification.type = null
				}
				if (typeof (args.req.body.identification.number) == 'undefined' || args.req.body.identification.number == null) {
					args.req.body.identification.number = null
				}
			}

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
						.input('code', Math.floor(Math.random() * 900000 + 100000))
						.input('salt', args.req.body.salt)
						.input('hash', args.req.body.hash)
						.input('email', args.req.body.header.email)
						.input('appId', args.req.body.header.appId)
						.input('picture', args.req.body.picture || null)
						.input('language', args.req.body.language || 'english')
						.input('timezone', args.req.body.timezone || 0)
						.input('username', args.req.body.username || null)
						.input('nameLast', args.req.body.name.last || null)
						.input('validated', 0)
						.input('nameFirst', args.req.body.name.first || null)
						.input('numberTel', args.req.body.number.tel || null)
						.input('nameMiddle', args.req.body.name.middle || null)
						.input('addressSame', args.req.body.address.same || null)
						.input('numberMobile', args.req.body.number.mobile || null)
						.input('identificationType', args.req.body.identification.type || null)
						.input('identificationNumber', args.req.body.identification.number || null)
						.input('addressBillingStreet', args.req.body.address.billing.street || null)
						.input('addressBillingSuburb', args.req.body.address.billing.suburb || null)
						.input('addressBillingCountry', args.req.body.address.billing.country || null)
						.input('addressPhysicalStreet', args.req.body.address.physical.street || null)
						.input('addressPhysicalSuburb', args.req.body.address.physical.suburb || null)
						.input('addressBillingCityTown', args.req.body.address.billing.cityTown || null)
						.input('addressPhysicalCountry', args.req.body.address.physical.country || null)
						.input('addressPhysicalCityTown', args.req.body.address.physical.cityTown || null)
						.input('addressBillingAdditional', args.req.body.address.billing.additional || null)
						.input('addressBillingPostalCode', args.req.body.address.billing.postalCode || null)
						.input('addressBillingCompanyVat', args.req.body.address.billing.company.vat || null)
						.input('addressBillingCompanyReg', args.req.body.address.billing.company.reg || null)
						.input('addressPhysicalAdditional', args.req.body.address.physical.additional || null)
						.input('addressPhysicalPostalCode', args.req.body.address.physical.postalCode || null)
						.input('addressPhysicalCompanyVat', args.req.body.address.physical.company.vat || null)
						.input('addressPhysicalCompanyReg', args.req.body.address.physical.company.reg || null)
						.execute('v1_Auth_Register');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
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
						.input('scope', args.req.originalUrl)
						.input('appId', args.req.body.header.appId)
						.input('userId', args.result._id)
						.execute('v1_Usage_Add');
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

		changeemail: (args) => {
			var deferred = Q.defer();

			const request = new sql.Request(__database);

			request.input('email', args.req.body.email);
			request.input('userId', args.req.body.header.userId);

			request.execute('v1_Auth_Change_Email')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = result.recordset[0].code;
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

		allowaccess: (args) => {
			var deferred = Q.defer();

			if (typeof (args.req.headers.authorization) == 'undefined' || args.req.headers.authorization == null) {
				var err = new ErrorResponse();
				err.error.code = 401;
				err.error.errors[0].code = 401;
				err.error.errors[0].reason = 'Token not found in header!';
				err.error.errors[0].message = 'Token not found in header!';
				deferred.reject(err);
				return deferred.promise;
			} else {
				try {
					if (typeof (args.req.headers.authorization) == 'string') {
						args.req.headers.authorization = JSON.parse(args.req.headers.authorization);
					};
				} catch (error) {
					var err = new ErrorResponse();
					err.error.code = 401;
					err.error.errors[0].code = 401;
					err.error.errors[0].reason = 'Invalid token object in header!';
					err.error.errors[0].message = 'Invalid token object in header!';
					deferred.reject(err);
					return deferred.promise;
				};
			};

			if (typeof (args.req.body.expiry) != 'undefined' && args.req.body.expiry != null) {
				args.req.body.expiry = new Date(args.req.body.expiry);
			} else {
				args.req.body.expiry = new Date();
			};

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
						.execute('v1_Users_Get');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.user = unwind(result.recordset[0]);
						if (args.user.validated == 1) {
							args.result.userId = args.user._id;
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
						.execute('v1_Apps_Validate');
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
							expiry: result[0].expiry,
							scopes: _.uniqBy(result, 'scopeId').map(o => o.scopeId),
							private: result[0].private,
							domains: _.uniqBy(result, 'domain').map(o => o.domain)
						};

						args.result.token.scopes = args.app.scopes;

						if (typeof (args.req.body.expiry) == 'undefined') {
							args.req.body.expiry = new Date(Date.now() + parseInt(args.app.expiry));
						};

						if (args.app.private) {
							if (!args.app.bitid.auth.users.map(o => o.userId).includes(args.user._id)) {
								err.error.errors[0].code = 403;
								err.error.errors[0].reason = 'Application is private!';
								err.error.errors[0].message = 'Application is private!';
								deferred.reject(err);
							} else {
								deferred.resolve(args);
							};
						} else {
							deferred.resolve(args);
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
						.input('appId', args.req.body.header.appId)
						.input('userId', args.req.body.header.userId)
						.input('bearer', args.req.headers.authorization.bearer)
						.input('description', args.req.headers.authorization.description)
						.execute('v1_Tokens_Revoke_Self');
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
					return new sql.Request(transaction)
						.input('appId', args.req.body.appId)
						.input('userId', args.req.body.header.userId)
						.input('bearer', args.req.body.bearer)
						.input('device', args.req.headers['user-agent'])
						.input('expiry', args.req.body.expiry)
						.input('timezone', args.user.timezone)
						.input('description', args.req.body.description)
						.execute('v1_Tokens_Add');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.tokenId = unwind(result.recordset[0])._id;
						args.result.tokenId = args.tokenId;
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
						.execute('v1_Tokens_Add_User');
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
						.execute('v1_Tokens_Add_Scope')
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

		authenticate: (args) => {
			var deferred = Q.defer();

			var err = new ErrorResponse();
			const transaction = new sql.Transaction(__database);

			if (typeof (args.req.body.expiry) != 'undefined' || args.req.body.expiry != null) {
				args.req.body.expiry = new Date(args.req.body.expiry);
			}

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
						.execute('v1_Users_Get_By_Email');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.user = unwind(result.recordset[0]);
						var password = tools.encryption.sha512(args.req.body.password, args.user.salt);

						if (password.hash == args.user.hash) {
							if (args.user.validated == 1) {
								args.result.userId = args.user._id;
								args.result.token.timezone = args.user.timezone;
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
						err.error.errors[0].code = result.recordset[0].code;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => {
					return new sql.Request(transaction)
						.input('appId', args.req.body.header.appId)
						.execute('v1_Apps_Validate');
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
							name: result[0].name,
							scopes: _.uniqBy(result, 'scopeId').map(o => o.scopeId),
							expiry: result[0].expiry,
							domains: _.uniqBy(result, 'domain').map(o => o.domain),
							private: result[0].private
						};

						args.result.token.scopes = args.app.scopes;
						args.result.token.roles = args.app.bitid.auth.users

						if (typeof (args.req.body.expiry) == 'undefined') {
							args.req.body.expiry = new Date(Date.now() + parseInt(args.app.expiry));
						};

						args.result.token.expiry = args.req.body.expiry;

						if (args.app.private) {
							if (!args.app.bitid.auth.users.map(o => o.userId).includes(args.user._id)) {
								err.error.errors[0].code = 403;
								err.error.errors[0].reason = 'Application is private!';
								err.error.errors[0].message = 'Application is private!';
								deferred.reject(err);
							} else {
								deferred.resolve(args);
							};
						} else {
							deferred.resolve(args);
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
						.input('appId', args.req.body.header.appId)
						.input('userId', args.user._id)
						.input('bearer', args.req.body.bearer)
						.input('device', args.req.headers['user-agent'])
						.input('expiry', args.req.body.expiry)
						.input('timezone', args.user.timezone)
						.input('description', args.req.body.description || args.app.app.name)
						.input('roles', args.result.token.roles)
						.execute('v1_Tokens_Add');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.tokenId = unwind(result.recordset[0])._id;
						args.result._id = args.tokenId;
						args.result.token.description = args.req.body.description || args.app.app.name;
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
						.input('userId', args.user._id)
						.input('tokenId', args.tokenId)
						.execute('v1_Tokens_Add_User');
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
						.input('userId', args.user._id)
						.input('scopeId', scopeId)
						.input('tokenId', args.tokenId)
						.execute('v1_Tokens_Add_Scope')
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
					return new sql.Request(transaction)
						.input('scope', args.req.originalUrl)
						.input('appId', args.req.body.header.appId)
						.input('userId', args.result.userId)
						.execute('v1_Usage_Add');
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

		resetpassword: (args) => {
			var deferred = Q.defer();

			const request = new sql.Request(__database);

			request.input('salt', args.req.body.salt);
			request.input('hash', args.req.body.hash);
			request.input('email', args.req.body.header.email);
			request.input('appId', args.req.body.header.appId);

			request.execute('v1_Auth_Reset_Password')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						args.result.password = args.req.body.password;
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = result.recordset[0].code;
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

		resetpassword: (args) => {
			var deferred = Q.defer();

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
						.input('salt', args.req.body.salt)
						.input('hash', args.req.body.hash)
						.input('email', args.req.body.header.email)
						.input('appId', args.req.body.header.appId)
						.execute('v1_Auth_Reset_Password');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						args.result.password = args.req.body.password;
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
						.input('scope', args.req.originalUrl)
						.input('appId', args.req.body.header.appId)
						.input('userId', args.result.userId)
						.execute('v1_Usage_Add');
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

		changepassword: (args) => {
			var deferred = Q.defer();

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
						.input('userId', args.req.body.header.userId)
						.execute('v1_Users_Get');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.user = unwind(result.recordset[0]);
						var password = tools.encryption.sha512(args.req.body.old, args.user.salt);

						if (password.hash == args.user.hash) {
							var password = tools.encryption.saltHashPassword(args.req.body.new);
							args.req.body.salt = password.salt;
							args.req.body.hash = password.hash;
							deferred.resolve(args);
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
						.input('salt', args.req.body.salt)
						.input('hash', args.req.body.hash)
						.input('userId', args.req.body.header.userId)
						.execute('v1_Auth_Change_Password');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
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
						.input('scope', args.req.originalUrl)
						.input('appId', args.req.body.header.appId)
						.input('userId', args.req.body.header.userId)
						.execute('v1_Usage_Add');
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

		changePasswordOnPeriod: (args) => {
			var deferred = Q.defer();

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
						.input('appId', __settings.client.appId)
						.execute('v1_Apps_Validate');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						result = result.recordset.map(o => unwind(o));
						args.app = {
							url: result[0].app.url,
							name: result[0].app.name,
							icon: result[0].app.icon,
							appId: result[0]._id
						};

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
						.input('duration', __settings.passwordResetDuration)
						.execute('v1_Check_Last_Password_Change');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.users = result.recordset.map(o => unwind(o));
						args.users = args.users.map(user => {
							var password = tools.password();
							user.salt = password.salt;
							user.hash = password.hash;
							user.password = password.value;
							return {
								result: {
									app: args.app,
									name: user.name,
									email: user.email,
									userId: user.userId,
									password: user.password
								}
							}
						});
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'No accounts found!';
						err.error.errors[0].message = 'No accounts found!';
						deferred.reject(err);
					}

					return deferred.promise;
				}, null)
				.then(res => {
					return args.users.reduce((promise, user) => promise.then(() => new sql.Request(transaction)
						.input('salt', user.salt)
						.input('hash', user.hash)
						.input('email', user.email)
						.input('appId', __settings.client.appId)
						.execute('v1_Auth_Reset_Password')
					), Promise.resolve())
				}, null)
				.then(res => {
					transaction.commit();
				})
				.catch(err => {
					transaction.rollback();
				})

			return deferred.promise;
		}
	};

	var dalUsers = {
		get: (args) => {
			var deferred = Q.defer();

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'userId') {
						filter['_id'] = 1;
					} else if (f == 'serverDate') {
						filter['server.date'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			const request = new sql.Request(__database);

			request.input('userId', args.req.body.header.userId);

			request.execute('v1_Users_Get')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						args.result = project(args.result, filter);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = result.recordset[0].code;
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

		list: (args) => {
			var deferred = Q.defer();

			if (typeof (args.req.body.email) != 'undefined' && args.req.body.email != null) {
				if (typeof (args.req.body.email) == 'string') {
					args.req.body.email = ['%', args.req.body.email, '%'].join('');
				} else if (Array.isArray(args.req.body.email) && args.req.body.email.length > 0) {
					args.req.body.email = args.req.body.email.join(',');
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

			const request = new sql.Request(__database);

			request.input('email', args.req.body.email);
			request.input('appId', __settings.client.appId);
			request.input('userId', args.req.body.header.userId);

			request.execute('v1_Users_List')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = result.recordset.map(o => unwind(o)).map(o => project(o, filter));
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

			if (typeof (args.req.body.picture) == 'undefined' || args.req.body.picture == null) {
				args.req.body.picture = null
			}
			if (typeof (args.req.body.language) == 'undefined' || args.req.body.language == null) {
				args.req.body.language = null
			}
			if (typeof (args.req.body.timezone) == 'undefined' || args.req.body.timezone == null) {
				args.req.body.timezone = null
			}
			if (typeof (args.req.body.username) == 'undefined' || args.req.body.username == null) {
				args.req.body.username = null
			}
			if (typeof (args.req.body.name) == 'undefined' || args.req.body.name == null) {
				args.req.body.name = {};
				if (typeof (args.req.body.name.last) == 'undefined' || args.req.body.name.last == null) {
					args.req.body.name.last = null
				}
				if (typeof (args.req.body.name.first) == 'undefined' || args.req.body.name.first == null) {
					args.req.body.name.first = null
				}
				if (typeof (args.req.body.name.middle) == 'undefined' || args.req.body.name.middle == null) {
					args.req.body.name.middle = null
				}
			}
			if (typeof (args.req.body.number) == 'undefined' || args.req.body.number == null) {
				args.req.body.number = {};
				if (typeof (args.req.body.number.tel) == 'undefined' || args.req.body.number.tel == null) {
					args.req.body.number.tel = null
				}
				if (typeof (args.req.body.number.mobile) == 'undefined' || args.req.body.number.mobile == null) {
					args.req.body.number.mobile = null
				}
			}
			if (typeof (args.req.body.address) == 'undefined' || args.req.body.address == null) {
				args.req.body.address = {};
				if (typeof (args.req.body.address.same) == 'undefined' || args.req.body.address.same == null) {
					args.req.body.address.same = null
				}
				if (typeof (args.req.body.address.billing) == 'undefined' || args.req.body.address.billing == null) {
					args.req.body.address.billing = {}
					if (typeof (args.req.body.address.billing.street) == 'undefined' || args.req.body.address.billing.street == null) {
						args.req.body.address.billing.street = null
					}
					if (typeof (args.req.body.address.billing.suburb) == 'undefined' || args.req.body.address.billing.suburb == null) {
						args.req.body.address.billing.suburb = null
					}
					if (typeof (args.req.body.address.billing.country) == 'undefined' || args.req.body.address.billing.country == null) {
						args.req.body.address.billing.country = null
					}
					if (typeof (args.req.body.address.billing.cityTown) == 'undefined' || args.req.body.address.billing.cityTown == null) {
						args.req.body.address.billing.cityTown = null
					}
					if (typeof (args.req.body.address.billing.additional) == 'undefined' || args.req.body.address.billing.additional == null) {
						args.req.body.address.billing.additional = null
					}
					if (typeof (args.req.body.address.billing.postalCode) == 'undefined' || args.req.body.address.billing.postalCode == null) {
						args.req.body.address.billing.postalCode = null
					}
					if (typeof (args.req.body.address.billing.company) == 'undefined' || args.req.body.address.billing.company == null) {
						args.req.body.address.billing.company = {}
						if (typeof (args.req.body.address.billing.company.vat) == 'undefined' || args.req.body.address.billing.company.vat == null) {
							args.req.body.address.billing.company.vat = null
						}
						if (typeof (args.req.body.address.billing.company.reg) == 'undefined' || args.req.body.address.billing.company.reg == null) {
							args.req.body.address.billing.company.reg = null
						}
					}
				}
				if (typeof (args.req.body.address.physical) == 'undefined' || args.req.body.address.physical == null) {
					args.req.body.address.physical = {}
					if (typeof (args.req.body.address.physical.street) == 'undefined' || args.req.body.address.physical.street == null) {
						args.req.body.address.physical.street = null
					}
					if (typeof (args.req.body.address.physical.suburb) == 'undefined' || args.req.body.address.physical.suburb == null) {
						args.req.body.address.physical.suburb = null
					}
					if (typeof (args.req.body.address.physical.country) == 'undefined' || args.req.body.address.physical.country == null) {
						args.req.body.address.physical.country = null
					}
					if (typeof (args.req.body.address.physical.cityTown) == 'undefined' || args.req.body.address.physical.cityTown == null) {
						args.req.body.address.physical.cityTown = null
					}
					if (typeof (args.req.body.address.physical.additional) == 'undefined' || args.req.body.address.physical.additional == null) {
						args.req.body.address.physical.additional = null
					}
					if (typeof (args.req.body.address.physical.postalCode) == 'undefined' || args.req.body.address.physical.postalCode == null) {
						args.req.body.address.physical.postalCode = null
					}
					if (typeof (args.req.body.address.physical.company) == 'undefined' || args.req.body.address.physical.company == null) {
						args.req.body.address.physical.company = {}
						if (typeof (args.req.body.address.physical.company.vat) == 'undefined' || args.req.body.address.physical.company.vat == null) {
							args.req.body.address.physical.company.vat = null
						}
						if (typeof (args.req.body.address.physical.company.reg) == 'undefined' || args.req.body.address.physical.company.reg == null) {
							args.req.body.address.physical.company.reg = null
						}
					}
				}
			}
			if (typeof (args.req.body.identification) == 'undefined' || args.req.body.identification == null) {
				args.req.body.identification = {}
				if (typeof (args.req.body.identification.type) == 'undefined' || args.req.body.identification.type == null) {
					args.req.body.identification.type = null
				}
				if (typeof (args.req.body.identification.number) == 'undefined' || args.req.body.identification.number == null) {
					args.req.body.identification.number = null
				}
			}

			const request = new sql.Request(__database);

			request.input('userId', args.req.body.header.userId);
			request.input('picture', args.req.body.picture);
			request.input('nameLast', args.req.body.name.last);
			request.input('language', args.req.body.language);
			request.input('timezone', args.req.body.timezone);
			request.input('username', args.req.body.username);
			request.input('nameFirst', args.req.body.name.first);
			request.input('numberTel', args.req.body.number.tel);
			request.input('nameMiddle', args.req.body.name.middle);
			request.input('addressSame', args.req.body.address.same);
			request.input('numberMobile', args.req.body.number.mobile);
			request.input('identificationType', args.req.body.identification.type);
			request.input('identificationNumber', args.req.body.identification.number);
			request.input('addressBillingStreet', args.req.body.address.billing.street);
			request.input('addressBillingSuburb', args.req.body.address.billing.suburb);
			request.input('addressBillingCountry', args.req.body.address.billing.country);
			request.input('addressPhysicalStreet', args.req.body.address.physical.street);
			request.input('addressPhysicalSuburb', args.req.body.address.physical.suburb);
			request.input('addressPhysicalCountry', args.req.body.address.physical.country);
			request.input('addressBillingCityTown', args.req.body.address.billing.cityTown);
			request.input('addressPhysicalCityTown', args.req.body.address.physical.cityTown);
			request.input('addressBillingCompanyVat', args.req.body.address.billing.company.vat);
			request.input('addressBillingCompanyReg', args.req.body.address.billing.company.reg);
			request.input('addressBillingAdditional', args.req.body.address.billing.additional);
			request.input('addressBillingPostalCode', args.req.body.address.billing.postalCode);
			request.input('addressPhysicalCompanyVat', args.req.body.address.physical.company.vat);
			request.input('addressPhysicalCompanyReg', args.req.body.address.physical.company.reg);
			request.input('addressPhysicalAdditional', args.req.body.address.physical.additional);
			request.input('addressPhysicalPostalCode', args.req.body.address.physical.postalCode);

			request.execute('v1_Users_Update')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = result.recordset[0].code;
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

		delete: (args) => {
			var deferred = Q.defer();

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
						.input('userId', args.req.body.header.userId)
						.execute('v1_Users_Get');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
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
						err.error.errors[0].code = 503;
						err.error.errors[0].reason = result.recordset[0].message;
						err.error.errors[0].message = result.recordset[0].message;
						deferred.reject(err);
					};

					return deferred.promise;
				}, null)
				.then(res => {
					return new sql.Request(transaction)
						.input('userId', args.req.body.header.userId)
						.execute('v1_Users_Delete');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						deferred.resolve(args);
					} else {
						err.error.errors[0].code = result.recordset[0].code;
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

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'scopeId') {
						filter['_id'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			const request = new sql.Request(__database);

			request.input('userId', args.req.body.header.userId);
			request.input('scopeId', args.req.body.scopeId);

			request.execute('v1_Scopes_Get')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						args.result = project(args.result, filter);
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

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'scopeId') {
						filter['_id'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			const request = new sql.Request(__database);

			request.input('appId', args.req.body.header.appId);
			request.input('userId', args.req.body.header.userId);

			request.execute('v1_Scopes_List')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = result.recordset.map(o => unwind(o)).map(o => project(o, filter));
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

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'scopeId') {
						filter['_id'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			const request = new sql.Request(__database);

			request.execute('v1_Scopes_Load')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = result.recordset.map(o => unwind(o)).map(o => project(o, filter));
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

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'tokenId') {
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
							scopes: _.uniqBy(result, 'url').map(o => o.url),
							device: result[0].device,
							expiry: result[0].expiry,
							description: result[0].description,
							roles: result[0].roles
						};

						args.result = project(args.result, filter);

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

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'tokenId') {
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

			if (typeof (args.req.body.appId) != 'undefined' && args.req.body.appId != null) {
				if (Array.isArray(args.req.body.appId)) {
					if (args.req.body.appId.length > 0) {
						args.req.body.appId = args.req.body.appId.join(',');
					} else {
						args.req.body.appId = null;
					};
				};
			};

			const request = new sql.Request(__database);

			request.input('appId', args.req.body.appId);
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
								scopes: _.uniqBy(result[tokenId], 'url').map(o => o.url),
								device: result[tokenId][0].device,
								expiry: result[tokenId][0].expiry,
								description: result[tokenId][0].description,
							};
							args.result.push(tmp);
						});

						args.result = args.result.map(o => project(o, filter));

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
			request.input('email', args.req.body.email);
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
							scopes: _.uniqBy(result, 'scopeId').map(o => o.scopeId),
							expiry: result[0].expiry,
							bearer: result[0].bearer,
							timezone: result[0].timezone,
							description: result[0].description,
							roles: result[0].roles
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
						.input('userId', args.req.body.header.userId)
						.input('tokenId', args.req.body.tokenId)
						.execute('v1_Tokens_Retrieve');
				}, null)
				.then(result => {
					var deferred = Q.defer();

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
								roles: result[0].roles,
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

					return deferred.promise;
				}, null)
				.then(res => {
					return new sql.Request(transaction)
						.input('scope', args.req.originalUrl)
						.input('appId', args.req.body.header.appId)
						.input('userId', args.req.body.header.userId)
						.execute('v1_Usage_Add');
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
					return new sql.Request(transaction)
						.input('userId', args.req.body.header.userId)
						.execute('v1_Users_Get');
				}, null)
				.then(result => {
					var deferred = Q.defer();

					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result.user = {
							signature: result.recordset[0].signature,
							nameFirst: result.recordset[0].nameFirst,
							nameLast: result.recordset[0].nameLast,
						}
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
						.execute('v1_Users_Get');
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
						.execute('v1_Apps_Validate');
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
						args.result.token.roles = args.app.bitid.auth.users.filter((o => o.userId == args.req.body.header.userId));
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
						.input('expiry', new Date(args.req.body.expiry))
						.input('timezone', args.user.timezone)
						.input('description', args.req.body.description)
						.input('roles', JSON.stringify(args.result.token.roles))
						.execute('v1_Tokens_Add');
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
						.execute('v1_Tokens_Add_User');
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
						.execute('v1_Tokens_Add_Scope')
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

			const request = new sql.Request(__database);

			request.input('appId', args.req.body.appId);
			request.input('title', args.req.body.title);
			request.input('userId', args.req.body.header.userId);
			request.input('description', args.req.body.description);

			request.execute('v1_Features_Add')
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

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'featureId') {
						filter['_id'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			const request = new sql.Request(__database);

			request.input('userId', args.req.body.header.userId);
			request.input('featureId', args.req.body.featureId);

			request.execute('v1_Features_Get')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = unwind(result.recordset[0]);
						args.result = project(args.result, filter);
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

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter['_id'] = 0;
				args.req.body.filter.map(f => {
					if (f == 'featureId') {
						filter['_id'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			const request = new sql.Request(__database);

			request.input('appId', args.req.body.appId);
			request.input('userId', args.req.body.header.userId);
			request.input('featureId', args.req.body.featureId);

			request.execute('v1_Features_List')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = result.recordset.map(o => unwind(o)).map(o => project(o, filter));
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

			request.input('title', args.req.body.title);
			request.input('userId', args.req.body.header.userId);
			request.input('featureId', args.req.body.featureId);
			request.input('description', args.req.body.description);

			request.execute('v1_Features_Update')
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
			request.input('featureId', args.req.body.featureId);

			request.execute('v1_Features_Delete')
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

	var dalStatistics = {
		usage: (args) => {
			var deferred = Q.defer();

			const request = new sql.Request(__database);

			request.input('userId', args.req.body.header.userId);

			request.execute('v1_Usage_List')
				.then(result => {
					if (result.returnValue == 1 && result.recordset.length > 0) {
						args.result = result.recordset.map(o => unwind(o));
						deferred.resolve(args);
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 69;
						err.error.errors[0].reason = 'no records found!';
						err.error.errors[0].message = 'no records found!';
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