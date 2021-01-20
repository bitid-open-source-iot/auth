import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AccountService } from 'src/app/services/account/account.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'remove-account-page',
	styleUrls: ['./remove-account.page.scss'],
	templateUrl: './remove-account.page.html'
})

export class RemoveAccountPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private router: Router, private service: AccountService, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		password: new FormControl('', [Validators.required]),
	});
	public errors: any = {
		password: ''
	};
	public loading: boolean;
	private subscriptions: any = {};

	public async submit() {
		this.loading = true;

		this.form.disable();

		const response = await this.service.removeaccount({
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
		this.subscriptions.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.form.unsubscribe();
	}

}
