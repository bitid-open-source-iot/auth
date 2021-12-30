import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/* --- CLASSES --- */
import { App } from 'src/app/classes/app';

import { Scope } from 'src/app/classes/scope';
/* --- SERVICES --- */
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ScopesService } from 'src/app/services/scopes/scopes.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
	selector: 'scopes-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class ScopesEditorPage implements OnInit, OnDestroy {

	constructor(public apps: AppsService, private toast: ToastService, private route: ActivatedRoute, private config: ConfigService, private router: Router, public service: ScopesService) { }

	public mode: string | undefined;
	public form: FormGroup = new FormGroup({
		url: new FormControl(null, [Validators.required]),
		appId: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required])
	});
	public errors: any = {
		url: '',
		appId: '',
		description: ''
	};
	public loading: boolean = false;
	public scopeId: string | undefined;
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
				this.form.controls['url'].setValue(scope.url);
				this.form.controls['appId'].setValue(scope.appId);
				this.form.controls['description'].setValue(scope.description);
			} else {
				this.toast.show('You have insufficient rights to edit this scope!');
				this.router.navigate(['/scopes']);
			};
		} else {
			this.toast.show(response.error.message);
			this.router.navigate(['/scopes']);
		};

		this.loading = false;
	}

	private async load() {
		this.loading = true;

		const response = await this.apps.list({
			filter: [
				'role',
				'name',
				'appId'
			]
		});

		if (response.ok) {
			this.apps.data = response.result.map((o: App) => new App(o)).filter((o: App) => o.role >= 2);
		} else {
			this.apps.data = [];
			this.toast.show(response.error.message);
		};

		this.loading = false;
	}

	public async submit() {
		this.loading = true;

		let mode = this.mode;
		if (mode == 'copy') {
			mode = 'add';
			delete this.scopeId;
		};

		const response = await (this.service as any)[mode as any]({
			url: this.form.value.url,
			appId: this.form.value.appId,
			scopeId: this.scopeId,
			description: this.form.value.description,
		});

		if (response.ok) {
			this.router.navigate(['/scopes']);
		} else {
			this.toast.show(response.error.message);
		};

		this.loading = false;
	}

	ngOnInit(): void {
		this.observers.loaded = this.config.loaded.subscribe(async (loaded) => {
			if (loaded) {
				const params: any = this.route.snapshot.queryParams;
				this.mode = params.mode;
				this.scopeId = params.scopeId;
				await this.load();
				if (this.mode != 'add') {
					await this.get();
				};
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.loaded?.unsubscribe();
	}

}
