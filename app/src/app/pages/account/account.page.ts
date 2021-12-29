import { ToastService } from 'src/app/services/toast/toast.service';
import { AccountService } from 'src/app/services/account/account.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'account-page',
	styleUrls: ['./account.page.scss'],
	templateUrl: './account.page.html'
})

export class AccountPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private service: AccountService) { }

	public form: FormGroup = new FormGroup({
		name: new FormGroup({
			last: new FormControl(null, [Validators.required]),
			first: new FormControl(null, [Validators.required])
		}),
		picture: new FormControl(null, [Validators.required]),
		username: new FormControl(null, [Validators.required])
	});
	public errors: any = {
		name: {
			last: '',
			first: ''
		},
		picture: '',
		username: ''
	};
	public loading: boolean = false;
	private observers: any = {};

	public async submit() {
		this.loading = true;

		const response = await this.service.update({
			name: {
				last: this.form.value.name.last,
				first: this.form.value.name.first
			},
			picture: this.form.value.picture,
			username: this.form.value.username
		});

		this.loading = false;

		if (response.ok) {
			this.toast.show('Account was updated!');
		} else {
			this.toast.show('Issue updating account!');
		}
	}

	public async upload(src) {
		this.form.controls.picture.setValue(src);
	}

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.observers.user = this.service.user.subscribe(user => {
			if (typeof (user) != 'undefined' && user != null) {
				this.form.controls.picture.setValue(user.picture);
				this.form.controls.username.setValue(user.username);
				if (typeof (user.name) != 'undefined' && user.name != null) {
					(this.form.controls.name as FormGroup).controls.last.setValue(user.name.last);
					(this.form.controls.name as FormGroup).controls.first.setValue(user.name.first);
				}
			}
		});
	}

	ngOnDestroy(): void {
		this.observers.user.unsubscribe();
	}

}
