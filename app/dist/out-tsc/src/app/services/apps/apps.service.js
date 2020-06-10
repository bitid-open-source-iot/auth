import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
let AppsService = class AppsService {
    constructor(api) {
        this.api = api;
        this.data = [];
    }
    ;
    add(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.post(environment.auth, '/clients/add', params);
        });
    }
    ;
    get(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.post(environment.auth, '/clients/get', params);
        });
    }
    ;
    list(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.post(environment.auth, '/clients/list', params);
        });
    }
    ;
    share(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.post(environment.auth, '/clients/share', params);
        });
    }
    ;
    update(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.post(environment.auth, '/clients/update', params);
        });
    }
    ;
    delete(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.post(environment.auth, '/clients/delete', params);
        });
    }
    ;
    unsubscribe(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.post(environment.auth, '/clients/unsubscribe', params);
        });
    }
    ;
    updatesubscriber(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.post(environment.auth, '/clients/updatesubscriber', params);
        });
    }
    ;
};
AppsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AppsService);
export { AppsService };
//# sourceMappingURL=apps.service.js.map