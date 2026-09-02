const crypto = require('crypto');
const bcrypt = require('bcrypt');

const BCRYPT_ROUNDS = 12;

const SENSITIVE_KEY = /^(password|old|new|hash|salt|secret|token|authorization|bearer|smtp|mongodb|credentials|tokenaddon|bitid_token)$/i;

const AUTH_RATE_LIMIT = {
    windowMs: 15 * 60 * 1000,
    max: 10,
    skipSuccessfulRequests: true
};

const REGISTER_RATE_LIMIT = {
    windowMs: 15 * 60 * 1000,
    max: 5,
    skipSuccessfulRequests: false
};

const API_RATE_LIMIT = {
    windowMs: 15 * 60 * 1000,
    max: 600,
    skipSuccessfulRequests: false
};

const AUTH_FAILURE_LIMIT_PATHS = [
    '/auth/authenticate',
    '/auth/reset-password',
    '/auth/allow-access',
    '/auth/allowaccess',
    '/auth/change-password',
    '/auth/change-email',
    '/auth/delete'
];

const API_LIMIT_PATHS = [
    '/apps',
    '/auth',
    '/users',
    '/scopes',
    '/groups',
    '/config',
    '/tokens',
    '/features',
    '/statistics',
    '/tips-and-updates'
];

function normalizeEmail(email) {
    if (typeof email !== 'string') {
        return undefined;
    }
    const trimmed = email.trim();
    if (!trimmed) {
        return undefined;
    }
    return trimmed.toLowerCase();
}

function parseAllowedOrigins(envValue, fallbacks) {
    const envProvided = envValue !== undefined && envValue !== null && String(envValue).length > 0;
    const raw = envProvided ? String(envValue).split(',') : (fallbacks || []);
    const seen = new Set();
    const origins = [];
    raw.forEach(item => {
        if (typeof item !== 'string') {
            return;
        }
        const origin = item.trim();
        if (!origin || origin === 'xxx' || seen.has(origin)) {
            return;
        }
        seen.add(origin);
        origins.push(origin);
    });
    return origins;
}

function isOriginAllowed(origin, allowedOrigins) {
    if (!Array.isArray(allowedOrigins) || allowedOrigins.length === 0) {
        return false;
    }
    if (!origin) {
        return true;
    }
    return allowedOrigins.includes(origin);
}

function createCorsOriginDelegate(allowedOrigins) {
    return function corsOrigin(origin, callback) {
        if (isOriginAllowed(origin, allowedOrigins)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    };
}

function redactSensitive(input, seen) {
    if (input === null || input === undefined) {
        return input;
    }
    if (typeof input !== 'object') {
        return input;
    }
    const tracker = seen || new WeakSet();
    if (tracker.has(input)) {
        return '[Circular]';
    }
    tracker.add(input);

    if (input instanceof Error) {
        return {
            name: input.name,
            message: input.message
        };
    }

    if (Array.isArray(input)) {
        return input.map(item => redactSensitive(item, tracker));
    }

    const out = {};
    Object.keys(input).forEach(key => {
        if (SENSITIVE_KEY.test(key)) {
            out[key] = '[REDACTED]';
        } else {
            out[key] = redactSensitive(input[key], tracker);
        }
    });
    return out;
}

function timingSafeEqualString(left, right) {
    if (typeof left !== 'string' || typeof right !== 'string') {
        return false;
    }
    const leftBuf = Buffer.from(left);
    const rightBuf = Buffer.from(right);
    if (leftBuf.length !== rightBuf.length) {
        crypto.timingSafeEqual(leftBuf, Buffer.alloc(leftBuf.length));
        return false;
    }
    return crypto.timingSafeEqual(leftBuf, rightBuf);
}

function sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return {
        salt: salt,
        hash: hash.digest('hex')
    };
}

async function saltHashPassword(password) {
    const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    return {
        hash: hash,
        salt: null
    };
}

async function verifyPassword(password, user) {
    if (typeof password !== 'string' || !password || !user || typeof user.hash !== 'string' || !user.hash) {
        return false;
    }

    if (typeof user.salt === 'string' && user.salt.length > 0) {
        try {
            const computed = sha512(password, user.salt);
            return timingSafeEqualString(computed.hash, user.hash);
        } catch (err) {
            return false;
        }
    }

    try {
        return await bcrypt.compare(password, user.hash);
    } catch (err) {
        return false;
    }
}

module.exports = {
    BCRYPT_ROUNDS,
    AUTH_RATE_LIMIT,
    REGISTER_RATE_LIMIT,
    API_RATE_LIMIT,
    AUTH_FAILURE_LIMIT_PATHS,
    API_LIMIT_PATHS,
    normalizeEmail,
    parseAllowedOrigins,
    isOriginAllowed,
    createCorsOriginDelegate,
    redactSensitive,
    timingSafeEqualString,
    sha512,
    saltHashPassword,
    verifyPassword
};
