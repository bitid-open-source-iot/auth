import { __decorate } from "tslib";
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
let MenuService = class MenuService {
    constructor(localstorage) {
        this.localstorage = localstorage;
        this.change = new Subject();
    }
    ;
    init(menu) {
        this.menu = menu;
    }
    ;
    close() {
        this.menu.close();
    }
    ;
    toggle() {
        this.menu.toggle();
    }
    ;
};
MenuService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MenuService);
export { MenuService };
//# sourceMappingURL=menu.service.js.map