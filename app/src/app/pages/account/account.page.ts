import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/* --- SERVICES --- */
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { AccountService } from 'src/app/services/account/account.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

/* --- ENVIRONMENT --- */
import { environment } from 'src/environments/environment';

@Component({
	selector: 'account-page',
	styleUrls: ['./account.page.scss'],
	templateUrl: './account.page.html'
})

export class AccountPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private config: ConfigService, private service: AccountService, private localstorage: LocalStorageService) { }

	public form: FormGroup = new FormGroup({
		name: new FormGroup({
			last: new FormControl(null, [Validators.required]),
			first: new FormControl(null, [Validators.required])
		}),
		picture: new FormControl(null, [Validators.required]),
		username: new FormControl(null, [Validators.required])
	});
	public appId: string = environment.appId;
	public userId: string | undefined;
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

		if (response.ok) {
			this.toast.show('Account was updated!');
		} else {
			this.toast.show('Issue updating account!');
		};

		this.loading = false;
	}

	ngOnInit(): void {
		this.observers.user = this.service.user.subscribe(user => {
			if (typeof (user) != 'undefined' && user != null) {
				this.form.controls['picture'].setValue(user.picture);
				this.form.controls['username'].setValue(user.username);
				if (typeof (user.name) != 'undefined' && user.name != null) {
					(this.form.controls['name'] as FormGroup).controls['last'].setValue(user.name.last);
					(this.form.controls['name'] as FormGroup).controls['first'].setValue(user.name.first);
				};
			};
		});

		this.observers.loaded = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				this.appId = environment.appId;
				this.userId = this.localstorage.get('userId');
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.user?.unsubscribe();
		this.observers.loaded?.unsubscribe();
	}

}
