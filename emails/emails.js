var Q = require('q');
var hbs = require('nodemailer-express-handlebars');
var nodemailer = require('nodemailer');

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
            'name': [args.user.name.first, args.user.name.last].join(' '),
            'code': args.user.code,
            'verify': ['https://auth.bitid.co.za/verify-account?email=', args.user.email, '&code=', args.user.code].join('')
        },
        'to': __settings.production ? args.user.email : __settings.smtp.auth.user,
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
            'name': [args.user.name.first, args.user.name.last].join(' ')
        },
        'to': __settings.production ? args.user.email : __settings.smtp.auth.user,
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
            'link': ['https://auth.bitid.co.za/reset-password?email=', args.user.email, '&password=', args.user.password].join(''),
            'name': [args.user.name.first, args.user.name.last].join(' ')
        },
        'to': __settings.production ? args.user.email : __settings.smtp.auth.user,
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