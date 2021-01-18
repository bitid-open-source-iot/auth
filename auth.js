const Q = require('q');
const db = require('./db/mongo');
const dal = require('./dal/dal');
const cors = require('cors');
const http = require('http');
const chalk = require('chalk');
const express = require('express');
const Responder = require('./lib/responder');
const bodyParser = require('body-parser');
const ErrorResponse = require('./lib/error-response');

global.__base = __dirname + '/';
global.__logger = require('./lib/logger');
global.__settings = require('./config.json');
global.__responder = new Responder.module();

__logger.init();

try {
    var portal = {
        api: (args) => {
            var deferred = Q.defer();

            try {
                var app = express();
                app.use(cors());
                app.use(bodyParser.urlencoded({
                    'limit': '50mb',
                    'extended': true
                }));
                app.use(bodyParser.json({
                    'limit': '50mb'
                }));

                app.use((req, res, next) => {
                    /* --- THIS WILL CATER FOR APPS UNTIL WE UPDATE THERE API SERVICES --- */
                    if (typeof (req.body) != 'undefined') {
                        if (typeof (req.body.header) != 'undefined') {
                            if (typeof (req.body.header.clientIdAuth) != 'undefined') {
                                req.body.header.appId = req.body.header.clientIdAuth;
                                delete req.body.header.clientIdAuth;
                            };
                        };
                        Object.keys(req.body).map(key => {
                            if (key == 'clientId') {
                                req.body.appId = req.body[key];
                            };
                        });
                    };
                    if (args.settings.authentication) {
                        if (req.method != 'GET' && req.method != 'PUT' && req.originalUrl != '/auth/auth') {
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
                                    err.error.code = 401;
                                    err.error.errors[0].code = 401;
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

                app.use('/apps', require('./api/apps'));
                __logger.info('loaded ./api/apps');

                app.use('/auth', require('./api/auth'));
                __logger.info('loaded ./api/auth');

                app.use('/users', require('./api/users'));
                __logger.info('loaded ./api/users');

                app.use('/scopes', require('./api/scopes'));
                __logger.info('loaded ./api/scopes');

                app.use('/tokens', require('./api/tokens'));
                __logger.info('loaded ./api/tokens');

                app.use('/statistics', require('./api/statistics'));
                __logger.info('loaded ./api/statistics');

                app.use('/health-check', require('@bitid/health-check'));
                __logger.info('loaded ./api/health-check');

                app.use((err, req, res, next) => {
                    var err = new ErrorResponse();
                    err.error.code = 503;
                    err.error.message = 'Something broke';
                    err.error.errors[0].code = 503;
                    err.error.errors[0].message = 'Something broke';
                    __responder.error(req, res, err);
                });

                var server = http.createServer(app);
                server.listen(args.settings.localwebserver.port);

                deferred.resolve(args);
            } catch (err) {
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

            portal.api(args)
                .then(portal.database, null)
                .then(args => {
                    console.log('Webserver Running on port: ', args.settings.localwebserver.port);
                    __logger.info('Webserver Running on port: ' + args.settings.localwebserver.port);
                }, err => {
                    console.log('Error Initializing: ', err);
                });
        },

        database: (args) => {
            var deferred = Q.defer();

            db.connect().then(database => {
                global.__database = database;
                deferred.resolve(args);
            }, err => {
                __logger.error('Database Connection Error: ' + err);
                deferred.reject(err);
            });

            return deferred.promise;
        }
    };

    portal.init({
        'settings': __settings
    });
} catch (error) {
    console.log('The following error has occurred: ', error.message);
};