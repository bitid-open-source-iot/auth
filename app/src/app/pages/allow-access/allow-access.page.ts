import { ToastService } from 'src/app/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { App, AppsService } from 'src/app/services/apps/apps.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:       'app-allow-access',
    styleUrls:      ['./allow-access.page.scss'],
    templateUrl:    './allow-access.page.html'
})

export class AllowAccessPage implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private toast: ToastService, private formerror: FormErrorService, private service: AppsService, private localstorage: LocalstorageService) {};

    public form:            FormGroup   = new FormGroup({
        'email':        new FormControl('', [Validators.email, Validators.required]),
        'password':     new FormControl('', [Validators.required])
    });
    public errors:          any         = {
        'email':        '',
        'password':     ''
    };
    public app:             App         = {};
	public appId:           string;
	public returl:          string;
    public loading:         boolean;
    private subscriptions:  any         = {};

    private async load() {
        this.loading = true;

        const response = await this.service.load({
            'filter': [
                'icon',
                'name',
                'scopes'
            ],
            'appId': this.appId
        });

        this.loading = false;

        if (response.ok) {
            this.app = response.result;
        } else {
            this.toast.error('issue loading app!');
        };
    };

    public async submit() {
        this.loading = true;

        this.form.disable();

        const expiry = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

        const response = await this.service.allowaccess({
            'appId':        this.appId,
            'email':        this.form.value.email,
            'expiry':       expiry,
            'scopes':       this.app.scopes,
            'password':     this.form.value.password,
            'description':  this.app.name + ' (LOGIN)'
        });

        this.form.enable();

        this.loading = false;

        if (response.ok) {
            window.open(this.returl + "?_id=" + response.result.tokenId + "&email=" + this.form.value.email + "&appId=" + this.appId, '_parent');
        } else {
            this.toast.error(response.error.message);
        };
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });

        this.subscriptions.route = this.route.queryParams.subscribe(params => {
            this.appId  = params.appId;
            this.returl = params.returl;
            if (typeof(params.email) != "undefined") {
				this.form.controls['email'].setValue(params.email);
                this.localstorage.set('email', params.email);
			};
			this.load();
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
        this.subscriptions.route.unsubscribe();
    };

}