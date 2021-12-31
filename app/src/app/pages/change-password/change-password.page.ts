import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/* --- SERVICES --- */
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { AccountService } from 'src/app/services/account/account.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';

/* --- ENVIRONMENT --- */
import { environment } from 'src/environments/environment';

@Component({
	selector: 'change-password-page',
	styleUrls: ['./change-password.page.scss'],
	templateUrl: './change-password.page.html'
})

export class ChangePasswordPage implements OnInit, OnDestroy {

	constructor(private apps: AppsService, private route: ActivatedRoute, private toast: ToastService, private config: ConfigService, private router: Router, private service: AccountService, private formerror: FormErrorService) { }

	public app = {
		url: '',
		icon: environment.icon,
		name: environment.appName,
		privacyPolicy: environment.privacyPolicy,
		termsAndConditions: environment.termsAndConditions
	};
	public form: FormGroup = new FormGroup({
		old: new FormControl(null, [Validators.required]),
		new: new FormControl(null, [Validators.required]),
		confirm: new FormControl(null, [Validators.required])
	});
	public appId: string | undefined;
	public errors: any = {
		old: '',
		new: '',
		confirm: ''
	};
	public userId: string = '';
	public loading: boolean = false;
	private observers: any = {};

	private async load() {
		this.loading = true;

		const response = await this.apps.get({
			filter: [
				'url',
				'icon',
				'name',
				'appId'
			],
			appId: this.appId
		});

		this.loading = false;

		if (response.ok) {
			this.app = response.result;
		} else {
			this.toast.show('Issue loading app!');
		};
	}

	public async submit() {
		this.loading = true;

		const response = await this.service.changepassword({
			old: this.form.value.old,
			new: this.form.value.new,
			userId: this.userId,
			confirm: this.form.value.confirm
		});

		this.loading = false;

		if (response.ok) {
			if (Object.keys(this.app).includes('url')) {
				this.router.navigate(['/allow-access'], {
					queryParams: {
						appId: this.appId,
						email: this.form.value.email,
						returl: this.app.url + '/authenticate'
					},
					replaceUrl: true
				});
			} else {
				this.router.navigate(['/signin'], {
					queryParams: {
						email: this.form.value.email
					},
					replaceUrl: true
				});
			};
			this.toast.show('Password was changed!');
		} else {
			this.toast.show(response.error.message);
		};
	}

	ngOnInit(): void {
		this.observers.new = this.form.controls['new'].valueChanges.subscribe(value => {
			if (typeof (value) != 'undefined' && value != null && typeof (this.form.value.confirm) != 'undefined' && this.form.value.confirm != null && value != this.form.value.confirm) {
				this.errors.new = 'Passwords do not match!';
				this.form.controls['password'].setErrors({
					noMatch: 'Passwords do not match!'
				});
			};
		});

		this.observers.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		this.observers.loaded = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				const params: any = this.route.snapshot.queryParams;
				this.userId = params.userId;
				if (typeof (params.password) != 'undefined') {
					this.form.controls['old'].setValue(params.password);
				};
				if (typeof (params.appId) != 'undefined' && params.appId != null) {
					this.appId = params.appId;
					this.load();
				};
				if (params.userId == '' || params.userId == null || typeof (params.userId) == 'undefined') {
					this.router.navigate(['/']);
				};
			};
		});

		this.observers.confirm = this.form.controls['confirm'].valueChanges.subscribe(value => {
			if (typeof (value) != 'undefined' && value != null && typeof (this.form.value.new) != 'undefined' && this.form.value.new != null && value != this.form.value.new) {
				this.errors.confirm = 'Passwords do not match!';
				this.form.controls['confirm'].setErrors({
					noMatch: 'Passwords do not match!'
				});
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.new?.unsubscribe();
		this.observers.form?.unsubscribe();
		this.observers.loaded?.unsubscribe();
		this.observers.confirm?.unsubscribe();
	}

}
