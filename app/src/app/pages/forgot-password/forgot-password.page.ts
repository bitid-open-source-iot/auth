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
	selector: 'forgot-password-page',
	styleUrls: ['./forgot-password.page.scss'],
	templateUrl: './forgot-password.page.html'
})

export class ForgotPasswordPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, private config: ConfigService, private router: Router, private service: AccountService, private formerror: FormErrorService) { }

	public app = {
		icon: environment.icon,
		name: environment.name,
		privacyPolicy: environment.privacyPolicy,
		termsAndConditions: environment.termsAndConditions
	};
	public form: FormGroup = new FormGroup({
		email: new FormControl(null, [Validators.email, Validators.required])
	});
	public errors: any = {
		email: ''
	};
	public loading: boolean = false;
	private observers: any = {};

	public async submit() {
		this.loading = true;

		const response = await this.service.resetpassword({
			email: this.form.value.email
		});

		if (response.ok) {
			this.toast.show('Check your email for reset instructions!');
			this.router.navigate(['/signin'], {
				queryParams: {
					email: this.form.value.email
				},
				replaceUrl: true,
				queryParamsHandling: 'merge'
			});
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
				this.app.privacyPolicy = environment.privacyPolicy;
				this.app.termsAndConditions = environment.termsAndConditions;

				const params: any = this.route.snapshot.queryParams;
				if (typeof (params.email) != 'undefined' && params.email != null) {
					this.form.controls['email'].setValue(params.email);
				};
				if (!this.form.invalid) {
					this.submit();
				};
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.form?.unsubscribe();
		this.observers.loaded?.unsubscribe();
	}

}
