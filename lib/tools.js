const Q = require('q');
const _ = require('lodash');
const http = require('http');
const crypto = require('crypto');

var encryption = {
    saltHashPassword: (password) => {
        return encryption.sha512(password, this.encryption.generateRandomString(16));
    },

    generateRandomString: (length) => {
        return (crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length));
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
        var dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8');
        return dec;
    }
};

exports.encryption = encryption;

exports.unlink = (args) => {
    return JSON.parse(JSON.stringify(args));
};

exports.random = (length) => {
    var result = '';
    var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (var i = 0, n = charset.length; i < length; ++i) {
        result += charset.charAt(Math.floor(Math.random() * n));
    };
    return result;
};

exports.validateEmail = (email) => {
    if (email.length == 0) return false;
    var re = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return re.test(email);
};

exports.insertOwnerIfNoneExists = (args) => {
    var deferred = Q.defer();

    try {
        if (!args.req.body.users || typeof (args.req.body.users) != 'undefined') {
            args.req.body.users = [{
                'id': args.req.body.header.userId,
                'role': 5
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
                    if (user.id == args.req.body.header.userId) {
                        user.role = 5;
                        creatorFound = true;
                    };
                });
                if (!creatorFound) {
                    args.req.body.users.push({
                        'id': args.req.body.header.userId,
                        'role': 5
                    });
                };
            };
        };

        deferred.resolve(args);
    } catch (err) {
        deferred.reject(err);
    };

    return deferred.promise;
};

exports.validatePasswordStrength = (password) => {
    if (password.length == 0) return false;
    return true;
};

exports.isIncomingMessage = (param) => {
    return param instanceof http.IncomingMessage;
}

exports.log = (level, message, jsonError, jsonInput, jsonParameters) => {
    try {
        if (this.isIncomingMessage(jsonInput)) {
            jsonInput = {
                headers: jsonInput.headers,
                url: jsonInput.url,
                method: jsonInput.method,
                originalUrl: jsonInput.originalUrl
            }

        }

        if (typeof jsonError !== 'object') {
            jsonError = {
                explanation: jsonError
            };
        }

        if (typeof jsonInput === 'object') {
            jsonError = {
                ...jsonError,
                jsonInput
            }
        }

        if (typeof jsonParameters === 'object') {
            jsonError = {
                ...jsonError,
                jsonParameters
            }
        }

        const logEntry = {
            timestamp: new Date().toISOString(),
            level: level,
            message: message,
            ...jsonError
        };
        console.log(JSON.stringify(logEntry));

        let code = _.get(jsonError, `error.code`) || _.get(jsonError, `code`) || 503;
        let errReason = jsonError.description
        let errMessage = jsonError.description
        if (code.toString() == '69') code = 503;
        if (jsonError?.error?.errors?.length > 0) {
            errReason = jsonError?.error?.errors[0]?.reason || jsonError.description
            errMessage = jsonError?.error?.errors[0]?.message || jsonError.description
        }
        var err = {
            error: {
                code: code,
                message: message,
                errors: [
                    {
                        code: code,
                        reason: errReason,
                        message: errMessage
                    }
                ]
            }
        };
        return err;



    } catch (e) {
        console.log(
            {
                timestamp: new Date().toISOString(),
                level: 'error',
                message: 'Error in logging',
                e
            }
        );
    }
}