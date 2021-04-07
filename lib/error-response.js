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
    };

}

module.exports = ErrorResponse;