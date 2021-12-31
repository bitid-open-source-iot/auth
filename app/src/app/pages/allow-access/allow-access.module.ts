/* --- PAGES --- */
import { AllowAccessPage } from './allow-access.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const routes: Routes = [
	{
		path: '',
		component: AllowAccessPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		MatToolbarModule,
		MatContentModule,
		FlexLayoutModule,
		MatProgressBarModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AllowAccessPage
	]
})

export class AllowAccessPageModule { }
