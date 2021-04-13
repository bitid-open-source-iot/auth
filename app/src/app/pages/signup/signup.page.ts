import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { AccountService } from 'src/app/services/account/account.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'signup-page',
	styleUrls: ['./signup.page.scss'],
	templateUrl: './signup.page.html'
})

export class SignUpPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, private config: ConfigService, private router: Router, private apps: AppsService, private service: AccountService, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		name: new FormGroup({
			last: new FormControl('', [Validators.required]),
			first: new FormControl('', [Validators.required])
		}),
		email: new FormControl('', [Validators.email, Validators.required]),
		confirm: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
		password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
	});
	public app: any = {};
	public appId: string;
	public errors: any = {
		name: {
			last: '',
			first: ''
		},
		email: '',
		confirm: '',
		password: ''
	};
	public loading: boolean;
	private subscriptions: any = {};

	private async load() {
		this.loading = true;

		const response = await this.apps.load({
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
		}
	}

	public async submit() {
		this.loading = true;

		const params = this.route.snapshot.queryParams;

		const response = await this.service.register({
			name: {
				last: this.form.value.name.last,
				first: this.form.value.name.first
			},
			appId: params.appId,
			email: this.form.value.email,
			confirm: this.form.value.confirm,
			password: this.form.value.password
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
		}

		this.loading = false;
	}

	public verifyaccount() {
		this.router.navigate(['/verify-account'], {
			queryParamsHandling: 'preserve'
		});
	}

	ngOnInit(): void {
		this.subscriptions.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				const params = this.route.snapshot.queryParams;
				if (typeof(params.appId) != 'undefined' && params.appId !== null) {
					this.appId = params.appId;
					this.load();
				}
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.form.unsubscribe();
		this.subscriptions.loaded.unsubscribe();
	}

}
