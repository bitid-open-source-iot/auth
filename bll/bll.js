//shane test
const Q = require('q');
const dal = require('../dal/dal');
const tools = require('../lib/tools');
const Telemetry = require('../lib/telemetry').Telemetry;
const emails = require('../emails/emails');
const ErrorResponse = require('../lib/error-response');

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
				var err = new ErrorResponse();
				err.error.errors[0].code = 503;
				err.error.errors[0].reason = 'Privacy Policy Acceptance Issue';
				err.error.errors[0].message = 'Please accept our Privacy Policy';
				__responder.error(req, res, err);
				return false;
			};

			if (!args.req.body.termsAndConditions) {
				var err = new ErrorResponse();
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
					__responder.error(req, res, err);
				});
		},

		delete: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.users.delete(args)
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
					__responder.error(req, res, err);
				});
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
						deferred.reject(err);
					}
					return deferred.promise;
				}, err => {
					deferred.reject(err);
				})
				.then(args => {
					__responder.success(req, res, args.result);
				}, err => {
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