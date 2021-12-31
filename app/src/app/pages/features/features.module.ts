/* --- PAGES --- */
import { FeaturesPage } from './features.page';
import { FeaturesEditorPage } from './editor/editor.page';

/* --- DIALOGS --- */
import { FeaturesFilterDialog } from './filter/filter.dialog';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { SearchModule } from 'src/app/libs/search/search.module';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFileModule } from 'src/app/libs/mat-file/mat-file.module';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
import { OrderPipeModule } from 'src/app/pipes/order/order.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterPipeModule } from 'src/app/pipes/filter/filter.module';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DescribePipeModule } from 'src/app/pipes/describe/describe.module';
import { MatMenuButtonModule } from 'src/app/libs/mat-menu-button/mat-menu-button.module';
import { MatBackButtonModule } from 'src/app/libs/mat-back-button/mat-back-button.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
		SearchModule,
		MatListModule,
		MatIconModule,
		MatFileModule,
		MatSortModule,
		MatInputModule,
		MatChipsModule,
		MatTableModule,
		MatFooterModule,
		MatButtonModule,
		MatSelectModule,
		OrderPipeModule,
		FlexLayoutModule,
		FilterPipeModule,
		MatContentModule,
		MatToolbarModule,
		MatFormFieldModule,
		DescribePipeModule,
		MatBackButtonModule,
		MatMenuButtonModule,
		ReactiveFormsModule,
		MatProgressBarModule,
		NgxMatSelectSearchModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		FeaturesPage,
		FeaturesEditorPage,
		FeaturesFilterDialog
	]
})

export class FeaturesPageModule { }
