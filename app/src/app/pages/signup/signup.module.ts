/* --- PAGES --- */
import { SignUpPage } from './signup.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: SignUpPage
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
		MatTooltipModule,
		FlexLayoutModule,
		MatToolbarModule,
		MatContentModule,
		MatCheckboxModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatSlideToggleModule,
		MatProgressSpinnerModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		SignUpPage
	]
})

export class SignUpModule { }
