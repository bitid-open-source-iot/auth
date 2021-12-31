/* --- PAGES --- */
import { SubscribersPage } from './subscribers.page';

/* --- DIALOGS --- */
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
import { OrderPipeModule } from 'src/app/pipes/order/order.module';
import { FilterPipeModule } from 'src/app/pipes/filter/filter.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { DescribePipeModule } from 'src/app/pipes/describe/describe.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBackButtonModule } from 'src/app/libs/mat-back-button/mat-back-button.module';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: ':type/:id',
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
		OrderPipeModule,
		FilterPipeModule,
		MatContentModule,
		MatToolbarModule,
		FlexLayoutModule,
		DescribePipeModule,
		MatFormFieldModule,
		MatBackButtonModule,
		ReactiveFormsModule,
		MatProgressBarModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		SubscribersPage,
		UserEditorDialog
	]
})

export class SubscribersPageModule { }
