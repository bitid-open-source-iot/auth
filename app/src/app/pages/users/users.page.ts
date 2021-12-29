import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, ViewChild, OnDestroy } from '@angular/core';

/* --- CLASSES --- */
import { Account } from 'src/app/classes/account';

/* --- DIALOGS --- */
import { UsersFilterDialog } from './filter/filter.dialog';

/* --- SERVICES --- */
import { UsersService } from 'src/app/services/users/users.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { FiltersService } from 'src/app/services/filters/filters.service';

@Component({
	selector: 'users-page',
	styleUrls: ['./users.page.scss'],
	templateUrl: './users.page.html'
})

export class UsersPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort = new MatSort();

	constructor(private config: ConfigService, private dialog: MatDialog, private filters: FiltersService, private service: UsersService) { }

	public filter: any = this.filters.get({
		validated: []
	});
	public users: MatTableDataSource<any> = new MatTableDataSource<any>();
	public columns: string[] = ['name.first', 'name.middle', 'name.last', 'email', 'number.tel', 'number.mobile', 'validated'];
	public loading: boolean = false;
	private observers: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			filter: [
				'name',
				'email',
				'userId',
				'number',
				'validated'
			],
			validated: this.filter.validated
		});

		if (response.ok) {
			this.users.data = response.result.map((o: Account) => new Account(o));
		} else {
			this.users.data = [];
		};

		this.loading = false;
	}

	public unfilter(key: string, value: any) {
		this.filter[key] = this.filter[key].filter((o: any) => o != value);
		this.filters.update(this.filter);
		this.list();
	}

	public async OpenFilter() {
		const dialog = await this.dialog.open(UsersFilterDialog, {
			data: this.filter,
			panelClass: 'filter-dialog'
		});

		await dialog.afterClosed().subscribe(async result => {
			if (result) {
				Object.keys(result).map(key => {
					this.filter[key] = result[key];
				});
				this.filters.update(this.filter);
				this.list();
			};
		});
	}

	ngOnInit(): void {
		this.sort.active = 'name-first';
		this.sort.direction = 'asc';
		this.users.sort = this.sort;

		this.observers.loaded = this.config.loaded.subscribe(async (loaded) => {
			if (loaded) {
				await this.list();
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.loaded?.unsubscribe();
	}

}
