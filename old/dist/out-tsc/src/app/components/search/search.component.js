import { __decorate } from "tslib";
import { Subject } from 'rxjs';
import { MatInput } from '@angular/material/input';
import { Input, Output, Component, ViewChild, ViewEncapsulation } from '@angular/core';
let SearchComponent = class SearchComponent {
    constructor() {
        this.value = '';
        this.color = '';
        this.change = new Subject();
        this.placeholder = '';
    }
    ;
    toggle() {
        this.value = '';
        this.active = !this.active;
        this.change.next(this.value);
        setTimeout(() => this.input.focus(), 100);
    }
    ;
    changes(value) {
        this.change.next(value);
    }
    ;
};
__decorate([
    Input('value')
], SearchComponent.prototype, "value", void 0);
__decorate([
    Input('color')
], SearchComponent.prototype, "color", void 0);
__decorate([
    Output('change')
], SearchComponent.prototype, "change", void 0);
__decorate([
    Input('placeholder')
], SearchComponent.prototype, "placeholder", void 0);
__decorate([
    ViewChild(MatInput, { 'static': true })
], SearchComponent.prototype, "input", void 0);
SearchComponent = __decorate([
    Component({
        selector: 'search',
        styleUrls: ['./search.component.scss'],
        templateUrl: './search.component.html',
        encapsulation: ViewEncapsulation.None
    })
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=search.component.js.map