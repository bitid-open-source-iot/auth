/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

/* --- COMPONENTS --- */
import { MatVersion } from './mat-version';

@NgModule({
	imports: [
		CommonModule,
		MatIconModule,
		MatBadgeModule,
		MatButtonModule,
		MatRippleModule
	],
	exports: [
		MatVersion
	],
	declarations: [
		MatVersion
	]
})

export class MatVersionModule { }
