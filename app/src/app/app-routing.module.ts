/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { AuthManager } from './services/account/account.manager';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         'apps',
        'canActivate':  [AuthManager],
        'loadChildren': () => import('./pages/apps/apps.module').then(m => m.AppsModule)
    },
    {
        'path':         'usage',
        'canActivate':  [AuthManager],
        'loadChildren': () => import('./pages/usage/usage.module').then(m => m.UsageModule)
    },
    {
        'path':         'scopes',
        'canActivate':  [AuthManager],
        'loadChildren': () => import('./pages/scopes/scopes.module').then(m => m.ScopesModule)
    },
    {
        'path':         'tokens',
        'canActivate':  [AuthManager],
        'loadChildren': () => import('./pages/tokens/tokens.module').then(m => m.TokensModule)
    },
    {
        'path':         'account',
        'canActivate':  [AuthManager],
        'loadChildren': () => import('./pages/account/account.module').then(m => m.AccountModule)
    },
    {
        'path':         'signin',
        'loadChildren': () => import('./pages/signin/signin.module').then(m => m.SigninModule)
    },
    {
        'path':         'signup',
        'loadChildren': () => import('./pages/signup/signup.module').then(m => m.SignupModule)
    },
    {
        'path':         'verify',
        'loadChildren': () => import('./pages/verify/verify.module').then(m => m.VerifyModule)
    },
    {
        'path':         'allowaccess',
        'loadChildren': () => import('./pages/allow-access/allow-access.module').then(m => m.AllowAccessModule)
    },
    {
        'path':         '**',
        'redirectTo':   'apps'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}