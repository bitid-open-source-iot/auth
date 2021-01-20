import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ScopesService } from 'src/app/services/scopes/scopes.service';
import { App, AppsService } from 'src/app/services/apps/apps.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { Router, ActivatedRoute} from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:       'app-scope-editor',
    styleUrls:      ['./editor.page.scss'],
    templateUrl:    './editor.page.html'
})

export class ScopeEditorPage implements OnInit, OnDestroy {
    
    constructor(private route: ActivatedRoute, private toast: ToastService, private router: Router, private service: ScopesService, private formerror: FormErrorService, private appsservice: AppsService) {};

    public form:            FormGroup   = new FormGroup({
        'url':          new FormControl('', [Validators.required]),
        'appId':        new FormControl('', [Validators.required]),
        'roles':        new FormControl(0, [Validators.required]),
        'description':  new FormControl('', [Validators.required]),
    });
    public errors:          any         = {
        'url':          '',
        'appId':        '',
        'roles':        '',
        'description':  ''
    };
    public mode:            string;
    public apps:            App[]       = [];
    public roles:           any[]       = environment.roles;
    public scopeId:         string;
    public loading:         boolean;
    private subscriptions:  any         = {};

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'filter': [
                'url',
                'role',
                'appId',
                'roles',
                'description'
            ],
            'scopeId': this.scopeId
        });

        this.loading = false;

        if (response.ok) {
            if (response.result.role < 3) {
                this.router.navigate(['/scopes']);
                this.toast.error('you do not have permission to access this scope!');
            };
            this.form.controls['url'].setValue(response.result.url);
            this.form.controls['appId'].setValue(response.result.appId);
            this.form.controls['roles'].setValue(response.result.roles);
            this.form.controls['description'].setValue(response.result.description);
        } else {
            this.router.navigate(['/scopes']);
            this.toast.error('issue loading scope!');
        };

        this.load();
    };

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
        };
    };

    public async submit() {
        this.loading = true;

        let mode = this.mode;

        if (mode == 'copy') {
            mode = 'add';
        };
        
        this.form.disable();

        const response = await this.service[mode]({
            'url':          this.form.value.url,
            'roles':        this.form.value.roles,
            'appId':        this.form.value.appId,
            'scopeId':      this.scopeId,
            'description':  this.form.value.description
        });
        
        this.form.enable();

        this.loading = false;

        if (response.ok) {
            this.router.navigate(['/scopes']);
            if (mode == 'add') {
                this.toast.success('scope was added!');
            } else {
                this.toast.success('scope was updated!');
            };
        } else {
            if (mode == 'add') {
                this.toast.error('there was an issue adding scope!');
            } else {
                this.toast.error('there was an issue updating scope!');
            };
        };
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });

        this.subscriptions.route = this.route.params.subscribe(params => {
            this.mode       = params.mode;
            this.scopeId    = params.scopeId;

            if (this.mode != 'add') {
                this.get();
            } else {
                this.load();
            };
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
        this.subscriptions.route.unsubscribe();
    };

}