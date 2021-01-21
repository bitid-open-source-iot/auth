import { App } from 'src/app/classes/app';
import { Feature } from 'src/app/classes/feature';
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { FeaturesService } from 'src/app/services/features/features.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'features-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class FeaturesEditorPage implements OnInit, OnDestroy {

	constructor(public apps: AppsService, private toast: ToastService, private route: ActivatedRoute, private config: ConfigService, private router: Router, private buttons: ButtonsService, public service: FeaturesService) { }

	public form: FormGroup = new FormGroup({
		appId: new FormControl(null, [Validators.required]),
		title: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required])
	});
	public mode: string;
	public errors: any = {
		appId: '',
		title: '',
		description: ''
	};
	public filter: FormGroup = new FormGroup({
		apps: new FormControl('', [Validators.required])
	});
	public loading: boolean;
	public featureId: string;
	private subscriptions: any = {};

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'role',
				'appId',
				'title',
				'description'
			],
			featureId: this.featureId
		});

		if (response.ok) {
			const feature = new Feature(response.result);
			if (feature.role >= 2) {
				this.form.controls.appId.setValue(feature.appId);
				this.form.controls.title.setValue(feature.title);
				this.form.controls.description.setValue(feature.description);
			} else {
				this.toast.show('You have insufficient rights to edit this feature!');
				this.router.navigate(['/features']);
			}
		} else {
			this.toast.show(response.error.message);
			this.router.navigate(['/features']);
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
			delete this.featureId;
		}

		const response = await this.service[mode]({
			appId: this.form.value.appId,
			title: this.form.value.title,
			featureId: this.featureId,
			description: this.form.value.description,
		});

		if (response.ok) {
			this.router.navigate(['/features']);
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

		this.subscriptions.close = this.buttons.close.click.subscribe(event => {
			this.router.navigate(['/features']);
		});

		this.subscriptions.loaded = this.config.loaded.subscribe(async loaded => {
			if (loaded) {
				const params = this.route.snapshot.queryParams;
				this.mode = params.mode;
				this.featureId = params.featureId;
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
