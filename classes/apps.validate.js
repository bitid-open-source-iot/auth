const Winder = require("./winder");

class AppsValidate extends Winder {

    constructor(args) {
        super();
        this.appId = null;
        if (typeof(args) != 'undefined' && args != null) {
            if (typeof(args.header) != 'undefined' && args.header != null) {
                if (typeof(args.header.appId) != 'undefined' && args.header.appId != null) {
                    this.appId = args.header.appId;
                };
            };
        };
    }

}

module.exports = AppsValidate;