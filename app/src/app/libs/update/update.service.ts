import { SwUpdate } from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { UpdateDialog } from './update.dialog';

@Injectable({
	providedIn: 'root'
})

export class UpdateService {

	constructor(private dialog: MatDialog, private readonly updates: SwUpdate) { }

	public async init() {
		this.updates.available.subscribe(async event => {
			const dialog = await this.dialog.open(UpdateDialog, {
				panelClass: 'update-dialog',
				hasBackdrop: false
			});

			dialog.afterClosed().subscribe(update => {
				if (update) {
					this.updates.activateUpdate().then(() => document.location.reload());
				}
			});
		});
	}

}
