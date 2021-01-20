import { SettingsService } from 'src/app/services/settings/settings.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'settings-page',
	styleUrls: ['./settings.page.scss'],
	templateUrl: './settings.page.html'
})

export class SettingsPage implements OnInit, OnDestroy {

	constructor(private service: SettingsService) { }

	public form: FormGroup = new FormGroup({
		theme: new FormControl(this.service.theme.value == 'light' ? false : true, [Validators.required]),
		notifications: new FormControl(this.service.notifications.value, [Validators.required])
	});
	public errors: any = {
		theme: '',
		notifications: ''
	};
	private subscriptions: any = {};

	ngOnInit(): void {
		this.subscriptions.theme = this.form.controls.theme.valueChanges.subscribe(theme => {
			if (theme) {
				this.service.theme.next('dark');
			} else {
				this.service.theme.next('light');
			}
		});

		this.subscriptions.notifications = this.form.controls.notifications.valueChanges.subscribe(notifications => {
			if (notifications) {
				this.service.notifications.next(true);
			} else {
				this.service.notifications.next(false);
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.theme.unsubscribe();
		this.subscriptions.notifications.unsubscribe();
	}

}
