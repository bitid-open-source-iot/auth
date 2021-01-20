/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* --- COMPONENTS --- */
import { MatContent } from './mat-content';

@NgModule({
	imports: [
		CommonModule
	],
	exports: [
		MatContent
	],
	declarations: [
		MatContent
	]
})

export class MatContentModule { }
