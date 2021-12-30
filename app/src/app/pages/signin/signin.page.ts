import { AppsService } from 'src/app/services/apps/apps.service';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { AccountService } from 'src/app/services/account/account.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'signin-page',
	styleUrls: ['./signin.page.scss'],
	templateUrl: './signin.page.html'
})

export class SignInPage implements OnInit, OnDestroy {

	constructor(private apps: AppsService, private route: ActivatedRoute, private toast: ToastService, private config: ConfigService, private router: Router, private service: AccountService, private formerror: FormErrorService) { }

	public app = {
		icon: environment.icon,
		name: environment.appName,
		privacyPolicy: environment.privacyPolicy,
		termsAndConditions: environment.termsAndConditions
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
	private appId: string | undefined;
	private allowaccess: boolean = false;
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
			if (this.allowaccess) {
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

		if (response.ok) {
			this.app = response.result;
		} else {
			this.toast.show('Issue loading app!');
		};

		this.loading = false;
	}

	ngOnInit(): void {
		this.observers.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		this.observers.loaded = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				const params: any = this.route.snapshot.queryParams;
				if (typeof (params.allowaccess) != 'undefined' && params.allowaccess != null) {
					this.allowaccess = JSON.parse(params.allowaccess);
				};
				if (typeof (params.appId) != 'undefined' && params.appId != null) {
					this.appId = params.appId;
					this.load();
				};
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.form.unsubscribe();
		this.observers.loaded.unsubscribe();
	}

}
