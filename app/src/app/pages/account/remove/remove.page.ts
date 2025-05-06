import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/* --- SERVICES --- */
import { ToastService } from 'src/app/services/toast/toast.service';
import { AccountService } from 'src/app/services/account/account.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';

@Component({
	selector: 'account-remove-page',
	styleUrls: ['./remove.page.scss'],
	templateUrl: './remove.page.html'
})

export class AccountRemovePage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private service: AccountService, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
	});
	public errors: any = {
		email: '',
		password: ''
	};
	public loading: boolean = false;
	private observers: any = {};

	public async submit() {
		this.loading = true;

		this.form.disable();

		const response = await this.service.delete({
			email: this.form.value.email,
			password: this.form.value.password
		});

		this.form.enable();

		this.loading = false;

		if (response.ok) {
			this.service.signout();
			this.toast.show('Account was removed!');
		} else {
			this.toast.show('There was an issue removing account!');
		}
	}

	ngOnInit(): void {
		this.observers.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});
	}

	ngOnDestroy(): void {
		this.observers.close?.unsubscribe();
	}

}
