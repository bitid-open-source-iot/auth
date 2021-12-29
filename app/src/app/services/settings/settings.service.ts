import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
	providedIn: 'root'
})

export class SettingsService {

	public theme: BehaviorSubject<null | string> = new BehaviorSubject<null | string>(null);

	constructor(private localstorage: LocalStorageService) {
		this.theme.subscribe(value => {
			if (typeof (value) != 'undefined' && value != null) {
				const settings = this.localstorage.getObject('settings', {
					theme: 'light'
				});
				settings.theme = value;
				if (value == 'dark') {
					document.body.classList.add('dark-mode');
				} else {
					document.body.classList.remove('dark-mode');
				}
				this.localstorage.setObject('settings', settings);
			}
		});
	}

	public async init() {
		const settings = this.localstorage.getObject('settings', {
			theme: 'light'
		});

		this.theme.next(settings.theme);

		if (settings.theme == 'dark') {
			document.body.classList.add('dark-mode');
		} else {
			document.body.classList.remove('dark-mode');
		};
	}

}
