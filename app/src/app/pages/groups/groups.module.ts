/* --- PAGES --- */
import { GroupsPage } from './groups.page';
import { GroupsEditorpage } from './editor/editor.page';
import { GroupsFilterDialog } from './filter/filter.dialog';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { UploadModule } from 'src/app/libs/upload/upload.module';
import { CommonModule } from '@angular/common';
import { MatFileModule } from 'src/app/libs/mat-file/mat-file.module';
import { MatSortModule } from '@angular/material/sort';
import { OptionsModule } from 'src/app/libs/options/options.module';
import { ConfirmModule } from 'src/app/libs/confirm/confirm.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderPipeModule } from 'src/app/pipes/order/order.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { FilterPipeModule } from 'src/app/pipes/filter/filter.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: GroupsPage
	},
	{
		path: 'editor',
		component: GroupsEditorpage
	}
];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		UploadModule,
		MatSortModule,
		OptionsModule,
		MatTabsModule,
		MatIconModule,
		MatListModule,
		MatFileModule,
		ConfirmModule,
		MatChipsModule,
		MatTableModule,
		MatInputModule,
		OrderPipeModule,
		MatDialogModule,
		MatSelectModule,
		MatRippleModule,
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
		GroupsPage,
		GroupsEditorpage,
		GroupsFilterDialog
	]
})

export class GroupsModule { }
