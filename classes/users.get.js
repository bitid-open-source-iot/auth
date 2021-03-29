const Winder = require("./winder");

class UsersGet extends Winder {

    constructor(args) {
        super();
        this.email = null;
        if (typeof(args) != 'undefined' && args != null) {
            if (typeof(args.header) != 'undefined' && args.header != null) {
                if (typeof(args.header.email) != 'undefined' && args.header.email != null) {
                    this.email = args.header.email;
                };
            };
        };
    }

}

module.exports = UsersGet;