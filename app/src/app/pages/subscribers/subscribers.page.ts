import { AppsService } from 'src/app/services/apps/apps.service';
import { TokensService } from 'src/app/services/tokens/tokens.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'subscribers-page',
	styleUrls: ['./subscribers.page.scss'],
	templateUrl: './subscribers.page.html'
})

export class SubscribersPage implements OnInit, OnDestroy {

	constructor(private apps: AppsService, private route: ActivatedRoute, private buttons: ButtonsService, private tokens: TokensService) { }

	public id: string;
	public role: number;
	public type: string;
	public users: MatTableDataSource<any> = new MatTableDataSource<any>();
	public columns: string[] = ['email', 'role'];
	public loading: boolean;

	private async get() {
		this.loading = true;

		const params: any = {
			filter: [
				'role',
				'users'
			]
		};
		let service: any;

		switch (this.type) {
			case ('app'):
				service = this.apps;
				params.appId = this.id;
				break;
			case ('token'):
				service = this.tokens;
				params.tokenId = this.id;
				break;
		}

		const response = await service.get(params);

		if (response.ok) {
			this.role = response.result.role;
			this.users.data = response.result.users;
		} else {
			this.users.data = [];
		}

		this.loading = false;
	}

	ngOnInit(): void {
		this.buttons.show('add');
		this.buttons.show('close');
		this.buttons.hide('search');
		this.buttons.hide('filter');

		const params = this.route.snapshot.queryParams;
		this.id = params.id;
		this.type = params.type;

		this.get();
	}

	ngOnDestroy(): void { }

}
