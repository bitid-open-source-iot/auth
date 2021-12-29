/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

/* --- COMPONENTS --- */
import { MatBackButton } from './mat-back-button';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		MatBadgeModule,
		MatButtonModule
	],
	exports: [
		MatBackButton
	],
	declarations: [
		MatBackButton
	]
})

export class MatBackButtonModule { }
