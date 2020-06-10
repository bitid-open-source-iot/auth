import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { OrderPipe } from './order.pipe';
import { CommonModule } from '@angular/common';
let OrderPipeModule = class OrderPipeModule {
};
OrderPipeModule = __decorate([
    NgModule({
        imports: [
            CommonModule
        ],
        exports: [
            OrderPipe
        ],
        declarations: [
            OrderPipe
        ]
    })
], OrderPipeModule);
export { OrderPipeModule };
//# sourceMappingURL=order.module.js.map