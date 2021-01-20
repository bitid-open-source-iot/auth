import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'update-dialog',
	styleUrls: ['./update.dialog.scss'],
	templateUrl: './update.dialog.html',
	encapsulation: ViewEncapsulation.None
})

export class UpdateDialog {

	constructor(private dialog: MatDialogRef<UpdateDialog>) { }

	public update() {
		this.dialog.close(true);
	}

}
