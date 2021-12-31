/* --- PAGES --- */
import { AccountPage } from './account.page';
import { AccountRemovePage } from './remove/remove.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFileModule } from 'src/app/libs/mat-file/mat-file.module';
import { MatInputModule } from '@angular/material/input';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuButtonModule } from 'src/app/libs/mat-menu-button/mat-menu-button.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
	{
		path: '',
		component: AccountPage
	},
	{
		path: 'remove',
		component: AccountRemovePage
	}
];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatFileModule,
		MatInputModule,
		MatFooterModule,
		MatButtonModule,
		MatToolbarModule,
		MatContentModule,
		FlexLayoutModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatMenuButtonModule,
		MatProgressBarModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AccountPage,
		AccountRemovePage
	]
})

export class AccountPageModule { }
