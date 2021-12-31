import { NgModule } from '@angular/core';
import { AuthManager } from './services/auth/auth.service';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'apps',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/apps/apps.module').then(m => m.AppsPageModule)
	},
	{
		path: 'users',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/users/users.module').then(m => m.UsersPageModule)
	},
	{
		path: 'signin',
		loadChildren: () => import('./pages/signin/signin.module').then(m => m.SignInPageModule)
	},
	{
		path: 'signup',
		loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpPageModule)
	},
	{
		path: 'groups',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/groups/groups.module').then(m => m.GroupsPageModule)
	},
	{
		path: 'scopes',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/scopes/scopes.module').then(m => m.ScopesPageModule)
	},
	{
		path: 'tokens',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/tokens/tokens.module').then(m => m.TokensPageModule)
	},
	{
		path: 'account',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/account/account.module').then(m => m.AccountPageModule)
	},
	{
		path: 'settings',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
	},
	{
		path: 'features',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/features/features.module').then(m => m.FeaturesPageModule)
	},
	{
		path: 'subscribers',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/subscribers/subscribers.module').then(m => m.SubscribersPageModule)
	},
	{
		path: 'allow-access',
		loadChildren: () => import('./pages/allow-access/allow-access.module').then(m => m.AllowAccessPageModule)
	},
	{
		path: 'verify-account',
		loadChildren: () => import('./pages/verify-account/verify-account.module').then(m => m.VerifyAccountPageModule)
	},
	{
		path: 'change-password',
		loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
	},
	{
		path: 'forgot-password',
		loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
	},
	{
		path: 'tips-and-updates',
		canActivate: [AuthManager],
		loadChildren: () => import('./pages/tips-and-updates/tips-and-updates.module').then(m => m.TipsAndUpdatesPageModule)
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
