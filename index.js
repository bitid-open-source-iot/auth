const Q = require('q');
const db = require('./db/sql');
const bll = require('./bll/bll');
const dal = require('./dal/dal');
const cors = require('cors');
const http = require('http');
const chalk = require('chalk');
const config = require('./config.json');
const express = require('express');
const responder = require('./lib/responder');
const ErrorResponse = require('./lib/error-response');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env-mssql') })

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

global.__base = __dirname + '/';
global.__settings = config;
global.__responder = new responder.module();

try{
    __settings.port = process.env.AUTH_PORT || 9000
    __settings.mssql = process.env.MSSQL
    __settings.production = true //??Clayton
    __settings.authentication = true
    __settings.passwordResetDuration = process.env.PASSWORD_RESET_DURATION || 31
    __settings.smtp = process.env.SMTP
    __settings.client.auth = process.env.CLIENT_AUTH
    __settings.client.appId = process.env.CLIENT_APPID
    __settings.client.drive = process.env.CLIENT_DRIVE
    __settings.client.appName = process.env.CLIENT_APPNAME

    console.log('__settings', __settings)


}catch(e){
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

                app.use('/health-check', require('@bitid/health-check'));
                console.log('loaded ./api/health-check');

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
                .then(portal.triggers, null)
                .then(args => {
                    console.log('Webserver Running on port: ', config.port);
                    console.log('Webserver Running on port: ' + config.port);
                }, err => {
                    console.log('Error Initializing: ', err);
                });
        },

        database: () => {
            var deferred = Q.defer();

            db.connect()
                .then(database => {
                    global.__database = database;
                    setInterval(() => {
                        if (!__database.connected) {
                            portal.database().then(portal.triggers, null);
                        };
                    }, 5000)
                    deferred.resolve();
                })
                .catch(err => {
                    console.error('Database Connection Error: ' + err);
                    deferred.reject(err);
                    setTimeout(() => portal.database(), 5000);
                });

            return deferred.promise;
        },

        triggers: () => {
            var deferred = Q.defer();

            try {
                var myModule = new bll.module();
    
                myModule.auth.changePasswordOnPeriod();

                setInterval(() => myModule.auth.changePasswordOnPeriod(), (60 * 60 * 1000));

                deferred.resolve();
            } catch(err) {
                deferred.reject(err);
            };

            return deferred.promise;
        }
    };

    portal.init({
        'settings': __settings
    });
} catch (error) {
    console.log('The following error has occurred: ', error.message);
};