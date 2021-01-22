/* --- PAGES --- */
import { FeaturesPage } from './features.page';
import { FeaturesEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { OptionsModule } from 'src/app/libs/options/options.module';
import { ConfirmModule } from 'src/app/libs/confirm/confirm.module';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
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
		component: FeaturesPage
	},
	{
		path: 'editor',
		component: FeaturesEditorPage
	}
];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		ConfirmModule,
		MatTabsModule,
		MatIconModule,
		MatSortModule,
		MatListModule,
		OptionsModule,
		MatTableModule,
		MatInputModule,
		MatFooterModule,
		MatRippleModule,
		MatButtonModule,
		MatSelectModule,
		FlexLayoutModule,
		MatContentModule,
		FilterPipeModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		NgxMatSelectSearchModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		FeaturesPage,
		FeaturesEditorPage
	]
})

export class FeaturesModule { }
