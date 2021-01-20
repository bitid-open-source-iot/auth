import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { SigninPage } from './signin.page';
import { RouterModule } from '@angular/router';
const routes = [
    {
        'path': '',
        'component': SigninPage
    }
];
let SigninRoutingModule = class SigninRoutingModule {
};
SigninRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], SigninRoutingModule);
export { SigninRoutingModule };
//# sourceMappingURL=signin-routing.module.js.map