import { App } from 'src/app/classes/app';
import { TipUpdate } from 'src/app/classes/tip-update';
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { TipsAndUpdatesService } from 'src/app/services/tips-and-updates/tips-and-updates.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'tips-and-updates-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class TipsAndUpdatesEditorPage implements OnInit, OnDestroy {

	constructor(public apps: AppsService, private toast: ToastService, private route: ActivatedRoute, private config: ConfigService, private router: Router, private buttons: ButtonsService, public service: TipsAndUpdatesService) { }

	public form: FormGroup = new FormGroup({
		data: new FormControl(null, [Validators.required]),
		appId: new FormControl(null, [Validators.required]),
		title: new FormControl(null, [Validators.required]),
		subtitle: new FormControl(null, [Validators.required])
	});
	public mode: string;
	public errors: any = {
		data: '',
		appId: '',
		title: '',
		subtitle: ''
	};
	public filter: FormGroup = new FormGroup({
		apps: new FormControl('', [Validators.required])
	});
	public loading: boolean;
	public itemId: string;
	private subscriptions: any = {};

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'role',
				'data',
				'appId',
				'title',
				'subtitle'
			],
			itemId: this.itemId
		});

		if (response.ok) {
			const item = new TipUpdate(response.result);
			if (item.role >= 2) {
				this.form.controls.data.setValue(item.data);
				this.form.controls.appId.setValue(item.appId);
				this.form.controls.title.setValue(item.title);
				this.form.controls.subtitle.setValue(item.subtitle);
			} else {
				this.toast.show('You have insufficient rights to edit this item!');
				this.router.navigate(['/tips-and-updates']);
			}
		} else {
			this.toast.show(response.error.message);
			this.router.navigate(['/tips-and-updates']);
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
			delete this.itemId;
		}

		const response = await this.service[mode]({
			data: this.form.value.data,
			appId: this.form.value.appId,
			title: this.form.value.title,
			itemId: this.itemId,
			subtitle: this.form.value.subtitle
		});

		if (response.ok) {
			this.router.navigate(['/tips-and-updates']);
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
			this.router.navigate(['/tips-and-updates']);
		});

		this.subscriptions.loaded = this.config.loaded.subscribe(async loaded => {
			if (loaded) {
				const params = this.route.snapshot.queryParams;
				this.mode = params.mode;
				this.itemId = params.itemId;
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
