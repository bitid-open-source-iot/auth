const Q = require('q');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');

exports.verify = (args) => {
    var deferred = Q.defer();

    const transporter = nodemailer.createTransport(__settings.smtp);

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
            'name': [args.result.name.first, args.result.name.last].join(' '),
            'code': args.result.code,
            'verify': [__settings.client.auth, '/verify-account?email=', args.result.email, '&code=', args.result.code, '&appId=', args.result.app.appId, '&returl=', args.result.app.url, '/authenticate'].join('')
        },
        'to': __settings.production ? args.result.email : __settings.smtp.auth.user,
        'from': __settings.production ? 'support@bitid.co.za' : __settings.smtp.auth.user,
        'subject': 'Verify Account',
        'template': 'verify'
    }, (error, info) => {
        if (error) {
            __logger.error(error);
        } else {
            __logger.info(info);
        };
        deferred.resolve(args);
    });

    return deferred.promise;
};

exports.welcome = (args) => {
    var deferred = Q.defer();

    const transporter = nodemailer.createTransport(__settings.smtp);

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
            'name': [args.result.name.first, args.result.name.last].join(' ')
        },
        'to': __settings.production ? args.result.email : __settings.smtp.auth.user,
        'from': __settings.production ? 'support@bitid.co.za' : __settings.smtp.auth.user,
        'subject': 'Welcome',
        'template': 'welcome'
    }, (error, info) => {
        if (error) {
            __logger.error(error);
        } else {
            __logger.info(info);
        };
        deferred.resolve(args);
    });

    return deferred.promise;
};

exports.resetpassword = (args) => {
    var deferred = Q.defer();

    const transporter = nodemailer.createTransport(__settings.smtp);

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
            'link': [__settings.client.auth, '/reset-password?userId=', args.result.userId, '&password=', args.result.password, '&appId=', args.result.app.appId, '&returl=', args.result.app.url, '/authenticate'].join(''),
            'name': [args.result.name.first, args.result.name.last].join(' ')
        },
        'to': __settings.production ? args.result.email : __settings.smtp.auth.user,
        'from': __settings.production ? 'support@bitid.co.za' : __settings.smtp.auth.user,
        'subject': 'Reset Password',
        'template': 'reset-password'
    }, (error, info) => {
        if (error) {
            __logger.error(error);
        } else {
            __logger.info(info);
        };
        deferred.resolve(args);
    });

    return deferred.promise;
};