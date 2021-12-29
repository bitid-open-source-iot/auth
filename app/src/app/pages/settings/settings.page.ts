import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'settings-page',
	styleUrls: ['./settings.page.scss'],
	templateUrl: './settings.page.html'
})

export class SettingsPage implements OnInit, OnDestroy {

	constructor(private buttons: ButtonsService, private service: SettingsService) { }

	public form: FormGroup = new FormGroup({
		theme: new FormControl(this.service.theme.value == 'light' ? false : true, [Validators.required]),
		notifications: new FormControl(this.service.notifications.value, [Validators.required])
	});
	public errors: any = {
		theme: '',
		notifications: ''
	};
	private observers: any = {};

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.observers.theme = this.form.controls.theme.valueChanges.subscribe(theme => {
			if (theme) {
				this.service.theme.next('dark');
			} else {
				this.service.theme.next('light');
			}
		});

		this.observers.notifications = this.form.controls.notifications.valueChanges.subscribe(notifications => {
			if (notifications) {
				this.service.notifications.next(true);
			} else {
				this.service.notifications.next(false);
			}
		});
	}

	ngOnDestroy(): void {
		this.observers.theme.unsubscribe();
		this.observers.notifications.unsubscribe();
	}

}
