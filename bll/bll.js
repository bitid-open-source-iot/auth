//shane test
const Q = require('q');
const dal = require('../dal/dal');
const tools = require('../lib/tools');
const Telemetry = require('../lib/telemetry').Telemetry;
const emails = require('../emails/emails');

var module = function () {
	var bllApps = {
		add: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			tools.insertOwnerIfNoneExists(args)
				.then(myModule.apps.add)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllApps.add', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		get: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.apps.get(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllApps.get', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		load: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.apps.load(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllApps.load', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		list: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.apps.list(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllApps.list', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		share: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.apps.share(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllApps.share', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		update: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.apps.update(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllApps.update', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		delete: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.apps.delete(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllApps.delete', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		isadmin: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.apps.isadmin(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllApps.isadmin', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		manifest: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.apps.manifest(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllApps.manifest', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		allowaccess: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.apps.allowaccess(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllApps.allowaccess', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		unsubscribe: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.apps.unsubscribe(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllApps.unsubscribe', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		updatesubscriber: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.apps.updatesubscriber(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllApps.updatesubscriber', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		}
	};

	var bllAuth = {
		deleteAccount: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.auth.deleteAccount(args)
				.then(result => {
					__responder.success(req, res, result);
				}, err => {
					tools.log('error','error in bllAuth.deleteAccount', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		auth: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.auth.auth(args)
				.then(result => {
					__responder.success(req, res, result);
				}, err => {
					tools.log('error','error in bllAuth.auth', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		verify: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.apps.validate(args)
				.then(myModule.auth.verify)
				.then(emails.welcome)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllAuth.verify', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		register: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var password = tools.encryption.saltHashPassword(args.req.body.password);
			args.req.body.salt = password.salt;
			args.req.body.hash = password.hash;

			if (!args.req.body.privacyPolicy) {
				let err = tools.log('error','Privacy Policy Acceptance Issue', {}, { reqBody: req?.body, reqAuthorization: req?.authorization });
				err.error.errors[0].code = 503;
				err.error.errors[0].reason = 'Privacy Policy Acceptance Issue';
				err.error.errors[0].message = 'Please accept our Privacy Policy';
				__responder.error(req, res, err);
				return false;
			};

			if (!args.req.body.termsAndConditions) {
				let err = tools.log('error','Terms & Conditions Acceptance Issue', {}, { reqBody: req?.body, reqAuthorization: req?.authorization });
				err.error.errors[0].code = 503;
				err.error.errors[0].reason = 'Terms & Conditions Acceptance Issue';
				err.error.errors[0].message = 'Please accept our Terms & Conditions';
				__responder.error(req, res, err);
				return false;
			};

			var myModule = new dal.module();
			myModule.auth.register(args)
				.then(myModule.apps.validate)
				.then(emails.verify)
				.then(args => {
					if (__settings.production) {
						delete args.result.code;
					};
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllAuth.register', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		validate: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.auth.validate(args)
				.then(args => {
					__responder.success(req, res, args);
				}, err => {
					tools.log('error','error in bllAuth.validate', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		allowaccess: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.auth.allowaccess(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllAuth.allowaccess', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		changeemail: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.auth.changeemail(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllAuth.changeemail', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		authenticate: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.auth.authenticate(args)
				.then(args => {
					__responder.success(req, res, args);
				}, err => {
					tools.log('error','error in bllAuth.authenticate', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		resetpassword: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.apps.validate(args)
				.then(myModule.auth.resetpassword)
				.then(emails.resetpassword)
				.then(args => {
					if (!__settings.production) {
						args.result.password = args.user.password;
					};
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllAuth.resetpassword', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		changepassword: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.apps.validate(args)
				.then(myModule.auth.changepassword)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllAuth.changepassword', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		}
	};

	var bllUsers = {
		get: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.users.get(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllUsers.get', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		list: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.users.list(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllUsers.list', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		update: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.users.update(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllUsers.update', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		delete: async (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			try{
				let result = await myModule.auth.authenticate(args)
				args.req.body.header.userId = result.user._id.toString();
				result = await myModule.users.delete(args)
				__responder.success(req, res, args.result);
			}catch(err){
				tools.log('error','error in bllUsers.delete', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
				__responder.error(req, res, err);
			}


		}
	};

	var bllScopes = {
		add: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.scopes.add(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllScopes.add', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		get: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.scopes.get(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllScopes.get', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		list: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.scopes.list(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllScopes.list', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		update: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.scopes.update(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllScopes.update', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		delete: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.scopes.delete(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllScopes.delete', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		}
	};

	var bllGroups = {
		add: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			tools.insertOwnerIfNoneExists(args)
				.then(myModule.groups.add)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllGroups.add', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		copy: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.groups.copy(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllGroups.copy', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		get: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.groups.get(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllGroups.get', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		list: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.groups.list(args)
				.then(async result => {
					var deferred = Q.defer();
					try{
						/**
						 * When getting groups list from telemetry, we need the list of devices in the groups so
						 * we can display on the groups ui.
						 * When aleriting calls this we dont want the devices....just the groups
						 */
						if(args.req.body?.getDevices == true){
							args.groups = result.result;
							var telemetry = new Telemetry();
							let groupIds = args.groups.map(group => group._id);
							args.groupIds = groupIds;
							args.devices = await telemetry.listDevicesByGroups(args.groupIds)
							args.devices = args.devices?.result || []
							args.groups.map(group => {
								group.devices = args.devices.filter(device => device.groups.filter(dg => dg.id == group._id).length > 0)
							})
							args.groups.map(group => {
								group.devices.forEach(element => {
									delete element.groups;
								});
							})
							args.result = args.groups;
						}else{
							args.result = result.result
						}
						deferred.resolve(args);
					}catch(err){
						tools.log('error','error in bllGroups.list1', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
						deferred.reject(err);
					}
					return deferred.promise;
				}, err => {
					tools.log('error','error in bllGroups.list2', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					deferred.reject(err);
				})
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllGroups.list3', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		share: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.groups.share(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllGroups.share', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		update: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.groups.update(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllGroups.update', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		delete: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.groups.delete(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllGroups.delete', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		unsubscribe: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.groups.unsubscribe(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllGroups.unsubscribe', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		changeowner: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.groups.changeowner(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllGroups.changeowner', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		updatesubscriber: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.groups.updatesubscriber(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllGroups.updatesubscriber', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		}
	};

	var bllConfig = {
		get: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.config.get(args)
			.then(args => {
				var result = JSON.parse(JSON.stringify(__settings.client));
				result.icon = args.result.icon;
				result.name = args.result.name;
				result.appId = args.result._id;
				result.theme = args.result.theme;
				result.favicon = args.result.favicon;
				result.urlPrivacyPolicy = args.result.urlPrivacyPolicy;
				result.urlTermsAndConditions = args.result.urlTermsAndConditions;
				__responder.success(req, res, result);
			}, err => {
				tools.log('error','error in bllConfig.get', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
				__responder.error(req, res, err);
			});
		}
	};

	var bllTokens = {
		get: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.tokens.get(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllTokens.get', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		list: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.tokens.list(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllTokens.list', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		share: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.tokens.share(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllTokens.share', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		update: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.tokens.update(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllTokens.update', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		revoke: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.tokens.revoke(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllTokens.revoke', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		retrieve: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.tokens.retrieve(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllTokens.retrieve', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		generate: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.tokens.generate(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllTokens.generate', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		unsubscribe: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.tokens.unsubscribe(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllTokens.unsubscribe', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		updatesubscriber: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.tokens.updatesubscriber(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllTokens.updatesubscriber', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		}
	};

	var bllFeatures = {
		add: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.features.add(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllFeatures.add', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		get: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.features.get(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllFeatures.get', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		list: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.features.list(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllFeatures.list', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		update: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.features.update(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllFeatures.update', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		delete: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.features.delete(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllFeatures.delete', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		}
	};

	var bllStatistics = {
		usage: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.statistics.usage(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllStatistics.usage', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		}
	};

	var bllTipsAndUpdates = {
		add: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.tipsAndUpdates.add(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllTipsAndUpdates.add', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		get: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.tipsAndUpdates.get(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllTipsAndUpdates.get', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		list: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.tipsAndUpdates.list(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllTipsAndUpdates.list', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		update: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.tipsAndUpdates.update(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllTipsAndUpdates.update', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		},

		delete: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.tipsAndUpdates.delete(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					tools.log('error','error in bllTipsAndUpdates.delete', err, { reqBody: req?.body, reqAuthorization: req?.authorization });
					__responder.error(req, res, err);
				});
		}
	};

	return {
		'apps': bllApps,
		'auth': bllAuth,
		'users': bllUsers,
		'config': bllConfig,
		'scopes': bllScopes,
		'groups': bllGroups,
		'tokens': bllTokens,
		'features': bllFeatures,
		'statistics': bllStatistics,
		'tipsAndUpdates': bllTipsAndUpdates
	};
};

exports.module = module;