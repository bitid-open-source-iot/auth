import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
let AccountService = class AccountService {
    constructor(api, router, localstorage) {
        this.api = api;
        this.router = router;
        this.localstorage = localstorage;
        this.user = new BehaviorSubject(ACCOUNT);
        this.authenticated = new BehaviorSubject(false);
    }
    ;
    logout() {
        this.localstorage.clear();
        this.router.navigate(['/signin']);
        this.authenticated.next(false);
    }
    ;
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.api.post(environment.auth, '/users/get', {});
            if (response.ok) {
                if (typeof (response.result.profilePic) != "undefined") {
                    response.result.picture = response.result.profilePic;
                    delete response.result.profilePic;
                }
                ;
                this.user.next(response.result);
            }
            ;
            return response;
        });
    }
    ;
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
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
                this.authenticated.next(true);
                return true;
            }
            else {
                this.authenticated.next(false);
                return false;
            }
            ;
        });
    }
    ;
    login(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const authenticate = yield this.authenticate({
                'email': params.email,
                'password': params.password
            });
            if (!authenticate.ok) {
                this.authenticated.next(false);
                authenticate.error.type = "authenticate";
                return authenticate;
            }
            ;
            const allowaccess = yield this.allowaccess();
            if (allowaccess.ok) {
                this.authenticated.next(true);
                return allowaccess;
            }
            else {
                this.authenticated.next(false);
                allowaccess.error.type = "allowaccess";
                return allowaccess;
            }
            ;
        });
    }
    ;
    allowaccess() {
        return __awaiter(this, void 0, void 0, function* () {
            let expiry = new Date();
            expiry.setDate(expiry.getDate() + 1000);
            const response = yield this.api.post(environment.auth, '/auth/allowaccess', {
                'expiry': expiry,
                'scopes': environment.scopes,
                'appId': environment.appId,
                'tokenAddOn': {},
                'description': environment.appName
            });
            if (response.ok) {
                this.localstorage.setObject('token', response.result[0].token);
            }
            ;
            return response;
        });
    }
    ;
    verify(params) {
        return __awaiter(this, void 0, void 0, function* () {
            params.email = params.email;
            params.appId = environment.appId;
            params.description = environment.appName;
            this.localstorage.set('email', params.email);
            return yield this.api.put(environment.auth, '/auth/verify', params);
        });
    }
    ;
    update(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.post(environment.auth, '/users/update', params);
        });
    }
    ;
    register(params) {
        return __awaiter(this, void 0, void 0, function* () {
            params.appId = environment.appId;
            params.description = environment.appName;
            this.localstorage.set('email', params.email);
            return yield this.api.put(environment.auth, '/auth/register', params);
        });
    }
    ;
    authenticate(params) {
        return __awaiter(this, void 0, void 0, function* () {
            params.appId = environment.appId;
            params.description = environment.appName;
            this.localstorage.set('email', params.email);
            const response = yield this.api.put(environment.auth, '/auth/authenticate', params);
            if (response.ok) {
                this.localstorage.setObject('token', response.result[0].token);
            }
            ;
            return response;
        });
    }
    ;
    resetpassword(params) {
        return __awaiter(this, void 0, void 0, function* () {
            params.appId = environment.appId;
            params.description = environment.appName;
            this.localstorage.set('email', params.email);
            return yield this.api.put(environment.auth, '/auth/resetpassword', params);
        });
    }
    ;
};
AccountService = __decorate([
    Injectable()
], AccountService);
export { AccountService };
const ACCOUNT = {
    'picture': null,
    'language': null
};
//# sourceMappingURL=account.service.js.map