/* --- PAGES --- */
import { TokensPage } from './tokens.page';
import { TokensViewerPage } from './viewer/viewer.page';
import { TokensGeneratePage } from './generate/generate.page';

/* --- DIALOGS --- */
import { TokensFilterDialog } from './filter/filter.dialog';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
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
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderPipeModule } from 'src/app/pipes/order/order.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { FilterPipeModule } from 'src/app/pipes/filter/filter.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: TokensPage
	},
	{
		path: 'view',
		component: TokensViewerPage
	},
	{
		path: 'generate',
		component: TokensGeneratePage
	}
];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatSortModule,
		OptionsModule,
		ConfirmModule,
		MatTabsModule,
		MatIconModule,
		MatListModule,
		MatTableModule,
		MatInputModule,
		MatChipsModule,
		OrderPipeModule,
		MatDialogModule,
		ClipboardModule,
		MatFooterModule,
		MatSelectModule,
		MatRippleModule,
		MatButtonModule,
		MatTooltipModule,
		MatToolbarModule,
		FlexLayoutModule,
		FilterPipeModule,
		MatContentModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatProgressBarModule,
		NgxMatSelectSearchModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		TokensPage,
		TokensViewerPage,
		TokensGeneratePage,
		TokensFilterDialog
	]
})

export class TokensPageModule { }
