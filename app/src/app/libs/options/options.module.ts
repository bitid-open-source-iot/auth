/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

/* --- SERVICES --- */
import { OptionsService } from './options.service';

/* --- COMPONENTS --- */
import { OptionsSheet } from './options.component';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		MatListModule,
		MatRippleModule,
		MatFormFieldModule,
		MatBottomSheetModule
	],
	providers: [
		OptionsService
	],
	declarations: [
		OptionsSheet
	]
})

export class OptionsModule { }
