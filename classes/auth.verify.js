const Winder = require("./winder");

class AuthVerify extends Winder {

    constructor(args) {
        super();
        this.code = null;
        this.email = null;
        if (typeof(args) != 'undefined' && args != null) {
            if (typeof(args.header) != 'undefined' && args.header != null) {
                if (typeof(args.header.email) != 'undefined' && args.header.email != null) {
                    this.email = args.header.email;
                };
            };
            if (typeof(args.code) != 'undefined' && args.code != null) {
                this.code = args.code;
            };
        };
    }

}

module.exports = AuthVerify;