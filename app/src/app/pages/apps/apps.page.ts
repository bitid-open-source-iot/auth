import { AppsService } from 'src/app/services/apps/apps.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'apps-page',
	styleUrls: ['./apps.page.scss'],
	templateUrl: './apps.page.html'
})

export class AppsPage implements OnInit, OnDestroy {

	constructor(private buttons: ButtonsService, private service: AppsService) { }

	public apps: MatTableDataSource<any> = new MatTableDataSource<any>();
	public columns: string[] = ['icon', 'name', 'options'];
	public loading: boolean;

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
			this.apps.data = response.result;
		} else {
			this.apps.data = [];
		}

		this.loading = false;
	}

	public async options(app) { }

	ngOnInit(): void {
		this.buttons.show('add');
        this.buttons.hide('close');
		this.buttons.show('filter');
		this.buttons.show('search');

		this.list();
	}

	ngOnDestroy(): void { }

}
