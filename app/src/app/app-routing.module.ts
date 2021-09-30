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
		path: 'users',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
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
		path: 'groups',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/groups/groups.module').then(m => m.GroupsModule)
	},
	{
		path: 'scopes',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/scopes/scopes.module').then(m => m.ScopesModule)
	},
	{
		path: 'tokens',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/tokens/tokens.module').then(m => m.TokensModule)
	},
	{
		path: 'account',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
	},
	{
		path: 'settings',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
	},
	{
		path: 'features',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/features/features.module').then(m => m.FeaturesModule)
	},
	{
		path: 'subscribers',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/subscribers/subscribers.module').then(m => m.SubscribersModule)
	},
	{
		path: 'allow-access',
		loadChildren: () => import('./pages/allow-access/allow-access.module').then(m => m.AllowAccessModule)
	},
	{
		path: 'forgot-password',
		loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
	},
	{
		path: 'privacy-policy',
		loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
	},
	{
		path: 'reset-password',
		loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
	},
	{
		path: 'verify-account',
		loadChildren: () => import('./pages/verify-account/verify-account.module').then(m => m.VerifyAccountModule)
	},
	{
		path: 'tips-and-updates',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/tips-and-updates/tips-and-updates.module').then(m => m.TipsAndUpdatesModule)
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
