const Q = require('q');
const ErrorResponse = require('./error-response');

var module = function () {
	var responder = {
		response: {
			share: (result) => {
				var deferred = Q.defer();

				deferred.resolve({
					'userId': result.userId,
					'updated': result.n
				});

				return deferred.promise;
			},

			update: (result) => {
				var deferred = Q.defer();

				deferred.resolve({
					'updated': result.n
				});

				return deferred.promise;
			},

			delete: (result) => {
				var deferred = Q.defer();

				deferred.resolve({
					'deleted': result.n
				});

				return deferred.promise;
			},

			apps: {
				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'appId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					var tmp = {
						'url': result.url,
						'role': result.role,
						'icon': result.icon,
						'name': result.name,
						'appId': result._id,
						'theme': result.theme,
						'expiry': result.expiry,
						'google': result.google,
						'scopes': result.scopes,
						'secret': result.secret,
						'domains': result.domains,
						'private': result.private
					};

					if (typeof (result.bitid) != 'undefined') {
						if (typeof (result.bitid.auth) != 'undefined') {
							tmp.users = result.bitid.auth.users;
							tmp.organizationOnly = result.bitid.auth.organizationOnly;
						};
					};

					deferred.resolve(tmp);

					return deferred.promise;
				},

				load: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'url': result.url,
						'icon': result.icon,
						'name': result.name,
						'appId': result._id,
						'theme': result.theme,
						'expiry': result.expiry,
						'scopes': result.scopes
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						var tmp = {
							'url': obj.url,
							'role': obj.role,
							'icon': obj.icon,
							'name': obj.name,
							'appId': obj._id,
							'theme': obj.theme,
							'expiry': obj.expiry,
							'google': obj.google,
							'scopes': obj.scopes,
							'secret': obj.secret,
							'domains': obj.domains,
							'private': obj.private
						};

						if (typeof (obj.bitid) != 'undefined') {
							if (typeof (obj.bitid.auth) != 'undefined') {
								tmp.users = obj.bitid.auth.users;
								tmp.organizationOnly = obj.bitid.auth.organizationOnly;
							};
						};

						return tmp;
					});

					deferred.resolve(result);

					return deferred.promise;
				},

				allowaccess: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'token': result.token,
						'userId': result.userId,
						'tokenId': result._id
					});

					return deferred.promise;
				}
			},

			auth: {
				register: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'code': result.code,
						'userId': result._id
					});

					return deferred.promise;
				},

				validate: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'passed': result
					});

					return deferred.promise;
				},

				allowaccess: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'token': result.token,
						'userId': result.userId,
						'tokenId': result.tokenId
					});

					return deferred.promise;
				},

				authenticate: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'token': result.token,
						'userId': result.userId
					});

					return deferred.promise;
				},

				resetpassword: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'updated': 1,
						'password': result.password
					});

					return deferred.promise;
				}
			},

			users: {
				get: (result) => {
					var deferred = Q.defer();

					var tmp = {
						'name': result.name,
						'email': result.email,
						'userId': result._id,
						'number': result.number,
						'address': result.address,
						'picture': result.picture,
						'language': result.language,
						'timezone': result.timezone,
						'username': result.username,
						'validated': result.validated,
						'identification': result.identification
					};

					if (typeof(result.server) != 'undefined' && result.server != null) {
						tmp.serverDate = result.server.date
					};

					deferred.resolve(tmp);

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						var tmp = {
							'name': obj.name,
							'email': obj.email,
							'userId': obj._id,
							'number': obj.number,
							'address': obj.address,
							'picture': obj.picture,
							'language': obj.language,
							'timezone': obj.timezone,
							'username': obj.username,
							'validated': obj.validated,
							'identification': obj.identification
						};

						if (typeof(obj.server) != 'undefined' && obj.server != null) {
							tmp.serverDate = obj.server.date
						};

						return tmp;
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			scopes: {
				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'scopeId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'url': result.url,
						'app': result.app,
						'role': result.role,
						'appId': result.appId,
						'roles': result.roles,
						'scopeId': result._id,
						'description': result.description
					});

					return deferred.promise;
				},

				load: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'url': obj.url,
							'app': obj.app,
							'roles': obj.roles,
							'scopeId': obj._id,
							'description': obj.description
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'url': obj.url,
							'app': obj.app,
							'role': obj.role,
							'appId': obj.appId,
							'roles': obj.roles,
							'scopeId': obj._id,
							'description': obj.description
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			tokens: {
				get: (result) => {
					var deferred = Q.defer();

					var tmp = {
						'app': result.app,
						'role': result.role,
						'appId': result.appId,
						'device': result.device,
						'scopes': result.scopes,
						'expiry': result.expiry,
						'tokenId': result._id,
						'description': result.description
					};

					if (typeof (result.bitid) != 'undefined') {
						if (typeof (result.bitid.auth) != 'undefined') {
							tmp.users = result.bitid.auth.users;
						};
					};

					deferred.resolve(tmp);

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						var tmp = {
							'app': obj.app,
							'role': obj.role,
							'appId': obj.appId,
							'device': obj.device,
							'scopes': obj.scopes,
							'expiry': obj.expiry,
							'tokenId': obj._id,
							'description': obj.description
						};

						if (typeof (obj.bitid) != 'undefined') {
							if (typeof (obj.bitid.auth) != 'undefined') {
								tmp.users = obj.bitid.auth.users;
							};
						};

						return tmp;
					});

					deferred.resolve(result);

					return deferred.promise;
				},

				download: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						scopes: result.scopes,
						expiry: result.expiry,
						bearer: result.bearer,
						timezone: result.timezone,
						description: result.description
					});

					return deferred.promise;
				},

				retrieve: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'token': result.token,
						'tokenId': result._id
					});

					return deferred.promise;
				},

				generate: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'token': result.token,
						'tokenId': result._id
					});

					return deferred.promise;
				}
			},

			features: {
				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'featureId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'app': result.app,
						'role': result.role,
						'appId': result.appId,
						'title': result.title,
						'featureId': result._id,
						'description': result.description
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'app': obj.app,
							'role': obj.role,
							'appId': obj.appId,
							'title': obj.title,
							'featureId': obj._id,
							'description': obj.description
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			statistics: {
				usage: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						var tmp = {
							url: obj.url,
							name: obj.name,
							appId: obj.appId,
							userId: obj.userId,
							scopeId: obj.scopeId,
							description: obj.description
						};

						if (typeof(obj.server) != 'undefined' && obj.server != null) {
							tmp.serverDate = obj.server.date
						};
						
						return tmp;
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			}
		},

		model: (req, result) => {
			var deferred = Q.defer();

			switch (req.originalUrl) {
				case ('*'):
					deferred.resolve(result);
					break;

				case ('/apps/add'):
					responder.response.apps.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/apps/get'):
					responder.response.apps.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/apps/load'):
					responder.response.apps.load(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/apps/list'):
					responder.response.apps.list(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/apps/allow-access'):
					responder.response.apps.allowaccess(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/scopes/add'):
					responder.response.scopes.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/scopes/get'):
					responder.response.scopes.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/scopes/load'):
					responder.response.scopes.load(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/scopes/list'):
					responder.response.scopes.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/tokens/get'):
					responder.response.tokens.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/tokens/list'):
					responder.response.tokens.list(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/tokens/retrieve'):
					responder.response.tokens.retrieve(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/tokens/download'):
					responder.response.tokens.download(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/tokens/generate'):
					responder.response.tokens.generate(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/auth/register'):
					responder.response.auth.register(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/auth/validate'):
					responder.response.auth.validate(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/auth/allow-access'):
					responder.response.auth.allowaccess(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/auth/authenticate'):
					responder.response.auth.authenticate(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/auth/reset-password'):
					responder.response.auth.resetpassword(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/users/get'):
					responder.response.users.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/users/list'):
					responder.response.users.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/features/add'):
					responder.response.features.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/features/get'):
					responder.response.features.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/features/list'):
					responder.response.features.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/statistics/usage'):
					responder.response.statistics.usage(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/apps/share'):
				case ('/tokens/share'):
					responder.response.share(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/auth/verify'):
				case ('/auth/change-email'):
				case ('/auth/change-password'):

				case ('/apps/update'):
				case ('/users/update'):
				case ('/scopes/update'):
				case ('/features/update'):

				case ('/apps/unsubscribe'):
				case ('/tokens/unsubscribe'):

				case ('/apps/update-subscriber'):
				case ('/tokens/update-subscriber'):
					responder.response.update(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/apps/delete'):
				case ('/users/delete'):
				case ('/tokens/revoke'):
				case ('/scopes/delete'):
				case ('/features/delete'):
					responder.response.delete(result).then(deferred.resolve, deferred.reject);
					break;

				default:
					deferred.resolve({
						'success': 'your request resolved successfully but this payload is not modeled'
					});
			};

			return deferred.promise;
		},

		error: (req, res, err) => {
			if (typeof (err) != 'undefined') {
				res.status(err.error.code).json(err.error);
				__logger.error(JSON.stringify(err));
			} else {
				var err = new ErrorResponse();
				err.error.errors[0].code = 503;
				err.error.errors[0].reason = 'Internal server error!';
				err.error.errors[0].message = 'Internal server error!';
				res.status(err.error.code).json(err.error);
				__logger.error(JSON.stringify(err));
			};
		},

		success: (req, res, result) => {
			responder.model(req, result)
				.then(result => {
					res.json(result);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = 503;
					err.error.errors[0].reason = 'Internal server error!';
					err.error.errors[0].message = 'Internal server error!';
					responder.error(req, res, err);
				});
		}
	};

	return responder;
};

exports.module = module;