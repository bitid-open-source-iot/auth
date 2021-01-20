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
    selector: 'app-app-editor',
    styleUrls: ['./editor.page.scss'],
    templateUrl: './editor.page.html'
})

export class AppEditorPage implements OnInit, OnDestroy {

    @ViewChild(ImageUploadComponent, { 'static': true }) uplaod: ImageUploadComponent;

    constructor(private route: ActivatedRoute, private toast: ToastService, private dialog: MatDialog, private router: Router, private service: AppsService, private formerror: FormErrorService, private scopesservice: ScopesService) { };

    public theme: FormGroup = new FormGroup({
        'color': new FormControl('', [Validators.required]),
        'background': new FormControl('', [Validators.required])
    });
    public google: FormGroup = new FormGroup({
        'database': new FormControl('', []),
        'credentials': new FormControl('', [Validators.pattern(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/)])
    });
    public details: FormGroup = new FormGroup({
        'url': new FormControl('', [Validators.required]),
        'name': new FormControl('', [Validators.required]),
        'icon': new FormControl('', [Validators.required]),
        'secret': new FormControl('', [Validators.required]),
        'organizationOnly': new FormControl(0, [Validators.required])
    });
    public mode: string;
    public appId: string;
    public themeErrors: any = {
        'color': '',
        'background': ''
    };
    public googleErrors: any = {
        'database': '',
        'credentials': ''
    };
    public detailsErrors: any = {
        'url': '',
        'name': '',
        'icon': '',
        'secret': '',
        'organizationOnly': ''
    };
    public scopes: any[] = [];
    public options: any[] = [];
    public domains: string[] = [];
    public loading: boolean;
    public keyscodes: number[] = [ENTER, COMMA, SPACE];
    private subscriptions: any = {};

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'filter': [
                'url',
                'role',
                'icon',
                'name',
                'appId',
                'theme',
                'scopes',
                'secret',
                'google',
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
            this.scopes = response.result.scopes.map(scope => scope.url);
            this.domains = response.result.domains;
            if (typeof (response.result.theme) != "undefined") {
                this.theme.controls['color'].setValue(response.result.theme.color);
                this.theme.controls['background'].setValue(response.result.theme.background);
            };
            if (typeof (response.result.google) != "undefined") {
                this.google.controls['database'].setValue(response.result.google.database);
                this.google.controls['credentials'].setValue(JSON.stringify(response.result.google.credentials, null, 4));
            };
            this.details.controls['url'].setValue(response.result.url);
            this.details.controls['name'].setValue(response.result.name);
            this.details.controls['icon'].setValue(response.result.icon);
            this.details.controls['secret'].setValue(response.result.secret);
            this.details.controls['organizationOnly'].setValue(response.result.organizationOnly);
        } else {
            this.router.navigate(['/apps']);
            this.toast.error('issue loading app!');
        };
    };

    private async load() {
        const response = await this.scopesservice.load({
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
        let scopes = this.scopes.map(url => {
            return {
                'url': url,
                'role': 4
            };
        });
        let credentials: any = {};

        if (mode == 'copy') {
            mode = 'add';
        };
        this.theme.disable();
        this.google.disable();
        this.details.disable();

        let regex = new RegExp(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/);
        if (regex.test(this.google.value.credentials)) {
            credentials = this.google.value.credentials.split(/\r?\n|\r/).join('');
            credentials = JSON.parse(this.google.value.credentials);
        };

        const response = await this.service[mode]({
            'theme': {
                'color': this.theme.value.color,
                'background': this.theme.value.background
            },
            'google': {
                'database': this.google.value.database,
                'credentials': credentials
            },
            'url': this.details.value.url,
            'name': this.details.value.name,
            'icon': this.details.value.icon,
            'appId': this.appId,
            'scopes': scopes,
            'domains': this.domains,
            'organizationOnly': this.details.value.organizationOnly
        });

        this.theme.enable();
        this.google.enable();
        this.details.enable();

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
        const regex = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$', 'i');
        if (regex.test(value)) {
            this.domains.push(value);
        };
        if (input && regex.test(value)) {
            input.value = '';
        };
    };

    ngOnInit(): void {
        this.load();

        this.subscriptions.theme = this.theme.valueChanges.subscribe(data => {
            this.themeErrors = this.formerror.validateForm(this.theme, this.themeErrors, true);
        });

        this.subscriptions.google = this.google.valueChanges.subscribe(data => {
            this.googleErrors = this.formerror.validateForm(this.google, this.googleErrors, true);
        });

        this.subscriptions.route = this.route.params.subscribe(params => {
            this.mode = params.mode;
            this.appId = params.appId;

            if (this.mode != 'add') {
                this.get();
            };
        });

        this.subscriptions.uplaod = this.uplaod.change.subscribe(icon => {
            this.details.controls['icon'].setValue(icon);
        });

        this.subscriptions.details = this.details.valueChanges.subscribe(data => {
            this.detailsErrors = this.formerror.validateForm(this.details, this.detailsErrors, true);
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.theme.unsubscribe();
        this.subscriptions.route.unsubscribe();
        this.subscriptions.uplaod.unsubscribe();
        this.subscriptions.google.unsubscribe();
        this.subscriptions.details.unsubscribe();
    };

}