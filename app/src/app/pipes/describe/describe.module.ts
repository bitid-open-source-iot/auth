/* --- PIPES --- */
import { DescribePipe } from './describe.pipe';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule
	],
	exports: [
		DescribePipe
	],
	declarations: [
		DescribePipe
	]
})

export class DescribePipeModule { }
