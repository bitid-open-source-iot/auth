import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, ViewChild, OnDestroy } from '@angular/core';

/* --- CLASSES --- */
import { App } from 'src/app/classes/app';

/* --- DIALOGS --- */
import { AppsFilterDialog } from './filter/filter.dialog';

/* --- SERVICES --- */
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

/* --- COMPONENTS --- */
import { SearchComponent } from 'src/app/libs/search/search.component';

@Component({
	selector: 'apps-page',
	styleUrls: ['./apps.page.scss'],
	templateUrl: './apps.page.html'
})

export class AppsPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort = new MatSort();
	@ViewChild(SearchComponent, { static: true }) private search?: SearchComponent;

	constructor(private toast: ToastService, private config: ConfigService, private dialog: MatDialog, private sheet: OptionsService, private router: Router, private filters: FiltersService, private confirm: ConfirmService, private service: AppsService, private localstorage: LocalStorageService) { }

	public apps: MatTableDataSource<App> = new MatTableDataSource<App>();
	public filter: any = this.filters.get({
		private: []
	})
	public columns: string[] = ['icon', 'name', 'private', 'options'];
	public loading: boolean = false;
	private observers: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			filter: [
				'icon',
				'role',
				'name',
				'appId',
				'private'
			],
			private: this.filter.private
		});

		if (response.ok) {
			this.apps.data = response.result.map((o: App) => new App(o));
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

	public async options(app: App) {
		this.sheet.show({
			role: app.role,
			title: app.name,
			options: [
				{
					icon: 'edit',
					title: 'Edit',
					handler: async () => {
						this.router.navigate(['/apps', 'editor'], {
							queryParams: {
								mode: 'update',
								appId: app.appId
							}
						});
					},
					disabled: [0, 1]
				},
				{
					icon: 'content_copy',
					title: 'Copy',
					handler: async () => {
						this.router.navigate(['/apps', 'editor'], {
							queryParams: {
								mode: 'copy',
								appId: app.appId
							}
						});
					},
					disabled: [0, 1]
				},
				{
					icon: 'people',
					title: 'Subscribers',
					handler: async () => {
						this.router.navigate(['/subscribers', 'app', app.appId]);
					},
					disabled: [0, 1, 2, 3]
				},
				{
					icon: 'remove',
					title: 'Unubscribe',
					danger: true,
					handler: async () => {
						this.confirm.show({
							message: 'Are you sure you want to unsubscribe from ' + app.name + '?',
							handler: async () => {
								this.loading = true;

								const response = await this.service.unsubscribe({
									id: this.localstorage.get('userId'),
									type: 'user',
									appId: app.appId
								});

								if (response.ok) {
									for (let i = 0; i < this.apps.data.length; i++) {
										if (this.apps.data[i].appId == app.appId) {
											this.apps.data.splice(i, 1);
											this.toast.show('You were unsubscribed!');
											break;
										};
									};
									this.apps.data = this.apps.data.map((o: App) => new App(o));
								} else {
									this.toast.show(response.error.message);
								};

								this.loading = false;
							}
						});
					},
					disabled: [0, 5]
				},
				{
					icon: 'delete',
					title: 'Delete',
					danger: true,
					handler: async () => {
						this.confirm.show({
							message: 'Are you sure you want to delete ' + app.name + '?',
							handler: async () => {
								this.loading = true;

								const response = await this.service.delete({
									appId: app.appId
								});

								if (response.ok) {
									for (let i = 0; i < this.apps.data.length; i++) {
										if (this.apps.data[i].appId == app.appId) {
											this.apps.data.splice(i, 1);
											this.toast.show('App was removed!');
											break;
										};
									};
									this.apps.data = this.apps.data.map((o: App) => new App(o));
								} else {
									this.toast.show(response.error.message);
								};

								this.loading = false;
							}
						});
					},
					disabled: [0, 1, 2, 3, 4]
				}
			]
		});
	}

	public async OpenFilter() {
		const dialog = await this.dialog.open(AppsFilterDialog, {
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
		this.apps.sort = this.sort;
		this.apps.sort.active = 'name';
		this.apps.sort.direction = 'asc';

		this.observers.loaded = this.config.loaded.subscribe(async (loaded) => {
			if (loaded) {
				await this.list();
			};
		});

		this.observers.search = this.search?.change.subscribe(value => {
			this.apps.filter = value;
		});
	}

	ngOnDestroy(): void {
		this.observers.loaded?.unsubscribe();
		this.observers.search?.unsubscribe();
	}

}
