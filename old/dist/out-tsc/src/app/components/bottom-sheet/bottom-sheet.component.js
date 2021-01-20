import { __decorate, __param } from "tslib";
import { Inject, Component } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
let BottomSheetComponent = class BottomSheetComponent {
    constructor(sheet, data) {
        this.sheet = sheet;
        this.data = data;
        this.options = [];
    }
    ;
    submit(optionsId) {
        this.sheet.dismiss(optionsId);
    }
    ;
    ngOnInit() {
        this.title = this.data.title;
        this.options = this.data.options.map(option => {
            if (option.disabled.indexOf(this.data.role) > -1) {
                option.disabled = true;
            }
            else {
                option.disabled = false;
            }
            ;
            return option;
        });
    }
    ;
    ngOnDestroy() { }
    ;
};
BottomSheetComponent = __decorate([
    Component({
        selector: 'app-bottom-sheet',
        styleUrls: ['./bottom-sheet.component.scss'],
        templateUrl: './bottom-sheet.component.html'
    }),
    __param(1, Inject(MAT_BOTTOM_SHEET_DATA))
], BottomSheetComponent);
export { BottomSheetComponent };
//# sourceMappingURL=bottom-sheet.component.js.map