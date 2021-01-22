import { ConfirmConfig } from './confirm.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'confirm-dialog',
	styleUrls: ['./confirm.dialog.scss'],
	templateUrl: './confirm.dialog.html',
	encapsulation: ViewEncapsulation.None
})

export class ConfirmDialog {

	constructor(private dialog: MatDialogRef<ConfirmDialog>, @Inject(MAT_DIALOG_DATA) private config: ConfirmConfig) { }

	public message: string = this.config.message;

	public reject() {
		this.dialog.close(false);
	}

	public confirm() {
		this.dialog.close(true);
	}

}
