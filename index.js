const Q = require('q');
const db = require('./db/sql');
const dal = require('./dal/dal');
const cors = require('cors');
const http = require('http');
const chalk = require('chalk');
const config = require('./config.json');
const express = require('express');
const responder = require('./lib/responder');
const ErrorResponse = require('./lib/error-response');

global.__base = __dirname + '/';
global.__logger = require('./lib/logger');
global.__settings = config;
global.__responder = new responder.module();

__logger.init();

try {
    var portal = {
        api: () => {
            var deferred = Q.defer();

            try {
                var app = express();
                app.use(cors());
                app.use(express.urlencoded({
                    'limit': '50mb',
                    'extended': true
                }));
                app.use(express.json({
                    'limit': '50mb'
                }));

                app.use((req, res, next) => {
                    if (config.authentication) {
                        if (req.method != 'GET' && req.method != 'PUT') {
                            var args = {
                                'req': req,
                                'res': res
                            };

                            args.req.body.scope = args.req.originalUrl;

                            var myModule = new dal.module();
                            myModule.auth.validate(args)
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

                app.use('/config', require('./api/config'));
                __logger.info('loaded ./api/config');

                app.use('/tokens', require('./api/tokens'));
                __logger.info('loaded ./api/tokens');

                app.use('/features', require('./api/features'));
                __logger.info('loaded ./api/features');

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
                server.listen(config.port);

                deferred.resolve();
            } catch (err) {
                deferred.reject(err.message);
            };

            return deferred.promise;
        },

        init: () => {
            if (!config.production || !config.authentication) {
                var index = 0;
                console.log('');
                console.log('=======================');
                console.log('');
                console.log(chalk.yellow('Warning: '));
                if (!config.production) {
                    index++;
                    console.log('');
                    console.log(chalk.yellow(index + ': You are running in ') + chalk.red('"Development Mode!"') + chalk.yellow(' This can cause issues if this environment is a production environment!'));
                    console.log('');
                    console.log(chalk.yellow('To enable production mode, set the ') + chalk.bold(chalk.green('production')) + chalk.yellow(' variable in the config to ') + chalk.bold(chalk.green('true')) + chalk.yellow('!'));
                };
                if (!config.authentication) {
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

            portal.api()
                .then(portal.database, null)
                .then(args => {
                    console.log('Webserver Running on port: ', config.port);
                    __logger.info('Webserver Running on port: ' + config.port);
                }, err => {
                    console.log('Error Initializing: ', err);
                });
        },

        database: () => {
            var deferred = Q.defer();

            db.connect().then(database => {
                global.__database = database;
                deferred.resolve();
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