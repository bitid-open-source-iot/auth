import { App } from 'src/app/classes/app';
import { AppsService } from 'src/app/services/apps/apps.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ScopesService } from 'src/app/services/scopes/scopes.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'apps-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class AppsEditorpage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, public scopes: ScopesService, private config: ConfigService, private router: Router, private buttons: ButtonsService, private service: AppsService) { }

	public form: FormGroup = new FormGroup({
		icons: new FormGroup({
			icon72x72: new FormControl(null, [Validators.required]),
			icon96x96: new FormControl(null, [Validators.required]),
			icon128x128: new FormControl(null, [Validators.required]),
			icon144x144: new FormControl(null, [Validators.required]),
			icon152x152: new FormControl(null, [Validators.required]),
			icon192x192: new FormControl(null, [Validators.required]),
			icon384x384: new FormControl(null, [Validators.required]),
			icon512x512: new FormControl(null, [Validators.required]),
		}),
		theme: new FormGroup({
			color: new FormControl(null, [Validators.required]),
			background: new FormControl(null, [Validators.required])
		}),
		google: new FormGroup({
			database: new FormControl(null, [Validators.required]),
			credentials: new FormControl(null, [Validators.required])
		}),
		url: new FormControl(null, [Validators.required]),
		icon: new FormControl(null, [Validators.required]),
		name: new FormControl(null, [Validators.required]),
		secret: new FormControl(null, [Validators.required]),
		scopes: new FormControl([], [Validators.required]),
		domains: new FormControl([], [Validators.required]),
		private: new FormControl(null, [Validators.required]),
		organizationOnly: new FormControl(null, [Validators.required])
	});
	public mode: string;
	public appId: string;
	public errors: any = {
		icons: {
			icon72x72: '',
			icon96x96: '',
			icon128x128: '',
			icon144x144: '',
			icon152x152: '',
			icon192x192: '',
			icon384x384: '',
			icon512x512: ''
		},
		theme: {
			color: '',
			background: ''
		},
		google: {
			database: '',
			credentials: ''
		},
		url: '',
		icon: '',
		name: '',
		secret: '',
		scopes: '',
		domains: '',
		private: '',
		organizationOnly: ''
	};
	public filter: FormGroup = new FormGroup({
		scopes: new FormControl('', [Validators.required]),
	});
	public loading: boolean;
	private subscriptions: any = {};
	readonly keycodes: number[] = [ENTER, COMMA];

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'url',
				'role',
				'icon',
				'name',
				'icons',
				'theme',
				'secret',
				'google',
				'scopes',
				'domains',
				'private',
				'organizationOnly'
			],
			appId: this.appId
		});

		if (response.ok) {
			const app = new App(response.result);
			if (app.role > 1) {
				this.form.controls.url.setValue(app.url);
				this.form.controls.icon.setValue(app.icon);
				this.form.controls.name.setValue(app.name);
				this.form.controls.secret.setValue(app.secret);
				this.form.controls.scopes.setValue(app.scopes);
				this.form.controls.domains.setValue(app.domains);
				this.form.controls.private.setValue(app.private);
				this.form.controls.organizationOnly.setValue(app.organizationOnly);
				(this.form.controls.icons as FormGroup).controls.icon72x72.setValue(app.icons.icon72x72);
				(this.form.controls.icons as FormGroup).controls.icon96x96.setValue(app.icons.icon96x96);
				(this.form.controls.icons as FormGroup).controls.icon128x128.setValue(app.icons.icon128x128);
				(this.form.controls.icons as FormGroup).controls.icon144x144.setValue(app.icons.icon144x144);
				(this.form.controls.icons as FormGroup).controls.icon152x152.setValue(app.icons.icon152x152);
				(this.form.controls.icons as FormGroup).controls.icon192x192.setValue(app.icons.icon192x192);
				(this.form.controls.icons as FormGroup).controls.icon384x384.setValue(app.icons.icon384x384);
				(this.form.controls.icons as FormGroup).controls.icon512x512.setValue(app.icons.icon512x512);
				(this.form.controls.theme as FormGroup).controls.color.setValue(app.theme.color);
				(this.form.controls.theme as FormGroup).controls.background.setValue(app.theme.background);
				(this.form.controls.google as FormGroup).controls.database.setValue(app.google.database);
				(this.form.controls.google as FormGroup).controls.credentials.setValue(JSON.stringify(app.google.credentials, null, 4));
			} else {
				this.toast.show('You have insufficient rights to edit this app!');
				this.router.navigate(['/apps']);
			}
		} else {
			this.toast.show(response.error.message);
			this.router.navigate(['/apps']);
		}

		this.loading = false;
	}

	private async load() {
		this.loading = true;

		const response = await this.scopes.load({
			filter: [
				'url'
			]
		});

		if (response.ok) {
			this.scopes.data = response.result.map(scope => scope);
		} else {
			this.scopes.data = [];
			this.toast.show(response.error.message);
		}

		this.loading = false;
	}

	public async submit() {
		this.loading = true;

		let mode = this.mode;
		if (mode == 'copy') {
			mode = 'add';
			delete this.appId;
		}

		const response = await this.service[mode]({
			theme: {
				color: this.form.value.theme.color,
				background: this.form.value.theme.background
			},
			google: {
				database: this.form.value.google.database,
				credentials: this.form.value.google.credentials
			},
			url: this.form.value.url,
			icon: this.form.value.icon,
			name: this.form.value.name,
			appId: this.appId,
			icons: this.form.value.icons,
			secret: this.form.value.secret,
			scopes: this.form.value.scopes,
			private: this.form.value.private,
			domains: this.form.value.domains,
			organizationOnly: this.form.value.organizationOnly
		});

		if (response.ok) {
			this.router.navigate(['/apps']);
		} else {
			this.toast.show(response.error.message);
		}

		this.loading = false;
	}

	public async upload(src) {
		this.form.controls.icon.setValue(src);
	}

	public async remove(domain) {
		this.form.value.domains.splice(this.form.value.domains.indexOf(domain), 1);
	}

	public async add(event: MatChipInputEvent) {
		const domains = this.form.value.domains;
		if (typeof (event.value) != 'undefined' && event.value !== null && event.value != '' && !domains.includes(event.value.trim())) {
			event.input.value = '';
			domains.push(event.value.trim());
			this.form.controls.domains.setValue(domains);
		}
	}

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.show('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.subscriptions.close = this.buttons.close.click.subscribe(event => {
			this.router.navigate(['/apps']);
		});

		this.subscriptions.loaded = this.config.loaded.subscribe(async loaded => {
			if (loaded) {
				const params = this.route.snapshot.queryParams;
				this.mode = params.mode;
				this.appId = params.appId;
				if (this.mode != 'add') {
					await this.get();
					await this.load();
				} else {
					await this.load();
				}
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.close.unsubscribe();
		this.subscriptions.loaded.unsubscribe();
	}

}
