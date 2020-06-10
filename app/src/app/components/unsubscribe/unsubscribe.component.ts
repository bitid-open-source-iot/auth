import { MatDialogRef } from '@angular/material/dialog';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:       'app-unsubscribe',
    styleUrls:      ['./unsubscribe.component.scss'],
    templateUrl:    './unsubscribe.component.html'
})

export class UnsubscribeComponent implements OnInit, OnDestroy {

    constructor(private dialog: MatDialogRef<UnsubscribeComponent>, private formerror: FormErrorService) {};

    public form:    FormGroup   = new FormGroup({
        'confirm': new FormControl(false, [Validators.required])
    });
    public errors:  any         = {
        'confirm': ''
    };
    private subscriptions: any  = {};

    public close() {
        this.dialog.close(false);
    };

    public submit() {
        this.dialog.close(this.form.value.confirm);
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
    };

}