import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { AppsPage } from './apps.page';
import { AppEditorPage } from './editor/editor.page';
import { RouterModule } from '@angular/router';
const routes = [
    {
        'path': '',
        'component': AppsPage
    },
    {
        'path': ':mode',
        'component': AppEditorPage
    },
    {
        'path': ':mode/:planId',
        'component': AppEditorPage
    }
];
let AppsRoutingModule = class AppsRoutingModule {
};
AppsRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], AppsRoutingModule);
export { AppsRoutingModule };
//# sourceMappingURL=apps-routing.module.js.map