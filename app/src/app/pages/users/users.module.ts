/* --- PAGES --- */
import { UsersPage } from './users.page';
import { UsersFilterDialog } from './filter/filter.dialog';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { FilterPipeModule } from 'src/app/pipes/filter/filter.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: UsersPage
	}
];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatIconModule,
		MatListModule,
		MatSortModule,
		MatTableModule,
		MatChipsModule,
		MatDialogModule,
		MatRippleModule,
		MatButtonModule,
		MatFooterModule,
		MatSelectModule,
		MatContentModule,
		FlexLayoutModule,
		FilterPipeModule,
		MatToolbarModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatProgressBarModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		UsersPage,
		UsersFilterDialog
	]
})

export class UsersModule { }
