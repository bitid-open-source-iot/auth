import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
	providedIn: 'root'
})

export class SettingsService {

	public theme: BehaviorSubject<string> = new BehaviorSubject<string>(null);
	public notifications: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

	constructor(private localstorage: LocalstorageService) {
		this.theme.subscribe(value => {
			if (typeof (value) != 'undefined' && value !== null) {
				const settings = this.localstorage.getObject('settings', {
					theme: 'light',
					notifications: false
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
		this.notifications.subscribe(value => {
			if (typeof (value) != 'undefined' && value !== null) {
				const settings = this.localstorage.getObject('settings', {
					theme: 'light',
					notifications: false
				});
				settings.notifications = value;
				if (value) {
					Notification.requestPermission((status) => {
						new Notification('Hey!', {
							body: 'You enabled notifications!'
						});
					});
				}
				this.localstorage.setObject('settings', settings);
			}
		});
	}

	public async init() {
		const settings = this.localstorage.getObject('settings', {
			theme: 'light',
			notifications: false
		});

		this.theme.next(settings.theme);
		this.notifications.next(settings.notifications);

		if (settings.notifications) {
			Notification.requestPermission((status) => {
				if (status == 'granted') {
					new Notification('Hey!', {
						body: 'You enabled notifications!'
					});
				}
			});
		}

		if (settings.theme == 'dark') {
			document.body.classList.add('dark-mode');
		} else {
			document.body.classList.remove('dark-mode');
		}
	}

}
