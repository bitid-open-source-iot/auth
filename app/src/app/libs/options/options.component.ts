import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Component, Inject, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'options-sheet',
	styleUrls: ['./options.component.scss'],
	templateUrl: './options.component.html',
	encapsulation: ViewEncapsulation.None
})

export class OptionsSheet {

	constructor(private sheet: MatBottomSheetRef<OptionsSheet>, @Inject(MAT_BOTTOM_SHEET_DATA) private config: any) { }
	
	public role: any[] = this.config.role;
	public title: any[] = this.config.title;
	public options: any[] = this.config.options;

	public submit(option) {
		this.sheet.dismiss(option);
	};

}
