import { App } from 'src/app/classes/app';
import { Router } from '@angular/router';
import { AppsService } from 'src/app/services/apps/apps.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'apps-page',
	styleUrls: ['./apps.page.scss'],
	templateUrl: './apps.page.html'
})

export class AppsPage implements OnInit, OnDestroy {

	constructor(private config: ConfigService, private router: Router, private buttons: ButtonsService, private service: AppsService) { }

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
		debugger;
	}

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
