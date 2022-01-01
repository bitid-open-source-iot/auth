/* --- PAGES --- */
import { SubscribersPage } from './subscribers.page';
import { SubscribersEditorPage } from './editor/editor.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { OrderPipeModule } from 'src/app/pipes/order/order.module';
import { MatAvatarModule } from 'src/app/libs/mat-avatar/mat-avatar.module';
import { MatFooterModule } from 'src/app/libs/mat-footer/mat-footer.module';
import { FilterPipeModule } from 'src/app/pipes/filter/filter.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatContentModule } from 'src/app/libs/mat-content/mat-content.module';
import { DescribePipeModule } from 'src/app/pipes/describe/describe.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBackButtonModule } from 'src/app/libs/mat-back-button/mat-back-button.module';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: ':type/:id',
		component: SubscribersPage
	},
	{
		path: ':type/:id/editor',
		component: SubscribersEditorPage
	}
];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatIconModule,
		MatTableModule,
		MatInputModule,
		MatAvatarModule,
		MatButtonModule,
		MatFooterModule,
		MatSelectModule,
		OrderPipeModule,
		FilterPipeModule,
		MatContentModule,
		MatToolbarModule,
		FlexLayoutModule,
		DescribePipeModule,
		MatFormFieldModule,
		MatBackButtonModule,
		ReactiveFormsModule,
		MatProgressBarModule,
		MatAutocompleteModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		SubscribersPage,
		SubscribersEditorPage
	]
})

export class SubscribersPageModule { }
