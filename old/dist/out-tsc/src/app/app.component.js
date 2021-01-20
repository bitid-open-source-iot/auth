import { __awaiter, __decorate } from "tslib";
import { MatSidenav } from '@angular/material/sidenav';
import { SplashScreen } from './splashscreen/splashscreen.component';
import { Component, ViewChild } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(menu, account) {
        this.menu = menu;
        this.account = account;
        this.subscriptions = {};
    }
    ;
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            this.menu.close();
            this.account.logout();
        });
    }
    ;
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.splashscreen.show();
            yield this.account.validate();
            yield this.splashscreen.hide();
        });
    }
    ;
    ngOnInit() {
        this.menu.init(this.sidemenu);
        this.subscriptions.authenticated = this.account.authenticated.subscribe((authenticated) => __awaiter(this, void 0, void 0, function* () {
            this.authenticated = authenticated;
            if (authenticated) {
                //
            }
            ;
        }));
        this.initialize();
    }
    ;
    ngOnDestroy() {
        this.subscriptions.authenticated.unsubscribe();
    }
    ;
};
__decorate([
    ViewChild(MatSidenav, { 'static': true })
], AppComponent.prototype, "sidemenu", void 0);
__decorate([
    ViewChild(SplashScreen, { 'static': true })
], AppComponent.prototype, "splashscreen", void 0);
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        styleUrls: ['./app.component.scss'],
        templateUrl: './app.component.html'
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map