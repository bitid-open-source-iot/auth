exports.ErrorResponse = class {
    constructor() {
        this.error = {
            "code": 	503,
            "message": 	"General Error",
            "errors": [{
                "code": 		503,
                "reason": 		"General Error",
                "message": 		"General Error",
                "locaction": 	"General Error",
                "locationType": "General Error"
            }]
        };
        this.hiddenErrors = [];
    };
};