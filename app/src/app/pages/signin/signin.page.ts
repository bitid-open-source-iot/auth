import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { AccountService } from 'src/app/services/account/account.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'signin-page',
	styleUrls: ['./signin.page.scss'],
	templateUrl: './signin.page.html'
})

export class SignInPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private config: ConfigService, private router: Router, private service: AccountService, private formerror: FormErrorService) { }

	public app: any = {};
	public form: FormGroup = new FormGroup({
		email: new FormControl(null, [Validators.required]),
		password: new FormControl(null, [Validators.required])
	});
	public errors: any = {
		email: '',
		password: ''
	};
	public loading: boolean;
	private subscriptions: any = {};

	public signup() {
		this.router.navigate(['/signup'], {
			queryParamsHandling: 'preserve'
		});
	}

	public forgot(event) {
		
	}

	public async submit() {
		this.loading = true;

		const response = await this.service.signin({
			email: this.form.value.email,
			password: this.form.value.password
		});

		if (response.ok) {
			this.toast.show('Sign in successfull!');
			this.router.navigate(['/apps']);
		} else {
			this.toast.show(response.error.message);
		}

		this.loading = false;
	}

	ngOnInit(): void {
		this.subscriptions.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				this.app.icon = environment.icon;
			};
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.form.unsubscribe();
		this.subscriptions.loaded.unsubscribe();
	}

}
