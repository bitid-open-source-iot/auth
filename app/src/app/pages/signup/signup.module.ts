/* --- PAGES --- */
import { SignUpPage } from './signup.page';
import { TermsAndConditions } from './terms-and-conditions/terms-and-conditions.page.component';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivacyPolicy } from './privacy-policy/privacy-policy.page.component';


const routes: Routes = [
	{
		path: '',
		component: SignUpPage
	},
	{
		path: 'terms-and-conditions',
		component: TermsAndConditions
	},
	{
		path: 'privacy-policy',
		component: PrivacyPolicy
	}
];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatCardModule,
		MatInputModule,
		MatButtonModule,
		MatContentModule,
		FlexLayoutModule,
		MatCheckboxModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatProgressBarModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		SignUpPage,
  		TermsAndConditions,
    	PrivacyPolicy,
	]
})

export class SignUpPageModule { }
