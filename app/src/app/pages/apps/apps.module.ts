/* --- PAGES --- */
import { AppsPage } from './apps.page';
import { AppsEditorpage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { UploadModule } from 'src/app/libs/upload/upload.module';
import { CommonModule } from '@angular/common';
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
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { FilterPipeModule } from 'src/app/pipes/filter/filter.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: AppsPage
	},
	{
		path: 'editor',
		component: AppsEditorpage
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
		ConfirmModule,
		MatChipsModule,
		MatTableModule,
		MatInputModule,
		MatSelectModule,
		MatRippleModule,
		MatButtonModule,
		MatFooterModule,
		MatContentModule,
		FlexLayoutModule,
		FilterPipeModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		NgxMatSelectSearchModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AppsPage,
		AppsEditorpage
	]
})

export class AppsModule { }
