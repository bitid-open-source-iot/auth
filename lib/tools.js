var Q       		= require('q');
var crypto 			= require('crypto');
var nodemailer 		= require('nodemailer');

var encryption = {
    saltHashPassword: (password) => {
        return encryption.sha512(password, this.encryption.generateRandomString(16));
    },

    generateRandomString: (length) => {
        return(crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0, length));
    },

    sha512: (password, salt) => {
        var hash = crypto.createHmac('sha512', salt)
        hash.update(password);
        var value = hash.digest('hex');
        
        return {
            'salt': salt,
            'hash': value
        };
    },

    decryptText: () => {
        var decipher = crypto.createDecipher(algorithm, password)
        var dec = decipher.update(text,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    }
};

exports.sendEmail = (args) => {
    var deferred = Q.defer();

    __Logger.LogData('','Trying to send email to: ' + args.req.body.header.email);

    var mailOptions = {
        "to": 		args.req.body.header.email,
        "html": 	args.body,
        "from": 	"support@bitid.co.za",
        "subject": 	args.subject
    };			

    var transporter = nodemailer.createTransport(__settings.smtpConfig);
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Send Email Error: ', error);
            deferred.reject(error);
        } else {
            deferred.resolve(args);
        };
    });		
    return deferred.promise;
};

exports.encryption = encryption;

exports.setRoleList = (args) => {
    var deferred = Q.defer();

    try {
        args.result = args.result.map(o => {
            if (typeof(o.bitid) != "undefined") {
                if (typeof(o.bitid.auth) != "undefined") {
                    if (typeof(o.bitid.auth.users) != "undefined") {
                        o.role = 0;

                        o.bitid.auth.users.map(user => {
                            if (user.email == args.req.body.header.email) {
                                o.role = user.role;
                            };
                        });
                    };
                };
            };
            return o;
        });

        if (typeof(args.req.body.filter) != "undefined" && Array.isArray(args.req.body.filter)) {
            if (args.req.body.filter.indexOf("role") == -1) {
                args.result = args.result.map(o => {
                    delete o.role;
                    return o;
                });
            };
        };

        if (typeof(args.req.body.filter) != "undefined") {
            if (args.req.body.filter.indexOf("users") == -1) {
                args.result = args.result.map(o => {
                    if (typeof(o.bitid) != "undefined") {
                        if (typeof(o.bitid.auth) != "undefined") {
                            if (typeof(o.bitid.auth.users) != "undefined") {
                                delete o.bitid.auth.users;
                            };
                        };
                    };
                    return o;
                });
            };
        };

        deferred.resolve(args);
    } catch(issue) {
        var err                      = bllOrganizations.errorResponse;
        err.error.errors[0].code     = 503;
        err.error.errors[0].message  = issue.message;
        deferred.resolve(err);
    };
    
    return deferred.promise;
};

exports.setRoleObject = (args) => {
    var deferred = Q.defer();

    try {
        if (typeof(args.result.bitid) != "undefined") {
            if (typeof(args.result.bitid.auth) != "undefined") {
                if (typeof(args.result.bitid.auth.users) != "undefined") {
                    args.result.role = 0;

                    args.result.bitid.auth.users.map(user => {
                        if (user.email == args.req.body.header.email) {
                            args.result.role = user.role;
                        };
                    });
                };
            };
        };

        if (typeof(args.req.body.filter) != "undefined" && Array.isArray(args.req.body.filter)) {
            if (args.req.body.filter.indexOf("role") == -1) {
                delete args.result.role;
            };
        };

        if (typeof(args.req.body.filter) != "undefined") {
            if (args.req.body.filter.indexOf("users") == -1) {
                if (typeof(args.result.bitid) != "undefined") {
                    if (typeof(args.result.bitid.auth) != "undefined") {
                        if (typeof(args.result.bitid.auth.users) != "undefined") {
                            delete args.result.bitid.auth.users;
                        };
                    };
                };
                delete args.result.bitid.auth.users;
            };
        };

        deferred.resolve(args);
    } catch(issue) {
        var err = bllOrganizations.errorResponse;
        err.error.errors[0].code     = 503;
        err.error.errors[0].message  = issue.message;
        deferred.resolve(err);
    };
    
    return deferred.promise;
};

exports.validateEmail = (email) => {
    if (email.length == 0) return false;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return re.test(email);		
};

exports.insertOwnerIfNoneExists = (args) => {
    var deferred = Q.defer();

    try {
        if (!args.req.body.users || typeof(args.req.body.users) != "undefined") {
            args.req.body.users = [{
                'role':     5,
                'email':    args.req.body.header.email
            }];
        } else {
            var adminFound = false;
            args.req.body.users.map(user => {
                if (user.role == 5) {
                    adminFound = true;
                };
            });

            if (!adminFound) {
                var creatorFound = false;
                args.req.body.users.map(user => {
                    if (user.email == args.req.body.header.email) {
                        user.role       = 5;
                        creatorFound    = true;
                    };
                });
                if (!creatorFound) {
                    args.req.body.users.push({
                        'role':     5,
                        'email':    args.req.body.header.email
                    });
                };
            };
        };
        
        deferred.resolve(args);
    } catch(err) {
        deferred.reject(err);
    };

    return deferred.promise;
};

exports.validatePasswordStrength = (password) => {
    if (password.length == 0) return false;
    return true;
};