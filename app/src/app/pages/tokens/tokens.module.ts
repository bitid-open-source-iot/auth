/* --- PAGES --- */
import { TokensPage } from './tokens.page';
import { ViewTokenPage } from './view/view.page';
import { GenerateTokenPage } from './generate/generate.page';

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
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
import { MatSelectModule } from '@angular/material/select';
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
		component: TokensPage
	},
	{
		path: 'view',
		component: ViewTokenPage
	},
	{
		path: 'generate',
		component: GenerateTokenPage
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
		ClipboardModule,
		MatFooterModule,
		MatSelectModule,
		MatRippleModule,
		MatButtonModule,
		FlexLayoutModule,
		FilterPipeModule,
		MatContentModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		NgxMatSelectSearchModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		TokensPage,
		ViewTokenPage,
		GenerateTokenPage
	]
})

export class TokensModule { }
