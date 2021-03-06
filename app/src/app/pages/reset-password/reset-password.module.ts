import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BackButtonModule } from 'src/app/libs/back-button/back-button.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { ResetPasswordPage } from './reset-password.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: ResetPasswordPage
	}
];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatIconModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		MatContentModule,
		MatContentModule,
		MatToolbarModule,
		FlexLayoutModule,
		BackButtonModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatProgressSpinnerModule,
		RouterModule.forChild(routes)
	],
	declarations: [ResetPasswordPage]
})

export class ResetPasswordModule { }
