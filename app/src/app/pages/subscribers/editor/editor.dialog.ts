import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit, Inject, Component, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'user-editor-dialog',
	styleUrls: ['./editor.dialog.scss'],
	templateUrl: './editor.dialog.html',
	encapsulation: ViewEncapsulation.None
})

export class UserEditorDialog implements OnInit, OnDestroy {

	constructor(private dialog: MatDialogRef<UserEditorDialog>, @Inject(MAT_DIALOG_DATA) private config: any, private formerror: FormErrorService) { }

	public form: FormGroup = new FormGroup({
		role: new FormControl(1, [Validators.required]),
		email: new FormControl(null, [Validators.required, Validators.email])
	});
	public errors: any = {
		role: '',
		email: ''
	};
	private subscribers: any = {};

	public close() {
		this.dialog.close(false);
	}

	public submit() {
		this.dialog.close(this.form.value);
	}

	ngOnInit(): void {
		this.subscribers.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		if (typeof (this.config) != 'undefined' && this.config != null) {
			if (typeof (this.config.role) != 'undefined' && this.config.role != null) {
				this.form.controls.role.setValue(this.config.role);
			}
			if (typeof (this.config.email) != 'undefined' && this.config.email != null) {
				this.form.controls.email.setValue(this.config.email);
				this.form.controls.email.disable();
			}
		}
	}

	ngOnDestroy(): void {
		this.subscribers.form.unsubscribe();
	}

}
