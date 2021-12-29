/* --- PAGES --- */
import { SubscribersPage } from './subscribers.page';
import { UserEditorDialog } from './editor/editor.dialog';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: SubscribersPage
	}
];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatTabsModule,
		MatIconModule,
		MatListModule,
		MatTableModule,
		MatInputModule,
		MatRippleModule,
		MatDialogModule,
		MatButtonModule,
		MatSelectModule,
		MatContentModule,
		MatToolbarModule,
		FlexLayoutModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		SubscribersPage,
		UserEditorDialog
	]
})

export class SubscribersPageModule { }
