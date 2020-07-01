var Q		= require('q');
var dal		= require('../dal/dal');
var fetch 	= require('node-fetch');
var tools	= require('../lib/tools');
var emails	= require('../emails/emails');

var module = function() {
	var bllApps = {
		errorResponse: {
			"error": {
				"code": 	401,
				"message": 	"Invalid App Details",
				"errors": [{
					"code": 		1,
					"reason": 		"GTeneral Error",
					"message": 		"Invalid App Details",
					"locaction": 	"bllApps",
					"locationType": "body"
				}]
			}
		},

		add: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			tools.insertOwnerIfNoneExists(args)
			.then(myModule.apps.add, null)
			.then(args => {
				__responder.success(req, res, args.result);
			}, err => {
				__responder.error(req, res, err);
			});
		},

		get: (req, res) => {
			var args = {
				"req": req,
				"res": res
			};

			var myModule = new dal.module();		
			myModule.apps.get(args)
			.then(tools.setRoleObject, null)
			.then(args => {
				__responder.success(req, res, args.result);
			}, err => {
				__responder.error(req, res, err);
			});
		},

		load: (req, res) => {
			var args = {
				"req": req,
				"res": res
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
				"req": req,
				"res": res
			};

			var myModule = new dal.module();		
			myModule.apps.list(args)
			.then(tools.setRoleList, null)
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
				"req": req,
				"res": res
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
				"req": req,
				"res": res
			};

			var myModule = new dal.module();
			myModule.apps.delete(args)
			.then(args => {
				__responder.success(req, res, args.result);
			}, err => {
				__responder.error(req, res, err);
			});
		},

		allowaccess: (req, res) => {
			var args = {
				"req": req,
				"res": res
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
				"req": req,
				"res": res
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
		errorResponse: {
			"error": {
				"code": 	401,
				"message": 	"Authentication Error",
				"errors":[{
					"code": 		401,
					"reason": 		"General Error",
					"message": 		"Authentication Error",
					"locaction": 	"bllAuth",
					"locationType": "body"
				}]
			},
			"hiddenErrors":[]
		},

		auth: (req, res) => {
			var deferred = Q.defer();

			var args = {
				"req": req,
				"res": res
			};

			var myModule = new dal.module();
			myModule.auth.auth(args)
			.then(result => {
				__responder.success(req, res, result);
			}, err => {
				__responder.error(req, res, err);
			});

			return deferred.promise;
		},

		verify: (req, res) => {
			var args = {
				'req': req,
				'res': res
			};

			var myModule = new dal.module();
			myModule.users.get(args)
			.then(myModule.auth.verify, null)
			.then(emails.welcome, null)
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

			var password 		= tools.encryption.saltHashPassword(args.req.body.password);
			args.req.body.salt 	= password.salt;
			args.req.body.hash 	= password.hash;

			var myModule = new dal.module();
			myModule.auth.register(args)
			.then(emails.verify, null)
			.then(args => {
				__responder.success(req, res, args.result);
			}, err => {
				__responder.error(req, res, err);
			});
		},

		validate: (req, res) => {
			var args = {
				"req": req,
				"res": res
			};

			var myModule = new dal.module();
			myModule.auth.validate(args)
			.then(args => {
				__responder.success(req, res, true);
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
			.then(async (args) => {
				var deferred = Q.defer();
	
				if (__settings.production) {
					if (typeof(args.req.body.pushToken) == 'undefined' || args.req.body.pushToken == "" && args.req.body.pushToken == null) {
						deferred.resolve(args);
					} else {
						try {
							const payload 	= JSON.stringify({
								"header": {
									"email": args.req.body.header.email,
									"appId": args.req.body.header.appId
								},
								"token": args.req.body.pushToken
							});
							const response = await fetch('https://alerting.bitid.co.za/alerting/tokens/upsert', {
								'headers': {
									'accept': 			'*/*',
									'Content-Type': 	'application/json; charset=utf-8',
									'Authorization': 	JSON.stringify(__settings.alerting.token),
									'Content-Length': 	payload.length
								},
								'body':		payload,
								'method': 	'PUT'
							});
							
							const result = await response.json();
		
							if (typeof(result.errors) != "undefined") {
								deferred.resolve(args);
							} else {
								deferred.resolve(args);
							};
						} catch (error) {
							deferred.resolve(args);
						};
					};
				} else {
					deferred.resolve(args);
				};
	
				return deferred.promise;
			}, null)
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

			/*
				- select user by email
				- generate random new password
				- update user details
				- send email to user with new password
			*/
			var myModule = new dal.module();
			myModule.users.get(args)
			.then(args => {
				var deferred = Q.defer();

				var length 			= 16;
	            var charset 		= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	            args.user.password	= "";

	            for (var i = 0, n = charset.length; i < length; ++i) {
	                args.user.password += charset.charAt(Math.floor(Math.random() * n));
	            };
	            
	            var encryption	= tools.encryption;
	            var newpassword	= encryption.saltHashPassword(args.user.password);
	            args.password 	= {
	            	'salt': newpassword.salt,
	            	'hash': newpassword.hash
	            };

	            deferred.resolve(args);

	            return deferred.promise;
			}, null)
			.then(myModule.auth.changepassword, null)
			.then(emails.resetpassword, null)
			.then(args => {
				if (!__settings.production) {
					args.result.password = args.user.password;
				};
				__responder.success(req, res, args.result);
			}, err => {
				__responder.error(req, res, err);
			});
		},
		
		retrieveToken: (req, res) => {
			var args = {
				"req": req,
				"res": res
			};

			var myModule = new dal.module();
			myModule.apps.load(args)
			.then(myModule.auth.processRetrieveToken, null)
			.then(args => {
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

		 	var password 	= tools.encryption.saltHashPassword(args.req.body.new);
            args.password 	= {
            	'salt': password.salt,
            	'hash': password.hash
            };

			var myModule = new dal.module();
			myModule.users.get(args)
			.then(args => {
				var deferred = Q.defer();

				var password = tools.encryption.sha512(args.req.body.old, args.result.salt);

				if (password.hash == args.result.hash) {
					deferred.resolve(args);
				} else {
					var err 					= bllAuth.errorResponse;
					err.error.errors[0].code	= 401;
					err.error.errors[0].reason	= 'Password is incorrect!';
					err.error.errors[0].message	= 'Password is incorrect!';
					deferred.reject(err);
				};

				return deferred.promise;

			}, null)
			.then(myModule.auth.changepassword, null)
			.then(args => {
				__responder.success(req, res, args.result);
			}, err => {
				__responder.error(req, res, err);
			});
		}	
	};

	var bllUsers = {
		errorResponse: {
			"error": {
				"code": 	401,
				"message": 	"Invalid User Details",
				"errors":[{
					"code": 		1,
					"reason": 		"General Error",
					"message": 		"Invalid User Details",
					"locaction": 	"bllUsers",
					"locationType": "body"
				}]
			}
		},

		get: (req, res) => {
			var args = {
				'req': 	req,
				'res': 	res
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
				'req': 	req,
				'res': 	res
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
				"req": req,
				"res": res
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
				"req": req,
				"res": res
			};

			var myModule = new dal.module();
			myModule.users.delete(args)
			.then(args => {
				__responder.success(req, res, args.result);
			}, err => {
				__responder.error(req, res, err);
			});
		},

		getUsers: (req, res) => {
			var deferred = Q.defer();

			var args = {
				'req': 		req,
				'res': 		res,
				'users': 	[]
			};

			var myModule = new dal.module();
			myModule.users.getUsers(args)
			.then(myModule.pushtokens.list, null)
			.then(args => {
				var deferred = Q.defer();
				
				args.result.map(push => {
					args.users.map(user => {
						if (push.email == user.email) {
							user.pushToken = push.token;
						};
					});
				});
				
				deferred.resolve(args);
				
				return deferred.promise;
			}, null)
			.then(args => {
				__responder.success(req, res, args.users);
			}, err => {
				__responder.error(req, res, err);
			});

			return deferred.promise;
		}
	};

	var bllScopes = {
		errorResponse: {
			"error": {
				"code": 	401,
				"message": 	"General Error",
				"errors":[{
					"code": 		1,
					"reason": 		"General Grror",
					"message": 		"Scopes Error",
					"locaction": 	"bllScopes",
					"locationType": "body"
				}]
			},
			"hiddenErrors":[]
		},

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
			.then(tools.setRoleObject, null)
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
			myModule.scopes.list(args)
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
			.then(tools.setRoleList, null)
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

	var bllTokens = {
		errorResponse: {
			"error": {
				"code": 	401,
				"message": 	"General Error",
				"errors":[{
					"code": 		1,
					"reason": 		"General Error",
					"message": 		"General Error",
					"locaction": 	"bllTokens",
					"locationType": "body"
				}]
			},
			"hiddenErrors": []
		},

		get: (req, res) => {
			var args = {
				"req": req,
				"res": res
			};

			var myModule = new dal.module();
			
			myModule.tokens.get(args)
			.then(tools.setRoleObject, null)
			.then(args => {
				__responder.success(req, res, args.result);
			}, err => {
				__responder.error(req, res, err);
			});
		},

		list: (req, res) => {
			var args = {
				"req": req,
				"res": res
			};

			var myModule = new dal.module();

			myModule.tokens.list(args)
			.then(tools.setRoleList, null)
			.then(args => {
				__responder.success(req, res, args.result);
			}, err => {
				__responder.error(req, res, err);
			});
		},

		share: (req, res) => {
			var args = {
				"req": req,
				"res": res
			};

			var myModule = new dal.module();
			myModule.tokens.share(args)
			.then(args => {
				__responder.success(req, res, args.result);
			}, err => {
				__responder.error(req, res, err);
			});
		},

		revoke: (req, res) => {
			var args = {
				"req": req,
				"res": res
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
				"req": req,
				"res": res
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
				"req": req,
				"res": res
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
				"req": req,
				"res": res
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
				"req": req,
				"res": res
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

	var bllStatistics = {
		errorResponse: {
			"error": {
				"code": 	401,
				"message": 	"General Statistics Error",
				"errors": [{
					"code": 		1,
					"reason": 		"General Statistics Error",
					"message": 		"General Statistics Error",
					"locaction": 	"bllStatistics",
					"locationType": "bll"
				}]
			}
		},

		usage: (req, res) => {
			var args = {
				"req": req,
				"res": res
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

	return {
		"apps": 		bllApps,
		"auth":    		bllAuth,
		"users":   		bllUsers,
		"scopes": 		bllScopes,
		"tokens": 		bllTokens,
		"statistics":	bllStatistics
	};
};

exports.module = module;
