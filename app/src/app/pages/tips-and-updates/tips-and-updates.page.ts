import { App } from 'src/app/classes/app';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { TipUpdate } from 'src/app/classes/tip-update';
import { MatDialog } from '@angular/material/dialog';
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { MatTableDataSource } from '@angular/material/table';
import { TipsAndUpdatesService } from 'src/app/services/tips-and-updates/tips-and-updates.service';
import { TipsAndUpdatesFilterDialog } from './filter/filter.dialog';
import { OnInit, Component, ViewChild, OnDestroy } from '@angular/core';

@Component({
	selector: 'tips-and-updates-page',
	styleUrls: ['./tips-and-updates.page.scss'],
	templateUrl: './tips-and-updates.page.html'
})

export class TipsAndUpdatesPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, {static: true}) private sort: MatSort = new MatSort();

	constructor(public apps: AppsService, private toast: ToastService, private dialog: MatDialog, private sheet: OptionsService, private config: ConfigService, private filters: FiltersService, private router: Router, private confirm: ConfirmService, private service: TipsAndUpdatesService) { }

	public filter: any = this.filters.get({
		appId: []
	});
	public table: MatTableDataSource<TipUpdate> = new MatTableDataSource<TipUpdate>();
	public columns: string[] = ['title', 'subtitle', 'options'];
	public loading: boolean = false;
	private observers: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			filter: [
				'icon',
				'role',
				'title',
				'itemId',
				'subtitle'
			],
			appId: this.filter.appId
		});

		if (response.ok) {
			this.table.data = response.result.map((o: TipUpdate) => new TipUpdate(o));
		} else {
			this.table.data = [];
		};

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
		};

		this.loading = false;
	}

    public unfilter(key: string, value: any) {
        this.filter[key] = this.filter[key].filter((o: any) => o != value);
        this.filters.update(this.filter);
        this.list();
    }

	public async options(item: TipUpdate) {
		this.sheet.show({
			role: item.role,
			title: item.title,
			options: [
				{
					icon: 'edit',
					title: 'Edit',
					handler: async () => {
						this.router.navigate(['/tips-and-updates', 'editor'], {
							queryParams: {
								mode: 'update',
								itemId: item.itemId
							}
						});
					},
					disabled: [0, 1]
				},
				{
					icon: 'content_copy',
					title: 'Copy',
					handler: async () => {
						this.router.navigate(['/tips-and-updates', 'editor'], {
							queryParams: {
								mode: 'copy',
								itemId: item.itemId
							}
						});
					},
					disabled: [0, 1]
				},
				{
					icon: 'delete',
					title: 'Delete',
					danger: true,
					handler: async () => {
						this.confirm.show({
							message: 'Are you sure you want to delete ' + item.title + '?',
							handler: async () => {
								this.loading = true;

								const response = await this.service.delete({
									itemId: item.itemId
								});

								if (response.ok) {
									for (let i = 0; i < this.table.data.length; i++) {
										if (this.table.data[i].itemId == item.itemId) {
											this.table.data.splice(i, 1);
											this.toast.show('Item was removed!');
											break;
										}
									}
									this.table.data = this.table.data.map(o => new TipUpdate(o));
								} else {
									this.toast.show(response.error.message);
								}

								this.loading = false;
							}
						});
					},
					disabled: [0, 1, 2, 3, 4]
				}
			]
		});
	}

    public describe(array: any[], key: string, id: string) {
        let result = '-';
        array.map(o => {
            if (o[key] == id) {
                result = o.name;
            }
        });
        return result;
    }

	public async OpenFilter() {
		const dialog = await this.dialog.open(TipsAndUpdatesFilterDialog, {
			data: this.filter,
			panelClass: 'filter-dialog'
		});

		await dialog.afterClosed().subscribe(async (result) => {
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
		this.table.sort = this.sort;
		this.table.sort.active = 'title';
		this.table.sort.direction = 'asc';

		this.observers.loaded = this.config.loaded.subscribe(async loaded => {
			if (loaded) {
				await this.list();
				await this.load();
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.loaded?.unsubscribe();
	}

}
