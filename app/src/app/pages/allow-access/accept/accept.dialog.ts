import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AccountService } from 'src/app/services/account/account.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'accept-dialog',
	styleUrls: ['./accept.dialog.scss'],
	templateUrl: './accept.dialog.html',
	encapsulation: ViewEncapsulation.None
})

export class AcceptDialog implements OnInit, OnDestroy {

	constructor(private dialog: MatDialogRef<AcceptDialog>, private toast: ToastService, private formerror: FormErrorService, private service: AccountService) { }

	public form: FormGroup = new FormGroup({
		privacyPolicy: new FormControl(false, [Validators.required]),
		termsAndConditions: new FormControl(false, [Validators.required])
	});
	public errors: any = {
		privacyPolicy: '',
		termsAndConditions: ''
	};
	public loading: boolean;
	private subscriptions: any = {};

	public async submit() {
		this.loading = true;

		this.form.disable();

		const response = await this.service.update(this.form.value);

		this.form.enable();

		this.loading = false;

		if (response.ok) {
			this.dialog.close(true);
		} else {
			this.toast.show(response.error.message);
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
