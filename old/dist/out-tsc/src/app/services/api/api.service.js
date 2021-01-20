import { __awaiter, __decorate } from "tslib";
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
let ApiService = class ApiService {
    constructor(http, router, localstorage) {
        this.http = http;
        this.router = router;
        this.localstorage = localstorage;
    }
    put(url, endpoint, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.email = this.localstorage.get('email');
            if (!this.email || typeof (this.email) == "undefined") {
                this.localstorage.clear();
                this.router.navigate(['/signin']);
            }
            ;
            const options = {
                'headers': new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };
            payload.header = {
                'email': this.email,
                'appId': environment.appId
            };
            return yield this.http.put(url + endpoint, payload, options)
                .toPromise()
                .then(response => {
                return {
                    'ok': true,
                    'result': response
                };
            })
                .catch(error => {
                return this.error(error);
            });
        });
    }
    ;
    post(url, endpoint, payload, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            this.email = this.localstorage.get('email');
            this.token = this.localstorage.get('token');
            if (typeof (this.token) == "undefined" || (typeof (this.email) == "undefined")) {
                this.localstorage.clear();
                this.router.navigate(['/signin']);
            }
            ;
            const options = {
                'headers': new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': this.token
                })
            };
            payload.header = {
                'email': this.email,
                'appId': environment.appId
            };
            return yield this.http.post(url + endpoint, payload, options)
                .toPromise()
                .then(response => {
                return {
                    'ok': true,
                    'result': response
                };
            })
                .catch(error => {
                return this.error(error);
            });
        });
    }
    ;
    error(error) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error.error) {
                if (error.error.errors) {
                    error.error = error.error.errors[0];
                    if (error.code == 401) {
                        this.localstorage.clear();
                        this.router.navigate(['/signin']);
                    }
                    ;
                    return error;
                }
                else {
                    return error;
                }
                ;
            }
            else {
                return error;
            }
            ;
        });
    }
    ;
};
ApiService = __decorate([
    Injectable()
], ApiService);
export { ApiService };
//# sourceMappingURL=api.service.js.map