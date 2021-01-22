import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { ConfirmDialog } from './confirm.dialog';

@Injectable({
	providedIn: 'root'
})

export class ConfirmService {

	constructor(private dialog: MatDialog) { }

	public async show(config: ConfirmConfig) {
		const dialog = await this.dialog.open(ConfirmDialog, {
			data: config,
			panelClass: 'confirm-dialog'
		});

		dialog.afterClosed().subscribe(result => {
			if (result && config.handler) {
				config.handler();
			}
		});
	}

}

export interface ConfirmConfig {
	'message': string;
	'handler': Function;
}
