import { Component } from '@angular/core';

@Component({
	selector: 'mat-back-button',
	styleUrls: ['./mat-back-button.scss'],
	templateUrl: './mat-back-button.html'
})

export class MatBackButton {

	constructor() { }

	public back() {
		window.history.back()
	}


}
