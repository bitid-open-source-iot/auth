var Q               = require('q');
var db              = require('./db/mongo');
var bll             = require('./bll/bll');
var dal             = require('./dal/dal');
var cors            = require('cors');
var http            = require('http');
var chalk           = require('chalk');
var logger          = require('./lib/logger');
var express         = require('express');
var Responder       = require('./lib/responder');
var bodyParser  	= require('body-parser');

const { ErrorResponse } = require('./lib/error-response');

global.__base       = __dirname + '/';
global.__Logger     = new logger.module();
global.__settings   = require('./config.json');
global.__responder  = new Responder.module();

try {
    var portal = {
        api: (args) => {
            var deferred = Q.defer();

            try {
                var app	= express();
                app.use(cors());
                app.use(bodyParser.urlencoded({
                    'limit':    '50mb',
                    'extended': true
                }));
                app.use(bodyParser.json({
                    "limit": '50mb'
                }));

                app.use((req, res, next) => {
                    /* --- THIS WILL CATER FOR APPS UNTIL WE UPDATE THERE API SERVICES --- */
                    if (typeof(req.body) != "undefined") {
                        if (typeof(req.body.header) != "undefined") {
                            if (typeof(req.body.header.clientIdAuth) != "undefined") {
                                req.body.header.appId = req.body.header.clientIdAuth;
                                delete req.body.header.clientIdAuth;
                            };
                        };
                        Object.keys(req.body).map(key => {
                            if (key == "clientId") {
                                req.body.appId = req.body[key];
                            };
                        });
                    };
                    if (args.settings.authentication) {
                        if (req.method != 'GET' && req.method != 'PUT' && req.originalUrl != '/auth/auth' && req.originalUrl != '/auth/validate') {
                            var tmp = {
                                'req': req,
                                'res': res
                            };

                            tmp.req.body.scope = tmp.req.originalUrl;
                            
                            var myModule = new dal.module();
			                myModule.auth.validate(tmp)
                            .then(result => {
                                next(); 
                            }, err => {
                                err.error.code              = 401;
                                err.error.errors[0].code    = 401;
                                __responder.error(req, res, err);
                            });
                        } else {
                            next();
                        };
                    } else {
                        next();
                    };
                });

                app.use('/', express.static(__dirname + '/app/dist/auth/'));
                app.get('/*', (req, res) => {
                    res.sendFile(__dirname + '/app/dist/auth/index.html');
                });

                var apps = require('./api/apps');
                app.use('/apps', apps);
                __Logger.LogData('', 'Loaded ./api/apps');

                var auth = require('./api/auth');
                app.use('/auth', auth);
                __Logger.LogData('', 'Loaded ./api/auth');

                var users = require('./api/users');
                app.use('/users', users);
                __Logger.LogData('', 'Loaded ./api/users');

                var token = require('./api/token');
                app.use('/token', token);
                __Logger.LogData('', 'Loaded ./api/token');

                var scopes = require('./api/scopes');
                app.use('/scopes', scopes);
                __Logger.LogData('', 'Loaded ./api/scopes');

                var tokens = require('./api/tokens');
                app.use('/tokens', tokens);
                __Logger.LogData('', 'Loaded ./api/tokens');

                var statistics = require('./api/statistics');
                app.use('/statistics', statistics);
                __Logger.LogData('', 'Loaded ./api/statistics');

                app.use((err, req, res, next) => {
                    var err                     = ErrorResponse();
                    err.error.code              = 500;
                    err.error.message           = 'Something broke';
                    err.error.errors[0].code    = 500;
                    err.error.errors[0].message = 'Something broke';
                    __responder.error(req, res, err);
                });

                var server = http.createServer(app);
                server.listen(args.settings.localwebserver.port);

                deferred.resolve(args);
            } catch(err) {
                deferred.reject(err.message);
            };
            
            return deferred.promise;
        },

        init: (args) => {
            if (!args.settings.production || !args.settings.authentication) {
                var index = 0;
                console.log('');
                console.log('=======================');
                console.log('');
                console.log(chalk.yellow('Warning: '));
                if (!args.settings.production) {
                    index++;
                    console.log('');
                    console.log(chalk.yellow(index + ': You are running in ') + chalk.red('"Development Mode!"') + chalk.yellow(' This can cause issues if this environment is a production environment!'));
                    console.log('');
                    console.log(chalk.yellow('To enable production mode, set the ') + chalk.bold(chalk.green('production')) + chalk.yellow(' variable in the config to ') + chalk.bold(chalk.green('true')) + chalk.yellow('!'));
                };
                if (!args.settings.authentication) {
                    index++;
                    console.log('');
                    console.log(chalk.yellow(index + ': Authentication is not enabled ') + chalk.yellow(' This can cause issues if this environment is a production environment!'));
                    console.log('');
                    console.log(chalk.yellow('To enable Authentication mode, set the ') + chalk.bold(chalk.green('authentication')) + chalk.yellow(' variable in the config to ') + chalk.bold(chalk.green('true')) + chalk.yellow('!'));
                };
                console.log('');
                console.log('=======================');
                console.log('');
            };

            portal.logger(args)
            .then(portal.api, null)
            .then(portal.database, null)
            .then(args => {
                console.log('Webserver Running on port: ', args.settings.localwebserver.port);
            }, err => {
                console.log('Error Initializing: ', err);
            });
        },

        logger: (args) => {
            var deferred    = Q.defer();

            try {
                __Logger.init(args.settings.LOG4JS);
                __Logger.LogData('', 'Logger Init');
                deferred.resolve(args);
            } catch(err) {
                deferred.reject(error);
            };

            return deferred.promise;
        },

        database: (args) => {
            var deferred = Q.defer();

            db.connect().then(database => {
                global.__database = database;
                deferred.resolve(args);
            }, err => {
                __Logger.LogData('Database Connection Error: ' +  err);
                deferred.reject(err);
            });

            return deferred.promise;
        }
    };

    portal.init({
        'settings': __settings
    });
} catch(error) {
    console.log('The following error has occurred: ', error.message);
};