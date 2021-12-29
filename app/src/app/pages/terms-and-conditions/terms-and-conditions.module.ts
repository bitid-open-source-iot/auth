/* --- PAGES --- */
import { TermsAndConditionsPage } from './terms-and-conditions.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TermsAndConditionsPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		TermsAndConditionsPage
	]
})

export class TermsAndConditionsPageModule { }
