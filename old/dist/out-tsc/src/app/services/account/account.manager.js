import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AuthManager = class AuthManager {
    constructor(router, localstorage) {
        this.router = router;
        this.localstorage = localstorage;
    }
    ;
    canActivate(route, state) {
        let now = new Date();
        let valid = true;
        let email = this.localstorage.get("email");
        let token = this.localstorage.getObject("token");
        if (!email || !token) {
            valid = false;
        }
        else {
            if (typeof (email) == "undefined") {
                valid = false;
            }
            ;
            if (typeof (token.expiry) != "undefined") {
                let expiry = new Date(token.expiry);
                if (expiry < now) {
                    valid = false;
                }
                ;
            }
            else {
                valid = false;
            }
            ;
        }
        ;
        if (valid) {
            return true;
        }
        else {
            return this.router.navigate(["/signin"]);
        }
        ;
    }
    ;
};
AuthManager = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthManager);
export { AuthManager };
//# sourceMappingURL=account.manager.js.map