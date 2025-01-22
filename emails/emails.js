const Q = require('q');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const tools = require('../lib/tools');

exports.verify = (args) => {
    var deferred = Q.defer();

    var config = JSON.parse(JSON.stringify(__settings.smtp));
    delete config.from;

    const transporter = nodemailer.createTransport(config);

    transporter.use('compile', hbs({
        'viewEngine': {
            'extName': '.hbs',
            'layoutsDir': __dirname + '/templates',
            'partialsDir': __dirname + '/templates',
            'defaultLayout': 'verify.hbs'
        },
        'extName': '.hbs',
        'viewPath': __dirname + '/templates'
    }));

    transporter.sendMail({
        'context': {
            'name': [args.user.name.first, args.user.name.last].join(' '),
            'code': args.user.code,
            'verify': [__settings.client.auth, '/verify-account?email=', args.user.email, '&code=', args.user.code, '&appId=', args.app.appId, '&returl=', args.app.url, '/authenticate'].join(''),
            'branding': __settings.branding
        },
        'to': __settings.production ? args.user.email : __settings.smtp.auth.user,
        'from': __settings.smtp.from,
        'subject': 'Verify Account',
        'template': 'verify'
    }, (error, info) => {
        if (error) {
            tools.log('error', 'error in emails.verify', error);
        } else {
            tools.log('info', 'info in emails.verify', info);
        };
        deferred.resolve(args);
    });

    return deferred.promise;
};

exports.welcome = (args) => {
    var deferred = Q.defer();

    var config = JSON.parse(JSON.stringify(__settings.smtp));
    delete config.from;

    const transporter = nodemailer.createTransport(config);

    transporter.use('compile', hbs({
        'viewEngine': {
            'extName': '.hbs',
            'layoutsDir': __dirname + '/templates',
            'partialsDir': __dirname + '/templates',
            'defaultLayout': 'welcome.hbs'
        },
        'extName': '.hbs',
        'viewPath': __dirname + '/templates'
    }));

    transporter.sendMail({
        'context': {
            'name': [args.user.name.first, args.user.name.last].join(' '),
            'branding': __settings.branding
        },
        'to': __settings.production ? args.user.email : __settings.smtp.auth.user,
        'from': __settings.smtp.from,
        'subject': 'Welcome',
        'template': 'welcome'
    }, (error, info) => {
        if (error) {
            tools.log('error', 'error in emails.welcome', error);
        } else {
            tools.log('info', 'info in emails.welcome', info);
        };
        deferred.resolve(args);
    });

    return deferred.promise;
};

exports.resetpassword = (args) => {
    var deferred = Q.defer();

    var config = JSON.parse(JSON.stringify(__settings.smtp));
    delete config.from;

    const transporter = nodemailer.createTransport(config);

    transporter.use('compile', hbs({
        'viewEngine': {
            'extName': '.hbs',
            'layoutsDir': __dirname + '/templates',
            'partialsDir': __dirname + '/templates',
            'defaultLayout': 'reset-password.hbs'
        },
        'extName': '.hbs',
        'viewPath': __dirname + '/templates'
    }));

    transporter.sendMail({
        'context': {
            'link': [__settings.client.auth, '/change-password?userId=', args.user._id, '&password=', args.user.password, '&appId=', args.app.appId, '&returl=', args.app.url, '/authenticate'].join(''),
            'name': [args.user.name.first, args.user.name.last].join(' '),
            'branding': __settings.branding
        },
        'to': __settings.production ? args.user.email : __settings.smtp.auth.user,
        'from': __settings.smtp.from,
        'subject': 'Reset Password',
        'template': 'reset-password'
    }, (error, info) => {
        if (error) {
            tools.log('error', 'error in emails.resetpassword', error);
        } else {
            tools.log('info', 'info in emails.resetpassword', info);
        };
        deferred.resolve(args);
    });

    return deferred.promise;
};