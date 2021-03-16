import { Account } from 'src/app/classes/account';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users/users.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { UsersFilterDialog } from './filter/filter.dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, ViewChild, OnDestroy } from '@angular/core';

@Component({
	selector: 'users-page',
	styleUrls: ['./users.page.scss'],
	templateUrl: './users.page.html'
})

export class UsersPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(private config: ConfigService, private dialog: MatDialog, private buttons: ButtonsService, private filters: FiltersService, private service: UsersService) { }

	public filter: any = this.filters.get({
		validated: []
	});
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
				'validated'
			],
			validated: this.filter.validated
		});

		if (response.ok) {
			this.users.data = response.result.map(account => new Account(account));
		} else {
			this.users.data = [];
		}

		this.loading = false;
	}

    public unfilter(key, value) {
        this.filter[key] = this.filter[key].filter(o => o != value);
        this.filters.update(this.filter);
        this.list();
    }

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.hide('close');
		this.buttons.show('filter');
		this.buttons.show('search');

		this.sort.active = 'name-first';
		this.sort.direction = 'asc';
		this.users.sort = this.sort;

		this.subscriptions.loaded = this.config.loaded.subscribe(async loaded => {
			if (loaded) {
				await this.list();
			}
		});

        this.subscriptions.search = this.buttons.search.value.subscribe(value => {
            this.users.filter = value;
        });

        this.subscriptions.filter = this.buttons.filter.click.subscribe(async event => {
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
        });
	}

	ngOnDestroy(): void {
		this.buttons.reset('search');
		this.subscriptions.loaded.unsubscribe();
		this.subscriptions.search.unsubscribe();
		this.subscriptions.filter.unsubscribe();
	}

}
