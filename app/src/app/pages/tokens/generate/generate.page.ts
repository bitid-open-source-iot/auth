import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TokensService } from 'src/app/services/tokens/tokens.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { App, AppsService } from 'src/app/services/apps/apps.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:       'app-generate-token',
    styleUrls:      ['./generate.page.scss'],
    templateUrl:    './generate.page.html'
})

export class GenerateTokenPage implements OnInit, OnDestroy {
    
    constructor(private toast: ToastService, private router: Router, private service: TokensService, private formerror: FormErrorService, private appsservice: AppsService) {};

    public apps:            App[]       = [];
    public form:            FormGroup   = new FormGroup({
        'appId':        new FormControl('', [Validators.required]),
        'expiry':       new FormControl('', [Validators.required]),
        'description':  new FormControl('', [Validators.required])
    });
    public roles:           any[]       = environment.roles;
    public errors:          any         = {
        'appId':        '',
        'expiry':       '',
        'description':  ''
    };
    public loading:         boolean;
    private subscriptions:  any         = {};

    private async load() {
        this.loading = true;

        const response = await this.appsservice.list({
            'filter': [
                'name',
                'appId'
            ]
        });

        this.loading = false;

        if (response.ok) {
            this.apps = response.result;
        } else {
            this.router.navigate(['/tokens']);
            this.toast.error('issue loading apps!');
        };
    };

    public async submit() {
        this.loading = true;

        const response = await this.service.generate({
            'appId':        this.form.value.appId,
            'expiry':       this.form.value.expiry,
            'description':  this.form.value.description
        });

        this.loading = false;

        if (response.ok) {
            this.router.navigate(['/tokens']);
            this.toast.success('token was generated!');
        } else {
            this.router.navigate(['/tokens']);
            this.toast.error('issue generating token!');
        };
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });

        this.load();
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
    };

}