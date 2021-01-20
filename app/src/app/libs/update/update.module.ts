/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

/* --- SERVICES --- */
import { UpdateService } from './update.service';

/* --- COMPONENTS --- */
import { UpdateDialog } from './update.dialog';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatDialogModule
	],
	providers: [
		UpdateService
	],
	declarations: [
		UpdateDialog
	]
})

export class UpdateModule {}
