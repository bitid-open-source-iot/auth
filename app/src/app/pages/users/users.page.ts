import { Account } from 'src/app/classes/account';
import { MatSort } from '@angular/material/sort';
import { UsersService } from 'src/app/services/users/users.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, ViewChild, OnDestroy } from '@angular/core';

@Component({
	selector: 'users-page',
	styleUrls: ['./users.page.scss'],
	templateUrl: './users.page.html'
})

export class UsersPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, {'static': true}) private sort: MatSort;

	constructor(private config: ConfigService, private buttons: ButtonsService, private service: UsersService) { }

	public users: MatTableDataSource<any> = new MatTableDataSource<any>();
	public columns: string[] = ['namefirst', 'namemiddle', 'namelast', 'email', 'numbertel', 'numbercell', 'validated'];
	public loading: boolean;
	private subscriptions: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			filter: [
				'name',
				'email',
				'userId',
				'number',
				'address',
				'picture',
				'language',
				'timezone',
				'username',
				'identification'
			]
		});

		if (response.ok) {
			this.users.data = response.result.map(account => new Account(account));
		} else {
			this.users.data = [];
		}

		this.loading = false;
	}

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.sort.active = 'name-first'
		this.sort.direction = 'asc';
		this.users.sort = this.sort;

		this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				this.list();
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.loaded.unsubscribe();
	}

}
