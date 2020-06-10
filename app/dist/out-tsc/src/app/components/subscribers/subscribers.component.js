import { __awaiter, __decorate, __param } from "tslib";
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { Inject, Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
let SubscribersComponent = class SubscribersComponent {
    constructor(toast, dialog, config, localstorage) {
        this.toast = toast;
        this.dialog = dialog;
        this.config = config;
        this.localstorage = localstorage;
        this.role = 0;
        this.email = this.localstorage.get('email');
        this.roles = environment.roles;
        this.users = new MatTableDataSource();
        this.columns = ['email', 'role', 'remove'];
    }
    ;
    close() {
        this.dialog.close();
    }
    ;
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = true;
            let params = {
                'filter': [
                    'role',
                    'users'
                ]
            };
            switch (this.config.type) {
                case ('app'):
                    params.appId = this.config.id;
                    break;
            }
            ;
            const response = yield this.config.service.get(params);
            this.loading = false;
            if (response.ok) {
                this.role = response.result.role;
                if (this.role < 4) {
                    this.close();
                    this.toast.error('insufficient role');
                }
                else {
                    this.role = response.result.role;
                    this.users.data = response.result.users;
                }
                ;
            }
            else {
                this.toast.error('issue loading users');
            }
            ;
        });
    }
    ;
    unsubscribe(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = true;
            let params = {
                'email': email
            };
            switch (this.config.type) {
                case ('app'):
                    params.appId = this.config.id;
                    break;
            }
            ;
            const response = yield this.config.service.unsubscribe(params);
            this.loading = false;
            if (response.ok) {
                for (let i = 0; i < this.users.data.length; i++) {
                    if (this.users.data[i].email == email) {
                        this.users.data.splice(i, 1);
                        break;
                    }
                    ;
                }
                ;
                this.users.data = JSON.parse(JSON.stringify(this.users.data));
                this.toast.success('user was unsubscribed');
            }
            else {
                this.toast.error('issue unsubscribing user');
            }
            ;
        });
    }
    ;
    updatesubscriber(email, role) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = true;
            let params = {
                'role': role.value,
                'email': email
            };
            switch (this.config.type) {
                case ('app'):
                    params.appId = this.config.id;
                    break;
            }
            ;
            const response = yield this.config.service.get(params);
            this.loading = false;
            if (response.ok) {
                this.toast.success('user role updated');
            }
            else {
                this.toast.error('issue updating user role');
            }
            ;
        });
    }
    ;
    ngOnInit() {
        this.get();
    }
    ;
};
SubscribersComponent = __decorate([
    Component({
        selector: 'app-subscribers',
        styleUrls: ['./subscribers.component.scss'],
        templateUrl: './subscribers.component.html'
    }),
    __param(2, Inject(MAT_DIALOG_DATA))
], SubscribersComponent);
export { SubscribersComponent };
//# sourceMappingURL=subscribers.component.js.map