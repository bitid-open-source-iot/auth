/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* --- COMPONENTS --- */
import { MatFooter } from './mat-footer';

@NgModule({
	imports: [
		CommonModule
	],
	exports: [
		MatFooter
	],
	declarations: [
		MatFooter
	]
})

export class MatFooterModule { }
