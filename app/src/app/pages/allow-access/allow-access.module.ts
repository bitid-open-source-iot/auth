/* --- PAGES --- */
import { AllowAccessPage } from './allow-access.page';

/* --- DIALOGS --- */
import { AcceptDialog } from './accept/accept.dialog';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { BackButtonModule } from 'src/app/libs/back-button/back-button.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: AllowAccessPage
	}
];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatIconModule,
		MatInputModule,
		MatFooterModule,
		MatButtonModule,
		MatSelectModule,
		MatToolbarModule,
		MatContentModule,
		BackButtonModule,
		MatToolbarModule,
		MatCheckboxModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatProgressSpinnerModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AcceptDialog,
		AllowAccessPage
	]
})

export class AllowAccessModule { }
