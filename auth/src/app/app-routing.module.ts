import { NgModule } from '@angular/core';
import { AuthManager } from './services/auth/auth.service';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'apps',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/apps/apps.module').then(m => m.AppsModule)
	},
	{
		path: 'signin',
		loadChildren: () => import('./pages/signin/signin.module').then(m => m.SignInModule)
	},
	{
		path: 'signup',
		loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
	},
	{
		path: 'settings',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
	},
	{
		path: 'allow-access',
		loadChildren: () => import('./pages/allow-access/allow-access.module').then(m => m.AllowAccessModule)
	},
	{
		path: 'privacy-policy',
		loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
	},
	{
		path: 'verify-account',
		loadChildren: () => import('./pages/verify-account/verify-account.module').then(m => m.VerifyAccountModule)
	},
	{
		path: 'terms-and-conditions',
		loadChildren: () => import('./pages/terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsModule)
	},
	{
		path: '**',
		redirectTo: 'apps'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
