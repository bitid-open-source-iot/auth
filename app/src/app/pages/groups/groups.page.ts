import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, ViewChild, OnDestroy } from '@angular/core';

/* --- CLASSES --- */
import { App } from 'src/app/classes/app';
import { Group } from 'src/app/classes/group';

/* --- DIALOGS --- */
import { GroupsFilterDialog } from './filter/filter.dialog';

/* --- SERVICES --- */
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

/* --- COMPONENTS --- */
import { SearchComponent } from 'src/app/libs/search/search.component';

@Component({
	selector: 'groups-page',
	styleUrls: ['./groups.page.scss'],
	templateUrl: './groups.page.html'
})

export class GroupsPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort = new MatSort();
	@ViewChild(SearchComponent, { static: true }) private search?: SearchComponent;

	constructor(public apps: AppsService, private toast: ToastService, private config: ConfigService, private dialog: MatDialog, private sheet: OptionsService, private router: Router, private filters: FiltersService, private confirm: ConfirmService, private service: GroupsService, private localstorage: LocalStorageService) { }

	public filter: any = this.filters.get({
		appId: []
	});
	public groups: MatTableDataSource<Group> = new MatTableDataSource<Group>();
	public loading: boolean = false;
	private observers: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			filter: [
				'role',
				'appId',
				'groupId',
				'description'
			],
			appId: this.filter.appId
		});

		if (response.ok) {
			this.groups.data = response.result.map((o: Group) => new Group(o));
		} else {
			this.groups.data = [];
		};

		this.loading = false;
	}

	private async load() {
		this.loading = true;

		const apps = await this.apps.list({
			filter: [
				'name',
				'appId'
			],
			private: [true, false]
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

	public async options(group: Group) {
		this.sheet.show({
			role: group.role,
			title: group.description,
			options: [
				{
					icon: 'edit',
					title: 'Edit',
					handler: async () => {
						this.router.navigate(['/groups', 'editor'], {
							queryParams: {
								mode: 'update',
								groupId: group.groupId
							}
						});
					},
					disabled: [0, 1]
				},
				{
					icon: 'content_copy',
					title: 'Copy',
					handler: async () => {
						this.router.navigate(['/groups', 'editor'], {
							queryParams: {
								mode: 'copy',
								groupId: group.groupId
							}
						});
					},
					disabled: [0, 1]
				},
				{
					icon: 'people',
					title: 'Subscribers',
					handler: async () => {
						this.router.navigate(['/subscribers'], {
							queryParams: {
								id: group.groupId,
								type: 'group'
							}
						});
					},
					disabled: [0, 1, 2, 3]
				},
				{
					icon: 'remove',
					title: 'Unubscribe',
					danger: true,
					handler: async () => {
						this.confirm.show({
							message: 'Are you sure you want to unsubscribe from ' + group.description + '?',
							handler: async () => {
								this.loading = true;

								const response = await this.service.unsubscribe({
									id: this.localstorage.get('userId'),
									type: 'user',
									groupId: group.groupId
								});

								if (response.ok) {
									for (let i = 0; i < this.groups.data.length; i++) {
										if (this.groups.data[i].groupId == group.groupId) {
											this.groups.data.splice(i, 1);
											this.toast.show('You were unsubscribed!');
											break;
										};
									};
									this.groups.data = this.groups.data.map((o: Group) => new Group(o));
								} else {
									this.toast.show(response.error.message);
								};

								this.loading = false;
							}
						});
					},
					disabled: [5]
				},
				{
					icon: 'delete',
					title: 'Delete',
					danger: true,
					handler: async () => {
						this.confirm.show({
							message: 'Are you sure you want to delete ' + group.description + '?',
							handler: async () => {
								this.loading = true;

								const response = await this.service.delete({
									groupId: group.groupId
								});

								if (response.ok) {
									for (let i = 0; i < this.groups.data.length; i++) {
										if (this.groups.data[i].groupId == group.groupId) {
											this.groups.data.splice(i, 1);
											this.toast.show('Group was removed!');
											break;
										};
									};
									this.groups.data = this.groups.data.map((o: Group) => new Group(o));
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
		const dialog = await this.dialog.open(GroupsFilterDialog, {
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
		this.groups.sort = this.sort;
		this.groups.sort.active = 'name';
		this.groups.sort.direction = 'asc';

		this.observers.loaded = this.config.loaded.subscribe(async (loaded) => {
			if (loaded) {
				await this.load();
				await this.list();
			};
		});

		this.observers.search = this.search?.change.subscribe(value => {
			this.groups.filter = value;
		});
	}

	ngOnDestroy(): void {
		this.observers.loaded?.unsubscribe();
		this.observers.search?.unsubscribe();
	}

}
