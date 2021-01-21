/* --- PAGES --- */
import { ScopesPage } from './scopes.page';
import { ScopesEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ConfirmModule } from 'src/app/libs/confirm/confirm.module';
import { OptionsModule } from 'src/app/libs/options/options.module';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
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
		MatTableModule,
		MatInputModule,
		MatRippleModule,
		MatSelectModule,
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
		ScopesPage,
		ScopesEditorPage
	]
})

export class ScopesModule { }
