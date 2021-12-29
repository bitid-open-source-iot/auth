import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/* --- SERVICES --- */
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
	selector: 'settings-page',
	styleUrls: ['./settings.page.scss'],
	templateUrl: './settings.page.html'
})

export class SettingsPage implements OnInit, OnDestroy {

	constructor(private service: SettingsService) { }

	public form: FormGroup = new FormGroup({
		theme: new FormControl(this.service.theme.value == 'light' ? false : true, [Validators.required])
	});
	public errors: any = {
		theme: ''
	};
	private observers: any = {};

	ngOnInit(): void {
		this.observers.theme = this.form.controls['theme'].valueChanges.subscribe(theme => {
			if (theme) {
				this.service.theme.next('dark');
			} else {
				this.service.theme.next('light');
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.theme.unsubscribe();
	}

}
