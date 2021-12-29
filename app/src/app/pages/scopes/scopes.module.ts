/* --- PAGES --- */
import { ScopesPage } from './scopes.page';
import { ScopesEditorPage } from './editor/editor.page';
import { ScopesFilterDialog } from './filter/filter.dialog';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ConfirmModule } from 'src/app/libs/confirm/confirm.module';
import { OptionsModule } from 'src/app/libs/options/options.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
import { OrderPipeModule } from 'src/app/pipes/order/order.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { FilterPipeModule } from 'src/app/pipes/filter/filter.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: ScopesPage
	},
	{
		path: 'editor',
		component: ScopesEditorPage
	}
];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		ConfirmModule,
		MatTabsModule,
		MatIconModule,
		MatListModule,
		OptionsModule,
		MatSortModule,
		MatChipsModule,
		MatTableModule,
		MatInputModule,
		MatDialogModule,
		OrderPipeModule,
		MatRippleModule,
		MatSelectModule,
		MatButtonModule,
		MatFooterModule,
		MatToolbarModule,
		MatContentModule,
		FlexLayoutModule,
		FilterPipeModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatProgressBarModule,
		NgxMatSelectSearchModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		ScopesPage,
		ScopesEditorPage,
		ScopesFilterDialog
	]
})

export class ScopesPageModule { }
