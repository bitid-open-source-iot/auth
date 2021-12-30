/* --- PAGES --- */
import { SettingsPage } from './settings.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuButtonModule } from 'src/app/libs/mat-menu-button/mat-menu-button.module';
import { Routes, RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: SettingsPage
	}
];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatIconModule,
		MatListModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		MatContentModule,
		MatTooltipModule,
		FlexLayoutModule,
		MatToolbarModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatMenuButtonModule,
		MatSlideToggleModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		SettingsPage
	]
})

export class SettingsPageModule { }
