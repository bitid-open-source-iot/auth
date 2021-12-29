import { Router } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/* --- SERVICES --- */
import { ToastService } from 'src/app/services/toast/toast.service';
import { AccountService } from 'src/app/services/account/account.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';

@Component({
	selector: 'change-password-page',
	styleUrls: ['./change-password.page.scss'],
	templateUrl: './change-password.page.html'
})

export class ChangePasswordPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private router: Router, private service: AccountService, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		old: new FormControl(null, [Validators.required]),
		new: new FormControl(null, [Validators.required]),
		confirm: new FormControl(null, [Validators.required])
	});
	public errors: any = {
		old: '',
		new: '',
		confirm: ''
	};
	public loading: boolean = false;
	private observers: any = {};

	public async submit() {
		this.loading = true;

		const response = await this.service.changepassword({
			old: this.form.value.old,
			new: this.form.value.new,
			confirm: this.form.value.confirm
		});

		if (response.ok) {
			this.router.navigate(['/account']);
			this.toast.show('Password was changed!');
		} else {
			this.toast.show('There was an issue changing password!');
		};

		this.loading = false;
	}

	ngOnInit(): void {
		this.observers.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});
	}

	ngOnDestroy(): void {
		this.observers.form?.unsubscribe();
	}

}
