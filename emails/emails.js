const Q = require('q');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');

exports.test = () => {
    var deferred = Q.defer();

    try{
        const transporter = nodemailer.createTransport(__settings.smtp);


        transporter.sendMail({
            from: 'notifications@dijital.cloud',
            to: 'shane@bitid.co.za',
            subject: 'Test',
            text: 'hello world1',
            html: '<h1>TEST1</h1>'
          })
          deferred.resolve()
    }catch(e){
        deferred.reject(e)
    }

    return deferred.promise
}

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
            'verify': [__settings.client.auth, '/verify-account?email=', args.user.email, '&code=', args.user.code, '&appId=', args.app.appId, '&returl=', args.app.url, '/authenticate'].join(''),
            'branding': __settings.branding
        },
        'to': __settings.production ? args.user.email : __settings.smtp.auth.user,
        'from': __settings.production ? __settings.smtp.auth.user : 'support@bitid.co.za',
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
            'name': [args.user.name.first, args.user.name.last].join(' '),
            'branding': __settings.branding
        },
        'to': __settings.production ? args.user.email : __settings.smtp.auth.user,
        'from': __settings.production ? __settings.smtp.auth.user : 'support@bitid.co.za',
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
            'link': [__settings.client.auth, '/reset-password?email=', args.user.email, '&password=', args.user.password, '&appId=', args.app.appId, '&returl=', args.app.url, '/authenticate'].join(''),
            'name': [args.user.name.first, args.user.name.last].join(' '),
            'branding': __settings.branding
        },
        'to': __settings.production ? args.user.email : __settings.smtp.auth.user,
        'from': __settings.production ? __settings.smtp.auth.user : 'support@bitid.co.za',
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