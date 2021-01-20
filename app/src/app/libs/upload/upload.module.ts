import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadDirective } from './upload.directive';

@NgModule({
	imports: [
		CommonModule
	],
	exports: [
		UploadDirective
	],
	declarations: [
		UploadDirective
	]
})

export class UploadModule {}
