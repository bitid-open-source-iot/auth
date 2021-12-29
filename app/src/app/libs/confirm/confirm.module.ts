/* --- MODULES ---*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* --- SERVICES ---*/
import { ConfirmService } from './confirm.service';

/* --- COMPONENTS ---*/
import { ConfirmDialog } from './confirm.dialog';

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		MatIconModule,
		MatSelectModule,
		MatDialogModule,
		MatButtonModule,
		MatToolbarModule,
		MatFormFieldModule,
		ReactiveFormsModule
	],
	providers: [
		ConfirmService
	],
	declarations: [
		ConfirmDialog
	]
})

export class ConfirmModule { }
