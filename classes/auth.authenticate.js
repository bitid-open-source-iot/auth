const Winder = require("./winder");

class AuthAuthenticate extends Winder {

    constructor(args) {
        super();
        this.email = null;
        this.expiry = Date.now() + 31 * 24 * 60 * 60 * 1000;
        this.password = null;
        if (typeof(args) != 'undefined' && args != null) {
            if (typeof(args.header) != 'undefined' && args.header != null) {
                if (typeof(args.header.email) != 'undefined' && args.header.email != null) {
                    this.email = args.header.email;
                };
            };
            if (typeof(args.expiry) != 'undefined' && args.expiry != null) {
                this.expiry = args.expiry;
            };
            if (typeof(args.password) != 'undefined' && args.password != null) {
                this.password = args.password;
            };
        };
    }

}

module.exports = AuthAuthenticate;