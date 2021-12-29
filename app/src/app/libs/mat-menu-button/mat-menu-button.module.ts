/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

/* --- COMPONENTS --- */
import { MatMenuButton } from './mat-menu-button';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		MatBadgeModule,
		MatButtonModule
	],
	exports: [
		MatMenuButton
	],
	declarations: [
		MatMenuButton
	]
})

export class MatMenuButtonModule { }
