import { MatDialog } from '@angular/material/dialog';
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ScopesService } from 'src/app/services/scopes/scopes.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector:       'app-app-editor',
    styleUrls:      ['./editor.page.scss'],
    templateUrl:    './editor.page.html'
})

export class AppEditorPage implements OnInit, OnDestroy {
    
    @ViewChild(ImageUploadComponent, {'static': true}) uplaod: ImageUploadComponent;
    
    constructor(private route: ActivatedRoute, private toast: ToastService, private dialog: MatDialog, private router: Router, private service: AppsService, private formerror: FormErrorService, private scopesservice: ScopesService) {};

    public form:            FormGroup   = new FormGroup({
        'name':             new FormControl('', [Validators.required]),
        'icon':             new FormControl('', [Validators.required]),
        'color':            new FormControl('', [Validators.required]),
        'secret':           new FormControl('', [Validators.required]),
        'background':       new FormControl('', [Validators.required]),
        'organizationOnly': new FormControl(0, [Validators.required])
    });
    public mode:            string;
    public appId:           string;
    public errors:          any         = {
        'name':             '',
        'icon':             '',
        'color':            '',
        'secret':           '',
        'background':       '',
        'organizationOnly': ''
    };
    public scopes:          any[]       = [];
    public options:         any[]       = [];
    public domains:         string[]    = [];
    public loading:         boolean;
    public keyscodes:       number[]    = [ENTER, COMMA, SPACE];
    private subscriptions:  any         = {};

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'filter': [
                'role',
                'icon',
                'name',
                'appId',
                'theme',
                'scopes',
                'secret',
                'domains',
                'organizationOnly'
            ],
            'appId': this.appId
        });

        this.loading = false;

        if (response.ok) {
            if (response.result.role < 3) {
                this.router.navigate(['/apps']);
                this.toast.error('you do not have permission to access this app!');
            };
            this.scopes     = response.result.scopes.map(scope => scope.url);
            this.domains    = response.result.domains;
            this.form.controls['name'].setValue(response.result.name);
            this.form.controls['icon'].setValue(response.result.icon);
            this.form.controls['color'].setValue(response.result.theme.color);
            this.form.controls['secret'].setValue(response.result.secret);
            this.form.controls['background'].setValue(response.result.theme.background);
            this.form.controls['organizationOnly'].setValue(response.result.organizationOnly);
        } else {
            this.router.navigate(['/apps']);
            this.toast.error('issue loading app!');
        };
    };

    private async load() {
        const response = await this.scopesservice.list({
            'filter': [
                'url',
                'roles'
            ]
        });

        if (response.ok) {
            this.options = response.result;
        };
    };

    public async submit() {
        this.loading = true;

        let mode = this.mode;

        if (mode == 'copy') {
            mode = 'add';
        };
        let scopes = this.scopes.map(url => {
            return {
                'url':  url,
                'role': 4
            };
        });
        
        this.form.disable();

        const response = await this.service[mode]({
            'theme': {
                'color':        this.form.value.color,
                'background':   this.form.value.background
            },
            'name':             this.form.value.name,
            'icon':             this.form.value.icon,
            'appId':            this.appId,
            'scopes':           scopes,
            'domains':          this.domains,
            'organizationOnly': this.form.value.organizationOnly
        });
        
        this.form.enable();

        this.loading = false;

        if (response.ok) {
            this.router.navigate(['/apps']);
            if (mode == 'add') {
                this.toast.success('app was added!');
            } else {
                this.toast.success('app was updated!');
            };
        } else {
            if (mode == 'add') {
                this.toast.error('there was an issue adding app!');
            } else {
                this.toast.error('there was an issue updating app!');
            };
        };
    };
    
    public RemoveScope(scope): void {
        const index = this.scopes.indexOf(scope);
        if (index >= 0) {
            this.scopes.splice(index, 1);
        };
    };
    
    public RemoveDomain(domain): void {
        const index = this.domains.indexOf(domain);
        if (index >= 0) {
            this.domains.splice(index, 1);
        };
    };

    public AddScope(url, input): void {
        if (url) {
            this.scopes.push(url);
        };
        if (input) {
            input.value = '';
        };
    };

    public AddDomain(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value.trim();
        const regex = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$','i');
        if (regex.test(value)) {
            this.domains.push(value);
        };
        if (input && regex.test(value)) {
            input.value = '';
        };
    };

    ngOnInit(): void {
        this.load();

        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });

        this.subscriptions.route = this.route.params.subscribe(params => {
            this.mode   = params.mode;
            this.appId  = params.appId;

            if (this.mode != 'add') {
                this.get();
            };
        });

        this.subscriptions.uplaod = this.uplaod.change.subscribe(icon => {
            this.form.controls['icon'].setValue(icon);
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
        this.subscriptions.route.unsubscribe();
    };

}