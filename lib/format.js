const { normalizeEmail } = require('./security');

exports.email = (value) => {
    return normalizeEmail(value);
};