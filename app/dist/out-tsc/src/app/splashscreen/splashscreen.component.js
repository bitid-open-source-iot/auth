import { __awaiter, __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
let SplashScreen = class SplashScreen {
    constructor(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
    }
    ;
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'flex');
        });
    }
    ;
    hide() {
        return __awaiter(this, void 0, void 0, function* () {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
        });
    }
    ;
};
SplashScreen = __decorate([
    Component({
        selector: 'app-splashscreen',
        styleUrls: ['./splashscreen.component.scss'],
        templateUrl: './splashscreen.component.html',
        encapsulation: ViewEncapsulation.None
    })
], SplashScreen);
export { SplashScreen };
//# sourceMappingURL=splashscreen.component.js.map