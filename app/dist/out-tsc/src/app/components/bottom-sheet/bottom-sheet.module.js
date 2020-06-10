import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { BottomSheetComponent } from './bottom-sheet.component';
let BottomSheetModule = class BottomSheetModule {
};
BottomSheetModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            MatIconModule,
            MatRippleModule
        ],
        declarations: [
            BottomSheetComponent
        ]
    })
], BottomSheetModule);
export { BottomSheetModule };
//# sourceMappingURL=bottom-sheet.module.js.map