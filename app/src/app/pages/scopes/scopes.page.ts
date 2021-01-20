import { ScopesService } from 'src/app/services/scopes/scopes.service';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'scopes-page',
	styleUrls: ['./scopes.page.scss'],
	templateUrl: './scopes.page.html'
})

export class ScopesPage implements OnInit, OnDestroy {

	constructor(private service: ScopesService) { }

	public scopes: MatTableDataSource<any> = new MatTableDataSource<any>();
	public columns: string[] = ['app', 'url', 'description', 'options'];
	public loading: boolean;

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			filter: [
				'url',
				'app',
				'role',
				'appId',
				'roles',
				'scopeId',
				'description'
			],
			limit: 1000000
		});

		if (response.ok) {
			this.scopes.data = response.result;
		} else {
			this.scopes.data = [];
		}

		this.loading = false;
	}

	public async options(app) { }

	ngOnInit(): void {
		this.list();
	}

	ngOnDestroy(): void { }

}
