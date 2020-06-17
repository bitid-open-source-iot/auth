var Q           = require('q');
var hbs         = require('nodemailer-express-handlebars');
var nodemailer  = require('nodemailer');

exports.verify = (args) => {
    var deferred = Q.defer();

    if (__settings.production) {
        const transporter = nodemailer.createTransport(__settings.smtp);
        
        transporter.use('compile', hbs({
            'viewEngine': {
                'extName':          '.hbs',
                'layoutsDir':       'templates',
                'partialsDir':      'templates',
                'defaultLayout':    'verify.hbs'
            },
            'extName':  '.hbs',
            'viewPath': 'templates'
        }));
        
        transporter.sendMail({
            'context': {
                'name':     [args.user.name.first, args.user.name.last].join(' '),
                'verify':   ['https://auth.bitid.co.za/verify-account?email=', args.user.email, '&code=', args.user.code].join('')
            },
            'to':       args.user.email,
            'from':     'support@bitid.co.za',
            'subject':  'Verify Account',
            'template': 'verify'
        }, (error, info) => {
            deferred.resolve(args);
        });
    } else {
        deferred.resolve(args);
    };

    return deferred.promise;
};

exports.welcome = (args) => {
    var deferred = Q.defer();

    if (__settings.production) {
        const transporter = nodemailer.createTransport(__settings.smtp);
        
        transporter.use('compile', hbs({
            'viewEngine': {
                'extName':          '.hbs',
                'layoutsDir':       'templates',
                'partialsDir':      'templates',
                'defaultLayout':    'welcome.hbs'
            },
            'extName':  '.hbs',
            'viewPath': 'templates'
        }));
        
        transporter.sendMail({
            'context': {
                'name': [args.user.name.first, args.user.name.last].join(' ')
            },
            'to':       args.user.email,
            'from':     'support@bitid.co.za',
            'subject':  'Welcome',
            'template': 'welcome'
        }, (error, info) => {
            deferred.resolve(args);
        });
    } else {
        deferred.resolve(args);
    };

    return deferred.promise;
};

exports.resetpassword = (args) => {
    var deferred = Q.defer();

    if (__settings.production) {
        const transporter = nodemailer.createTransport(__settings.smtp);
    
        transporter.use('compile', hbs({
            'viewEngine': {
                'extName':          '.hbs',
                'layoutsDir':       'templates',
                'partialsDir':      'templates',
                'defaultLayout':    'reset-password.hbs'
            },
            'extName':  '.hbs',
            'viewPath': 'templates'
        }));
        
        transporter.sendMail({
            'context': {
                'link': ['https://auth.bitid.co.za/reset-password?email=', args.user.email, '&password=', args.user.password].join(''),
                'name': [args.user.name.first, args.user.name.last].join(' ') 
            },
            'to':       args.user.email,
            'from':     'support@bitid.co.za',
            'subject':  'Reset Password',
            'template': 'reset-password'
        }, (error, info) => {
            deferred.resolve(args);
        });
    } else {
        deferred.resolve(args);
    };

    return deferred.promise;
};