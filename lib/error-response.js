exports.ErrorResponse = () => {
    return {
        "error": {
            "code": 	401,
            "message": 	"General Error",
            "errors": [{
                "code": 		401,
                "reason": 		"General Error",
                "message": 		"General Error",
                "locaction": 	"general",
                "locationType": "body"
            }]
        }
    };
};