/* --- PAGES --- */
import { TokensPage } from './tokens.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TokensPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		MatTabsModule,
		MatIconModule,
		MatListModule,
		MatTableModule,
		MatRippleModule,
		MatButtonModule,
		MatContentModule,
		FlexLayoutModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		TokensPage
	]
})

export class TokensModule { }
