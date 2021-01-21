import { Injectable } from '@angular/core';
import { OptionsSheet } from './options.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Injectable({
	providedIn: 'root'
})

export class OptionsService {

	constructor(private sheet: MatBottomSheet) { }

	public show(config: CONFIG) {
		this.sheet.open(OptionsSheet, {
			data: config,
			panelClass: 'options-sheet'
		}).afterDismissed().subscribe(result => {
			if (result && result.handler) {
				result.handler();
			}
		});
	}

}

interface CONFIG {
	'role': number;
	'title': string;
	'options': OPTION[];
}

interface OPTION {
	'icon'?: string;
	'title'?: string;
	'danger'?: boolean;
	'handler'?: Function;
	'disabled': number[];
}
