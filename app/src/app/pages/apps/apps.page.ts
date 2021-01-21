import { App } from 'src/app/classes/app';
import { Router } from '@angular/router';
import { AppsService } from 'src/app/services/apps/apps.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { OptionsService } from 'src/app/libs/options/options.service';

@Component({
	selector: 'apps-page',
	styleUrls: ['./apps.page.scss'],
	templateUrl: './apps.page.html'
})

export class AppsPage implements OnInit, OnDestroy {

	constructor(private config: ConfigService, private sheet: OptionsService, private router: Router, private buttons: ButtonsService, private service: AppsService) { }

	public apps: MatTableDataSource<App> = new MatTableDataSource<App>();
	public columns: string[] = ['icon', 'name', 'options'];
	public loading: boolean;
	private subscriptions: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			filter: [
				'icon',
				'role',
				'name',
				'appId'
			]
		});

		if (response.ok) {
			this.apps.data = response.result.map(app => new App(app));
		} else {
			this.apps.data = [];
		}

		this.loading = false;
	}

	public async options(app: App) {
		this.sheet.show({
			'role': app.role,
			'title': app.name,
			'options': [
				{
					'icon': 'edit',
					'title': 'Edit',
					'handler': async () => {
						this.router.navigate(['/apps', 'editor'], {
							queryParams: {
								'mode': 'update',
								'appId': app.appId
							}
						});
					},
					'disabled': [0, 1]
				},
				{
					'icon': 'share',
					'title': 'Share',
					'handler': async () => {
						window.alert('finish this clayton');
					},
					'disabled': [0, 1, 2, 3]
				},
				{
					'icon': 'people',
					'title': 'Subscribers',
					'handler': async () => {
						this.router.navigate(['/subscribers'], {
							queryParams: {
								'id': app.appId,
								'type': 'app'
							}
						});
					},
					'disabled': [0, 1, 2, 3]
				},
				{
					'icon': 'remove',
					'title': 'Unubscribe',
					'danger': true,
					'handler': async () => {
						window.alert('finish this clayton');
					},
					'disabled': [5]
				},
				{
					'icon': 'delete',
					'title': 'Delete',
					'danger': true,
					'handler': async () => {
						window.alert('finish this clayton');
					},
					'disabled': [0, 1, 2, 3, 4]
				}
			]
		});
	};

	ngOnInit(): void {
		this.buttons.show('add');
		this.buttons.hide('close');
		this.buttons.show('filter');
		this.buttons.show('search');

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/apps', 'editor'], {
				queryParams: {
					mode: 'add'
				}
			});
		});

		this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				this.list();
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.add.unsubscribe();
		this.subscriptions.loaded.unsubscribe();
	}

}
