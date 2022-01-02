const Q = require('q');
const ErrorResponse = require('./error-response');

var module = function () {
	var responder = {
		response: {
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

					deferred.resolve({
						'url': result.url,
						'role': result.role,
						'icon': result.icon,
						'name': result.name,
						'apps': result.bitid?.auth?.apps,
						'users': result.bitid?.auth?.users,
						'appId': result._id,
						'icons': result.icons,
						'theme': result.theme,
						'groups': result.bitid?.auth?.groups,
						'google': result.google,
						'scopes': result.scopes,
						'secret': result.secret,
						'domains': result.domains,
						'favicon': result.favicon,
						'private': result.bitid?.auth?.private,
						'organizationOnly': result.bitid?.auth?.organizationOnly
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'url': obj.url,
							'role': obj.role,
							'icon': obj.icon,
							'name': obj.name,
							'apps': obj.bitid?.auth?.apps,
							'users': obj.bitid?.auth?.users,
							'appId': obj._id,
							'icons': obj.icons,
							'theme': obj.theme,
							'groups': obj.bitid?.auth?.groups,
							'google': obj.google,
							'scopes': obj.scopes,
							'secret': obj.secret,
							'domains': obj.domains,
							'favicon': obj.favicon,
							'private': obj.bitid?.auth?.private,
							'organizationOnly': obj.bitid?.auth?.organizationOnly
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				},

				isadmin: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						admin: result
					});

					return deferred.promise;
				},

				manifest: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						name: result.name,
						icons: result.icons,
						scope: result.scope,
						display: result.display,
						start_url: result.start_url,
						short_name: result.short_name,
						theme_color: result.theme_color,
						background_color: result.background_color
					});

					return deferred.promise;
				}
			},

			auth: {
				auth: (result) => {
					var deferred = Q.defer();

					deferred.resolve([{
						'email': result[0].email,
						'appId': result[0].appId
					}]);

					return deferred.promise;
				},

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

					deferred.resolve([{
						'_id': result._id,
						'token': result.token
					}]);

					return deferred.promise;
				},

				authenticate: (args) => {
					var deferred = Q.defer();

					deferred.resolve([{
						'email': args.req.body.header.email,
						'token': args.result.token,
						'userId': args.result.userId,
						'tokenId': args.result._id
					}]);

					return deferred.promise;
				},

				resetpassword: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'updated': result.n,
						'password': result.password
					});

					return deferred.promise;
				}
			},

			users: {
				get: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
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
						'serverDate': result.serverDate,
						'privacyPolicy': result.privacyPolicy,
						'identification': result.identification,
						'newsAndChanges': result.newsAndChanges,
						'termsAndConditions': result.termsAndConditions
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
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
							'serverDate': obj.serverDate,
							'privacyPolicy': obj.privacyPolicy,
							'identification': obj.identification,
							'newsAndChanges': obj.newsAndChanges,
							'termsAndConditions': obj.termsAndConditions
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			groups: {
				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'groupId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'role': result.role,
						'apps': result?.bitid?.auth?.apps,
						'appId': result.appId,
						'users': result?.bitid?.auth?.users,
						'groups': result?.bitid?.auth?.groups,
						'groupId': result._id,
						'private': result?.bitid?.auth?.private,
						'description': result.description,
						'organizationOnly': result?.bitid?.auth?.organizationOnly
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'role': obj.role,
							'apps': obj?.bitid?.auth?.apps,
							'appId': obj.appId,
							'users': obj?.bitid?.auth?.users,
							'groups': obj?.bitid?.auth?.groups,
							'groupId': obj._id,
							'private': obj?.bitid?.auth?.private,
							'description': obj.description,
							'organizationOnly': obj?.bitid?.auth?.organizationOnly
						};
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
						'scopeId': result._id,
						'description': result.description
					});

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

					deferred.resolve({
						'app': result.app,
						'role': result.role,
						'apps': result.bitid?.auth?.apps,
						'users': result.bitid?.auth?.users,
						'appId': result.appId,
						'token': result.token,
						'groups': result.bitid?.auth?.groups,
						'device': result.device,
						'private': result.bitid?.auth?.private,
						'tokenId': result._id,
						'disabled': result.disabled,
						'description': result.description,
						'organizationOnly': result.bitid?.auth?.organizationOnly
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'app': obj.app,
							'role': obj.role,
							'apps': obj.bitid?.auth?.apps,
							'users': obj.bitid?.auth?.users,
							'appId': obj.appId,
							'token': obj.token,
							'groups': obj.bitid?.auth?.groups,
							'device': obj.device,
							'private': obj.bitid?.auth?.private,
							'tokenId': obj._id,
							'disabled': obj.disabled,
							'description': obj.description,
							'organizationOnly': obj.bitid?.auth?.organizationOnly
						};
					});

					deferred.resolve(result);

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
						'email': result.email,
						'userId': result.userId,
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
						return {
							'scope': obj.scope,
							'appId': obj.appId,
							'userId': obj.userId,
							'serverDate': obj.serverDate
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			tipsAndUpdates: {
				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'itemId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'app': result.app,
						'role': result.role,
						'data': result.data,
						'appId': result.appId,
						'title': result.title,
						'itemId': result._id,
						'subtitle': result.subtitle
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'app': obj.app,
							'role': obj.role,
							'data': obj.data,
							'appId': obj.appId,
							'title': obj.title,
							'itemId': obj._id,
							'subtitle': obj.subtitle
						};
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
				case ('/config/get'):
					deferred.resolve(result);
					break;

				case ('/apps/add'):
					responder.response.apps.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/apps/get'):
					responder.response.apps.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/apps/list'):
					responder.response.apps.list(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/apps/manifest'):
					responder.response.apps.manifest(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/apps/is-admin'):
					responder.response.apps.isadmin(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/groups/add'):
					responder.response.groups.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/groups/get'):
					responder.response.groups.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/groups/list'):
					responder.response.groups.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/scopes/add'):
					responder.response.scopes.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/scopes/get'):
					responder.response.scopes.get(result).then(deferred.resolve, deferred.reject);
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
				case ('/tokens/generate'):
					responder.response.tokens.generate(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/auth/auth'):
					responder.response.auth.auth(result).then(deferred.resolve, deferred.reject);
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

				case ('/tips-and-updates/add'):
					responder.response.tipsAndUpdates.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/tips-and-updates/get'):
					responder.response.tipsAndUpdates.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/tips-and-updates/list'):
					responder.response.tipsAndUpdates.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/auth/verify'):
				case ('/auth/change-email'):
				case ('/auth/change-password'):

				case ('/apps/update'):
				case ('/users/update'):
				case ('/groups/update'):
				case ('/tokens/update'):
				case ('/scopes/update'):
				case ('/features/update'):
				case ('/tips-and-updates/update'):

				case ('/apps/share'):
				case ('/tokens/share'):
				case ('/groups/share'):

				case ('/apps/unsubscribe'):
				case ('/tokens/unsubscribe'):
				case ('/groups/unsubscribe'):

				case ('/apps/change-owner'):
				case ('/tokens/change-owner'):
				case ('/groups/change-owner'):

				case ('/apps/update-subscriber'):
				case ('/tokens/update-subscriber'):
				case ('/groups/update-subscriber'):
					responder.response.update(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/apps/delete'):
				case ('/users/delete'):
				case ('/tokens/revoke'):
				case ('/groups/delete'):
				case ('/scopes/delete'):
				case ('/features/delete'):
				case ('/tips-and-updates/delete'):
					responder.response.delete(result).then(deferred.resolve, deferred.reject);
					break;

				default:
					deferred.resolve({
						'success': 'Your request resolved successfully but this payload is not modeled!'
					});
			};

			return deferred.promise;
		},

		error: (req, res, err) => {
			if (typeof (err) != 'undefined') {
				if (typeof (err) == 'object') {
					try {
						console.error(JSON.stringify(err));
					} catch (e) {
						console.error('Skipped writing an Error. Could not stringify the err object');
					};
				} else {
					console.error(err);
				};
				res.status(err.error.code).json(err.error);
			} else {
				var err = new ErrorResponse();
				err.error.errors[0].code = 503;
				err.error.errors[0].reason = 'Internal server error!';
				err.error.errors[0].message = 'Internal server error!';
				res.status(err.error.code).json(err.error);
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