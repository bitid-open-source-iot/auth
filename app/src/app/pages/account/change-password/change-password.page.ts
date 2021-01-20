import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AccountService } from 'src/app/services/account/account.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'change-password-page',
	styleUrls: ['./change-password.page.scss'],
	templateUrl: './change-password.page.html'
})

export class ChangePasswordPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private router: Router, private service: AccountService, private formerror: FormErrorService, private localstorage: LocalstorageService) { }

	public form: FormGroup = new FormGroup({
		old: new FormControl('', [Validators.required]),
		new: new FormControl('', [Validators.required]),
		confirm: new FormControl('', [Validators.required]),
	});
	public errors: any = {
		old: '',
		new: '',
		confirm: ''
	};
	public loading: boolean;
	private subscriptions: any = {};

	public async submit() {
		this.loading = true;

		const response = await this.service.changepassword({
			old: this.form.value.old,
			new: this.form.value.new,
			email: this.localstorage.get('email'),
			confirm: this.form.value.confirm
		});

		this.loading = false;

		if (response.ok) {
			this.router.navigate(['/account']);
			this.toast.show('password was changed!');
		} else {
			this.toast.show('there was an issue changing password!');
		};
	}

	ngOnInit(): void {
		this.subscriptions.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.form.unsubscribe();
	}

}
