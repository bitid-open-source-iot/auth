import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Inject, Component, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'apps-filter-dialog',
    styleUrls: ['./filter.dialog.scss'],
    templateUrl: './filter.dialog.html',
    encapsulation: ViewEncapsulation.None
})

export class AppsFilterDialog implements OnInit, OnDestroy {

    constructor(private dialog: MatDialogRef<AppsFilterDialog>, @Inject(MAT_DIALOG_DATA) public config, private formerror: FormErrorService) { }

    public form: FormGroup = new FormGroup({
        private: new FormControl([])
    });
    public errors: any = {
        private: ''
    };
    public loading: boolean = false;
    private observers: any = {}

    private async load() {
        this.loading = true;

        if (typeof (this.config.private) != 'undefined' && this.config.private != null) {
            this.form.controls.private.setValue(this.config.private);
        };

        this.loading = false;
    };

    public async close() {
        this.dialog.close(false);
    };

    public async submit() {
        this.dialog.close(this.form.value);
    };

    ngOnInit(): void {
        this.observers.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        })

        this.load();
    }

    ngOnDestroy(): void {
        this.observers.form.unsubscribe();
    }

}
