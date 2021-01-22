/* --- PAGES --- */
import { UsersPage } from './users.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { FilterPipeModule } from 'src/app/pipes/filter/filter.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: UsersPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		MatListModule,
		MatSortModule,
		MatTableModule,
		MatRippleModule,
		MatButtonModule,
		MatFooterModule,
		MatContentModule,
		FlexLayoutModule,
		FilterPipeModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		UsersPage
	]
})

export class UsersModule { }
