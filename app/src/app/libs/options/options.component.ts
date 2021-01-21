import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Inject, OnInit, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'options-sheet',
	styleUrls: ['./options.component.scss'],
	templateUrl: './options.component.html',
	encapsulation: ViewEncapsulation.None
})

export class OptionsSheet implements OnInit {

	constructor(private sheet: MatBottomSheetRef<OptionsSheet>, @Inject(MAT_BOTTOM_SHEET_DATA) private config: any) { }

	public title: any[] = this.config.title;
	public options: any[] = this.config.options;

	public submit(option) {
		this.sheet.dismiss(option);
	}

	ngOnInit(): void {
		this.options.map(option => {
			if (!option.disabled.includes(this.config.role)) {
				option.disabled = false;
			} else {
				option.disabled = true;
			}
		});
	}

}
