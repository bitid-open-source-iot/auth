import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Inject, Component, OnDestroy, ViewEncapsulation } from '@angular/core';

/* --- CLASSES --- */
import { App } from 'src/app/classes/app';

/* --- SERVICES --- */
import { AppsService } from 'src/app/services/apps/apps.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';

@Component({
    selector: 'scopes-filter-dialog',
    styleUrls: ['./filter.dialog.scss'],
    templateUrl: './filter.dialog.html',
    encapsulation: ViewEncapsulation.None
})

export class ScopesFilterDialog implements OnInit, OnDestroy {

    constructor(public apps: AppsService, private dialog: MatDialogRef<ScopesFilterDialog>, @Inject(MAT_DIALOG_DATA) public config: any, private formerror: FormErrorService) { }

    public form: FormGroup = new FormGroup({
        appId: new FormControl([])
    });
    public errors: any = {
        appId: ''
    };
    public loading: boolean = false;
    private observers: any = {}

    private async load() {
        this.loading = true;

        const apps = await this.apps.list({
            filter: [
                'name',
                'appId'
            ]
        });

        if (apps.ok) {
            this.apps.data = apps.result.map((o: App) => new App(o));
        } else {
            this.apps.data = [];
        };

        if (typeof (this.config.appId) != 'undefined' && this.config.appId != null) {
            this.form.controls['appId'].setValue(this.config.appId);
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
