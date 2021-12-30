/* --- PAGES --- */
import { AccountPage } from './account.page';
import { RemoveAccountPage } from './remove-account/remove-account.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
	{
		path: '',
		component: AccountPage
	},
	{
		path: 'remove-account',
		component: RemoveAccountPage
	}
];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatIconModule,
		MatMenuModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatRippleModule,
		MatContentModule,
		MatToolbarModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AccountPage,
		RemoveAccountPage
	]
})

export class AccountPageModule { }
