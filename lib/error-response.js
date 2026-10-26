class ErrorResponse {

    constructor() {
        this.error = {
            'code': 503,
            'message': 'General Error',
            'errors': [{
                'code': 503,
                'reason': 'General Error',
                'message': 'General Error',
                'location': 'General Error',
                'locationType': 'General Error'
            }]
        };
        
        this.hiddenErrors = [];
    };

    /**
     * Normalize a reject/throw value so callers can safely set HTTP status
     * without throwing when err or err.error is missing (TypeError, string, etc.).
     */
    static applyStatus(err, code, message) {
        const status = typeof code === 'number' ? code : 503;
        const fallbackMessage = message
            || (err && typeof err === 'object' && typeof err.message === 'string' && err.message)
            || 'Request failed';

        if (!err || typeof err !== 'object' || !err.error || typeof err.error !== 'object') {
            err = new ErrorResponse();
            err.error.message = fallbackMessage;
            err.error.errors[0].reason = fallbackMessage;
            err.error.errors[0].message = fallbackMessage;
        }

        if (!Array.isArray(err.error.errors) || err.error.errors.length === 0) {
            err.error.errors = [{
                'code': status,
                'reason': fallbackMessage,
                'message': fallbackMessage
            }];
        }

        err.error.code = status;
        err.error.errors[0].code = status;
        if (message) {
            err.error.message = message;
            err.error.errors[0].reason = message;
            err.error.errors[0].message = message;
        }
        return err;
    }

}

module.exports = ErrorResponse;
