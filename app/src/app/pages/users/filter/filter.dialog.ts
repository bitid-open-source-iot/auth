import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Inject, Component, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'users-filter-dialog',
    styleUrls: ['./filter.dialog.scss'],
    templateUrl: './filter.dialog.html',
    encapsulation: ViewEncapsulation.None
})

export class UsersFilterDialog implements OnInit, OnDestroy {

    constructor(private dialog: MatDialogRef<UsersFilterDialog>, @Inject(MAT_DIALOG_DATA) public config, private formerror: FormErrorService) { }

    public form: FormGroup = new FormGroup({
        validated: new FormControl([])
    });
    public errors: any = {
        validated: ''
    };
    public loading: boolean;
    private subscriptions: any = {}

    private async load() {
        this.loading = true;

        if (typeof(this.config.validated) != 'undefined' && this.config.validated != null) {
            this.form.controls.validated.setValue(this.config.validated);
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
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        })

        this.load();
    }

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
    }

}
