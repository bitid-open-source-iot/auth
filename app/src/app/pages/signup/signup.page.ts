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
	selector: 'signup-page',
	styleUrls: ['./signup.page.scss'],
	templateUrl: './signup.page.html'
})

export class SignUpPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, private config: ConfigService, private router: Router, private apps: AppsService, private service: AccountService, private formerror: FormErrorService) { }

	public app = {
		icon: environment.icon,
		name: environment.appName,
		privacyPolicy: environment.privacyPolicy,
		termsAndConditions: environment.termsAndConditions
	};
	public form: FormGroup = new FormGroup({
		name: new FormGroup({
			last: new FormControl(null, [Validators.required]),
			first: new FormControl(null, [Validators.required])
		}),
		email: new FormControl(null, [Validators.email, Validators.required]),
		confirm: new FormControl(null, [Validators.required]),
		password: new FormControl(null, [Validators.required]),
		privacyPolicy: new FormControl(false, [Validators.required]),
		newsAndChanges: new FormControl(true, [Validators.required]),
		termsAndConditions: new FormControl(false, [Validators.required])
	});
	public appId: string | undefined;
	public errors: any = {
		name: {
			last: '',
			first: ''
		},
		email: '',
		confirm: '',
		password: '',
		privacyPolicy: '',
		newsAndChanges: '',
		termsAndConditions: ''
	};
	public loading: boolean = false;
	private observers: any = {};

	private async load() {
		this.loading = true;

		const response = await this.apps.get({
			filter: [
				'icon',
				'name',
				'scopes'
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

		const params: any = this.route.snapshot.queryParams;

		const response = await this.service.register({
			name: {
				last: this.form.value.name.last,
				first: this.form.value.name.first
			},
			appId: params.appId,
			email: this.form.value.email,
			confirm: this.form.value.confirm,
			password: this.form.value.password,
			privacyPolicy: this.form.value.privacyPolicy,
			newsAndChanges: this.form.value.newsAndChanges,
			termsAndConditions: this.form.value.termsAndConditions
		});

		if (response.ok) {
			this.toast.show('Sign up successfull!');
			this.router.navigate(['/verify-account'], {
				queryParams: {
					email: this.form.value.email,
					appId: this.appId
				},
				replaceUrl: true,
				queryParamsHandling: 'merge'
			});
		} else {
			this.toast.show(response.error.message);
			if (response.error.code == 72) {
				this.router.navigate(['/verify-account'], {
					queryParams: {
						email: this.form.value.email,
						appId: this.appId
					},
					replaceUrl: true,
					queryParamsHandling: 'merge'
				});
			};
		};

		this.loading = false;
	}

	ngOnInit(): void {
		this.observers.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		this.observers.loaded = this.config.loaded.subscribe(async (loaded) => {
			if (loaded) {
				const params: any = this.route.snapshot.queryParams;
				if (typeof (params.appId) != 'undefined' && params.appId != null) {
					this.appId = params.appId;
					this.load();
				} else {
					this.app.icon = environment.icon;
					this.app.name = environment.appName;
				};
			};
		});

		this.observers.confirm = this.form.controls['confirm'].valueChanges.subscribe(value => {
			if (typeof(value) != 'undefined' && value != null && typeof(this.form.value.password) != 'undefined' && this.form.value.password != null && value != this.form.value.password) {
				this.errors.confirm = 'Passwords do not match!';
				this.form.controls['confirm'].setErrors({
					noMatch: 'Passwords do not match!'
				});
			};
		});

		this.observers.password = this.form.controls['password'].valueChanges.subscribe(value => {
			if (typeof(value) != 'undefined' && value != null && typeof(this.form.value.confirm) != 'undefined' && this.form.value.confirm != null && value != this.form.value.confirm) {
				this.errors.password = 'Passwords do not match!';
				this.form.controls['password'].setErrors({
					noMatch: 'Passwords do not match!'
				});
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.form?.unsubscribe();
		this.observers.loaded?.unsubscribe();
		this.observers.confirm?.unsubscribe();
		this.observers.password?.unsubscribe();
	}

}
