const validator = require('validator');
const format = require('./format');
const tools = require('./tools');

const sanitizeEmail = (email) => {
    return format.email(email) || null;
};

const validateEmail = (email) => {
    if (!email || typeof email !== 'string') {
        return false;
    }
    return validator.isEmail(email.trim());
};

const validatePassword = (password) => {
    if (!password || typeof password !== 'string') {
        return { valid: false, message: 'Password is required' };
    }
    if (password.length < 8) {
        return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    if (password.length > 128) {
        return { valid: false, message: 'Password is too long' };
    }
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[0-9]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true };
};

const sanitizeString = (str, maxLength = 255) => {
    if (!str || typeof str !== 'string') {
        return '';
    }
    return validator.escape(str.slice(0, maxLength).trim());
};

const validateObjectId = (id) => {
    if (!id || typeof id !== 'string') {
        return false;
    }
    return validator.isMongoId(id);
};

const reject = (req, res, message, code) => {
    const err = tools.log('error', message, {}, { reqAuthorization: req?.authorization });
    err.error.code = code;
    err.error.errors[0].code = code;
    err.error.errors[0].reason = message;
    err.error.errors[0].message = message;
    return __responder.error(req, res, err);
};

const applyEmail = (req) => {
    const email = req.body?.email;
    if (!validateEmail(email)) {
        return false;
    }
    req.body.email = sanitizeEmail(email);
    if (req.body.header && typeof req.body.header.email === 'string') {
        req.body.header.email = sanitizeEmail(req.body.header.email) || req.body.header.email;
    }
    return true;
};

const validateEmailRequest = (req, res, next) => {
    if (!applyEmail(req)) {
        return reject(req, res, 'Invalid email format', 400);
    }
    next();
};

const validateAuthRequest = (req, res, next) => {
    if (!applyEmail(req)) {
        return reject(req, res, 'Invalid email format', 400);
    }

    if (!req.body.password || typeof req.body.password !== 'string') {
        return reject(req, res, 'Invalid password', 400);
    }

    next();
};

const validateRegisterRequest = (req, res, next) => {
    if (!applyEmail(req)) {
        return reject(req, res, 'Invalid email format', 400);
    }

    const passwordValidation = validatePassword(req.body.password);
    if (!passwordValidation.valid) {
        return reject(req, res, passwordValidation.message, 400);
    }

    next();
};

module.exports = {
    sanitizeEmail,
    validateEmail,
    validatePassword,
    sanitizeString,
    validateObjectId,
    validateEmailRequest,
    validateAuthRequest,
    validateRegisterRequest
};
