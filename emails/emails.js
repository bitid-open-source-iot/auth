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
            'name': [args.user.name.first, args.user.name.last].join(' '),
            'code': args.user.code,
            'verify': [process.env.client_auth, '/verify-account?email=', args.user.email, '&code=', args.user.code, '&appId=', args.app.appId, '&returl=', args.app.url, '/authenticate'].join('')
        },
        'to': process.env.production ? args.user.email : process.env.smtp_auth_user,
        'from': process.env.production ? 'support@bitid.co.za' : process.env.smtp_auth_user,
        'subject': 'Verify Account',
        'template': 'verify'
    }, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log(info);
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
        'to': process.env.production ? args.user.email : process.env.smtp_auth_user,
        'from': process.env.production ? 'support@bitid.co.za' : process.env.smtp_auth_user,
        'subject': 'Welcome',
        'template': 'welcome'
    }, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log(info);
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
            'link': [process.env.client_auth, '/reset-password?email=', args.user.email, '&password=', args.user.password, '&appId=', args.app.appId, '&returl=', args.app.url, '/authenticate'].join(''),
            'name': [args.user.name.first, args.user.name.last].join(' ')
        },
        'to': process.env.production ? args.user.email : process.env.smtp_auth_user,
        'from': process.env.production ? 'support@bitid.co.za' : process.env.smtp_auth_user,
        'subject': 'Reset Password',
        'template': 'reset-password'
    }, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log(info);
        };
        deferred.resolve(args);
    });

    return deferred.promise;
};