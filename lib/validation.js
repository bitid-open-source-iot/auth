const validator = require('validator');
const tools = require('./tools');

const sanitizeEmail = (email) => {
    if (!email || typeof email !== 'string') {
        return null;
    }
    return validator.normalizeEmail(email, {
        all_lowercase: true,
        gmail_remove_dots: false
    });
};

const validateEmail = (email) => {
    if (!email || typeof email !== 'string') {
        return false;
    }
    return validator.isEmail(email);
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

const validateAuthRequest = (req, res, next) => {
    const { email, password } = req.body;
    
    if (!validateEmail(email)) {
        const err = tools.log('error', 'Invalid email format', {}, { reqAuthorization: req?.authorization });
        err.error.code = 400;
        err.error.errors[0].code = 400;
        err.error.errors[0].reason = 'Invalid email format';
        err.error.errors[0].message = 'Invalid email format';
        return __responder.error(req, res, err);
    }
    
    req.body.email = sanitizeEmail(email);
    
    if (!password || typeof password !== 'string') {
        const err = tools.log('error', 'Invalid password', {}, { reqAuthorization: req?.authorization });
        err.error.code = 400;
        err.error.errors[0].code = 400;
        err.error.errors[0].reason = 'Invalid password';
        err.error.errors[0].message = 'Invalid password';
        return __responder.error(req, res, err);
    }
    
    next();
};

const validateRegisterRequest = (req, res, next) => {
    const { email, password } = req.body;
    
    if (!validateEmail(email)) {
        const err = tools.log('error', 'Invalid email format', {}, { reqAuthorization: req?.authorization });
        err.error.code = 400;
        err.error.errors[0].code = 400;
        err.error.errors[0].reason = 'Invalid email format';
        err.error.errors[0].message = 'Invalid email format';
        return __responder.error(req, res, err);
    }
    
    req.body.email = sanitizeEmail(email);
    
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
        const err = tools.log('error', 'Invalid password', {}, { reqAuthorization: req?.authorization });
        err.error.code = 400;
        err.error.errors[0].code = 400;
        err.error.errors[0].reason = 'Invalid password';
        err.error.errors[0].message = passwordValidation.message;
        return __responder.error(req, res, err);
    }
    
    next();
};

module.exports = {
    sanitizeEmail,
    validateEmail,
    validatePassword,
    sanitizeString,
    validateObjectId,
    validateAuthRequest,
    validateRegisterRequest
};
