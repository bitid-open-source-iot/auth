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

    // Guard err.error.code assignments. Raw TypeErrors (and tools.log failures)
    // have no .error, and setting .code on undefined kills the Node process.
    static ensure(err, code) {
        let payload;
        if (err && typeof err === 'object' && err.error && typeof err.error === 'object') {
            payload = err;
        } else {
            payload = new ErrorResponse();
            if (code === 401) {
                payload.error.message = 'Unauthorized';
                payload.error.errors[0].reason = 'Unauthorized';
                payload.error.errors[0].message = 'Unauthorized';
            }
        }

        if (typeof code !== 'undefined' && code !== null) {
            payload.error.code = code;
        } else if (typeof payload.error.code === 'undefined' || payload.error.code === null) {
            payload.error.code = 503;
        }

        if (!Array.isArray(payload.error.errors) || payload.error.errors.length === 0) {
            payload.error.errors = [{
                'code': payload.error.code,
                'reason': payload.error.message || 'General Error',
                'message': payload.error.message || 'General Error',
                'location': 'General Error',
                'locationType': 'General Error'
            }];
        } else if (typeof code !== 'undefined' && code !== null) {
            payload.error.errors[0].code = code;
        }

        return payload;
    };

}

module.exports = ErrorResponse;