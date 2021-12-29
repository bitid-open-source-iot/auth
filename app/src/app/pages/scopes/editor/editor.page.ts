import { App } from 'src/app/classes/app';
import { Scope } from 'src/app/classes/scope';
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ScopesService } from 'src/app/services/scopes/scopes.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'scopes-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class ScopesEditorPage implements OnInit, OnDestroy {

	constructor(public apps: AppsService, private toast: ToastService, private route: ActivatedRoute, private config: ConfigService, private router: Router, private buttons: ButtonsService, public service: ScopesService) { }

	public form: FormGroup = new FormGroup({
		url: new FormControl(null, [Validators.required]),
		appId: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required])
	});
	public mode: string;
	public errors: any = {
		url: '',
		appId: '',
		description: ''
	};
	public filter: FormGroup = new FormGroup({
		apps: new FormControl('', [Validators.required])
	});
	public loading: boolean = false;
	public scopeId: string;
	private observers: any = {};

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'url',
				'role',
				'appId',
				'description'
			],
			scopeId: this.scopeId
		});

		if (response.ok) {
			const scope = new Scope(response.result);
			if (scope.role >= 2) {
				this.form.controls.url.setValue(scope.url);
				this.form.controls.appId.setValue(scope.appId);
				this.form.controls.description.setValue(scope.description);
			} else {
				this.toast.show('You have insufficient rights to edit this scope!');
				this.router.navigate(['/scopes']);
			}
		} else {
			this.toast.show(response.error.message);
			this.router.navigate(['/scopes']);
		}

		this.loading = false;
	}

	private async load() {
		this.loading = true;

		const response = await this.apps.list({
			filter: [
				'role',
				'name',
				'icon',
				'appId'
			]
		});

		if (response.ok) {
			this.apps.data = response.result.map(app => new App(app)).filter(app => app.role >= 2);
		} else {
			this.apps.data = [];
			this.toast.show(response.error.message);
		}

		this.loading = false;
	}

	public async submit() {
		this.loading = true;

		let mode = this.mode;
		if (mode == 'copy') {
			mode = 'add';
			delete this.scopeId;
		}

		const response = await (this.service as any)[mode]({
			url: this.form.value.url,
			appId: this.form.value.appId,
			scopeId: this.scopeId,
			description: this.form.value.description,
		});

		if (response.ok) {
			this.router.navigate(['/scopes']);
		} else {
			this.toast.show(response.error.message);
		}

		this.loading = false;
	}

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.show('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.observers.close = this.buttons.close.click.subscribe(event => {
			this.router.navigate(['/scopes']);
		});

		this.observers.loaded = this.config.loaded.subscribe(async loaded => {
			if (loaded) {
				const params: any = this.route.snapshot.queryParams;
				this.mode = params.mode;
				this.scopeId = params.scopeId;
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
		this.observers.close.unsubscribe();
		this.observers.loaded.unsubscribe();
	}

}
