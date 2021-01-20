import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ToastService = class ToastService {
    constructor(snackbar) {
        this.snackbar = snackbar;
    }
    ;
    error(message, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.snackbar.open(message, null, {
                'duration': duration || 3000,
                'panelClass': 'toast-error'
            });
        });
    }
    ;
    success(message, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.snackbar.open(message, null, {
                'duration': duration || 3000,
                'panelClass': 'toast-success'
            });
        });
    }
    ;
};
ToastService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ToastService);
export { ToastService };
//# sourceMappingURL=toast.service.js.map