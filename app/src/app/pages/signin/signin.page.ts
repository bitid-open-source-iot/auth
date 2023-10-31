import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/* --- SERVICES --- */
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { AccountService } from 'src/app/services/account/account.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';

/* --- ENVIRONMENT --- */
import { environment } from 'src/environments/environment';

@Component({
	selector: 'signin-page',
	styleUrls: ['./signin.page.scss'],
	templateUrl: './signin.page.html'
})

export class SignInPage implements OnInit, OnDestroy {

	constructor(private route: ActivatedRoute, private toast: ToastService, private config: ConfigService, private router: Router, private service: AccountService, private formerror: FormErrorService) { }

	public app = {
		icon: environment.icon,
		name: environment.name,
		privacyPolicy: environment.urlPrivacyPolicy,
		termsAndConditions: environment.urlTermsAndConditions
	};
	public form: FormGroup = new FormGroup({
		email: new FormControl(null, [Validators.required]),
		password: new FormControl(null, [Validators.required])
	});
	public errors: any = {
		email: '',
		password: ''
	};
	public loading: boolean = false;
	private observers: any = {};

	public signup() {
		this.router.navigate(['/signup'], {
			queryParamsHandling: 'preserve'
		});
	}

	public async submit() {
		this.loading = true;

		const response = await this.service.signin({
			email: this.form.value.email,
			password: this.form.value.password
		});

		if (response.ok) {
			if (this.route.snapshot.queryParams['allowaccess']) {
				this.toast.show('Sign in successfull, Taking you to app access!');
				setTimeout(() => {
					this.router.navigate(['/allow-access'], {
						queryParamsHandling: 'preserve'
					});
				}, 1000);
			} else {
				this.toast.show('Sign in successfull!');
				this.router.navigate(['/apps']);
			};
		} else {
			this.toast.show(response.error.message);
		};

		this.loading = false;
	}

	ngOnInit(): void {
		this.observers.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		this.observers.loaded = this.config.loaded.subscribe(async (loaded) => {
			if (loaded) {
				this.app.icon = environment.icon;
				this.app.name = environment.name;
				this.app.privacyPolicy = environment.urlPrivacyPolicy;
				this.app.termsAndConditions = environment.urlTermsAndConditions;

				const params: any = this.route.snapshot.queryParams;
				if (typeof(params.email) != 'undefined' && params.email != null) {
					this.form.controls['email'].setValue(params.email);
				};
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.form?.unsubscribe();
		this.observers.loaded?.unsubscribe();
	}

}
