/* --- PAGES --- */
import { SubscribersPage } from './subscribers.page';

/* --- DIALOGS --- */
import { SubscribersEditorDialog } from './editor/editor.dialog';

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
import { MatDialogModule } from '@angular/material/dialog';
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
	}
];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatIconModule,
		MatTableModule,
		MatInputModule,
		MatDialogModule,
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
		SubscribersEditorDialog
	]
})

export class SubscribersPageModule { }
