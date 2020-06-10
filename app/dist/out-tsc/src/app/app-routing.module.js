import { __decorate } from "tslib";
/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { AuthManager } from './services/account/account.manager';
import { RouterModule } from '@angular/router';
const routes = [
    {
        'path': 'apps',
        'canActivate': [AuthManager],
        'loadChildren': () => import('./pages/apps/apps.module').then(m => m.AppsModule)
    },
    {
        'path': 'signin',
        'loadChildren': () => import('./pages/signin/signin.module').then(m => m.SigninModule)
    },
    {
        'path': '**',
        'redirectTo': 'apps'
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map