import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { AccountService } from 'src/app/services/account/account.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'reset-password-page',
	styleUrls: ['./reset-password.page.scss'],
	templateUrl: './reset-password.page.html'
})

export class ResetPasswordPage implements OnInit, OnDestroy {

	constructor(private apps: AppsService, private route: ActivatedRoute, private toast: ToastService, private config: ConfigService, private router: Router, private service: AccountService, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		old: new FormControl('', [Validators.required]),
		new: new FormControl('', [Validators.required]),
		userId: new FormControl('', [Validators.required]),
		confirm: new FormControl('', [Validators.required])
	});
	public app: any = { };
	public appId: string;
	public errors: any = {
		old: '',
		new: '',
		userId: '',
		confirm: ''
	};
	public loading: boolean;
	private subscriptions: any = {};

	private async load() {
		this.loading = true;

		const response = await this.apps.load({
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
		}
	}

	public async submit() {
		this.loading = true;

		const response = await this.service.changepassword({
			old: this.form.value.old,
			new: this.form.value.new,
			userId: this.form.value.userId
		});

		this.loading = false;

		if (response.ok) {
			if (Object.keys(this.app).includes('url')) {
				this.router.navigate(['/allow-access'], {
					queryParams: {
						appId: this.app.appId,
						userId: this.form.value.userId,
						returl: this.app.url + '/authenticate'
					},
					replaceUrl: true
				});
			} else {
				this.router.navigate(['/signin'], {
					queryParams: {
						userId: this.form.value.userId
					},
					replaceUrl: true
				});
			}
			this.toast.show('Password was changed!');
		} else {
			this.toast.show(response.error.message);
		}
	}

	ngOnInit(): void {
		this.subscriptions.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				debugger
				const params = this.route.snapshot.queryParams;
				if (typeof (params.userId) != 'undefined') {
					this.form.controls.userId.setValue(params.userId);
				}
				if (typeof (params.password) != 'undefined') {
					this.form.controls.old.setValue(params.password);
				}
				if (typeof(params.appId) != 'undefined' && params.appId !== null) {
					this.appId = params.appId;
					this.load();
				}
				if (params.userId == '' || params.userId == null || typeof (params.userId) == 'undefined' || params.password == '' || params.password == null || typeof (params.password) == 'undefined') {
					this.router.navigate(['/']);
				}
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.form.unsubscribe();
		this.subscriptions.loaded.unsubscribe();
	}

}
