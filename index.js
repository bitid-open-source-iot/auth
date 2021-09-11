const Q = require('q');
const db = require('./db/mongo');
const dal = require('./dal/dal');
const path = require('path');
const cors = require('cors');
const http = require('http');
const chalk = require('chalk');
const express = require('express');
const responder = require('./lib/responder');
const ErrorResponse = require('./lib/error-response');

require('dotenv').config({ path: path.resolve(__dirname, '.env') })

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

let config = require('./config.json');
let configDefault = config.default
let configEnvironment = config[process.env.NODE_ENV]
global.__settings = { ...configDefault, ...configEnvironment }


global.__responder = new responder.module();


try {
    __settings.mongodb = process.env.mongodb
    __settings.mongodb = __settings.mongodb.replace(/xxx/g, 'auth')
    __settings.mongodb = JSON.parse(__settings.mongodb)

    __settings.client.auth = process.env.clientAuth
    __settings.client.drive = process.env.clientDrive

    /**TODO SMTP */

    console.log(JSON.stringify(__settings))

} catch (e) {
    console.error('ERROR APPLYING ENV VARIABLES', e)
}


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
                    if (__settings.authentication) {
                        let testIfToken
                        try {
                            testIfToken = JSON.parse(req.headers.authorization)
                            req.headers.authorization = req.headers.authorization
                        } catch (e) {
                            req.headers.authorization = JSON.stringify({ "Bearer": req.headers.authorization, "scopes": [{ "url": "*", "role": "4" }], "expiry": 32503680000000, "pushToken": "", "tokenAddOn": {} })
                        }

                        if (req.method != 'GET' && req.method != 'PUT' && req.originalUrl != '/auth/auth') {

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

                app.use('/apps', require('./api/apps'));
                console.log('loaded ./api/apps');

                app.use('/auth', require('./api/auth'));
                console.log('loaded ./api/auth');

                app.use('/users', require('./api/users'));
                console.log('loaded ./api/users');

                app.use('/scopes', require('./api/scopes'));
                console.log('loaded ./api/scopes');

                app.use('/config', require('./api/config'));
                console.log('loaded ./api/config');

                app.use('/tokens', require('./api/tokens'));
                console.log('loaded ./api/tokens');

                app.use('/features', require('./api/features'));
                console.log('loaded ./api/features');

                app.use('/statistics', require('./api/statistics'));
                console.log('loaded ./api/statistics');

                app.use('/tips-and-updates', require('./api/tips-and-updates'));
                console.log('loaded ./api/tips-and-updates');

                app.use('/health-check', require('@bitid/health-check'));
                console.log('loaded ./api/health-check');

                app.use('/', express.static(__dirname + '/app/dist/auth/'));
                app.get('/*', (req, res) => {
                    res.sendFile(__dirname + '/app/dist/auth/index.html');
                });

                app.use((err, req, res, next) => {
                    var err = new ErrorResponse();
                    err.error.code = 503;
                    err.error.message = 'Something broke';
                    err.error.errors[0].code = 503;
                    err.error.errors[0].message = 'Something broke';
                    __responder.error(req, res, err);
                });

                var server = http.createServer(app);
                server.listen(__settings.port);

                deferred.resolve();
            } catch (err) {
                deferred.reject(err.message);
            };

            return deferred.promise;
        },

        init: () => {
            if (!__settings.production || !__settings.authentication) {
                var index = 0;
                console.log('');
                console.log('=======================');
                console.log('');
                console.log(chalk.yellow('Warning: '));
                if (!__settings.production) {
                    index++;
                    console.log('');
                    console.log(chalk.yellow(index + ': You are running in ') + chalk.red('"Development Mode!"') + chalk.yellow(' This can cause issues if this environment is a production environment!'));
                    console.log('');
                    console.log(chalk.yellow('To enable production mode, set the ') + chalk.bold(chalk.green('production')) + chalk.yellow(' variable in the config to ') + chalk.bold(chalk.green('true')) + chalk.yellow('!'));
                };
                if (!__settings.authentication) {
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
                    console.log('Webserver Running on port: ', __settings.port);
                    console.log('Webserver Running on port: ' + __settings.port);
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
                console.error('Database Connection Error: ' + err);
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