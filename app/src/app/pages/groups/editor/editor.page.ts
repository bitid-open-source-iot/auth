import { App } from 'src/app/classes/app';
import { Group } from 'src/app/classes/group';
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ScopesService } from 'src/app/services/scopes/scopes.service';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'groups-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class GroupsEditorpage implements OnInit, OnDestroy {

	constructor(public apps: AppsService, private toast: ToastService, private route: ActivatedRoute, public scopes: ScopesService, private config: ConfigService, private router: Router, private service: GroupsService) { }

	public form: FormGroup = new FormGroup({
		appId: new FormControl([], [Validators.required]),
		description: new FormControl(null, [Validators.required]),
		organizationOnly: new FormControl(null, [Validators.required])
	});
	public mode: string;
	public errors: any = {
		appId: '',
		description: '',
		organizationOnly: ''
	};
	public filter: FormGroup = new FormGroup({
		app: new FormControl('', [Validators.required]),
	});
	public groupId: string;
	public loading: boolean = false;
	private observers: any = {};

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'role',
				'appId',
				'description',
				'organizationOnly'
			],
			groupId: this.groupId
		});

		if (response.ok) {
			const group = new Group(response.result);
			if (group.role > 1) {
				this.form.controls.appId.setValue(group.appId);
				this.form.controls.description.setValue(group.description);
				this.form.controls.organizationOnly.setValue(group.organizationOnly);
			} else {
				this.toast.show('You have insufficient rights to edit this group!');
				this.router.navigate(['/groups']);
			}
		} else {
			this.toast.show(response.error.message);
			this.router.navigate(['/groups']);
		}

		this.loading = false;
	}

	private async load() {
		this.loading = true;

		const apps = await this.apps.list({
			filter: [
				'name',
				'appId'
			]
		});

		if (apps.ok) {
			this.apps.data = apps.result.map((o: App) => new App(o));
		} else {
			this.apps.data = [];
			this.toast.show(apps.error.message);
		};

		this.loading = false;
	}

	public async submit() {
		this.loading = true;

		let mode = this.mode;
		if (mode == 'copy') {
			mode = 'add';
			delete this.groupId;
		}

		const response = await (this.service as any)[mode]({
			appId: this.form.value.appId,
			groupId: this.groupId,
			description: this.form.value.description,
			organizationOnly: this.form.value.organizationOnly
		});

		if (response.ok) {
			this.router.navigate(['/groups']);
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
			this.router.navigate(['/groups']);
		});

		this.observers.loaded = this.config.loaded.subscribe(async loaded => {
			if (loaded) {
				const params: any = this.route.snapshot.queryParams;
				this.mode = params.mode;
				this.groupId = params.groupId;
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
