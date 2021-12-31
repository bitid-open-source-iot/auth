import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, ViewChild, OnDestroy } from '@angular/core';

/* --- CLASSES --- */
import { App } from 'src/app/classes/app';
import { Feature } from 'src/app/classes/feature';

/* --- DIALOGS --- */
import { FeaturesFilterDialog } from './filter/filter.dialog';

/* --- SERVICES --- */
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { FeaturesService } from 'src/app/services/features/features.service';

/* --- COMPONENTS --- */
import { SearchComponent } from 'src/app/libs/search/search.component';

@Component({
	selector: 'features-page',
	styleUrls: ['./features.page.scss'],
	templateUrl: './features.page.html'
})

export class FeaturesPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort = new MatSort();
	@ViewChild(SearchComponent, { static: true }) private search?: SearchComponent;

	constructor(public apps: AppsService, private toast: ToastService, private dialog: MatDialog, private sheet: OptionsService, private config: ConfigService, private filters: FiltersService, private router: Router, private confirm: ConfirmService, private service: FeaturesService) { }

	public filter: any = this.filters.get({
		appId: []
	});
	public loading: boolean = false;
	public features: MatTableDataSource<Feature> = new MatTableDataSource<Feature>();
	private observers: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			filter: [
				'icon',
				'role',
				'title',
				'featureId',
				'description'
			],
			appId: this.filter.appId
		});

		if (response.ok) {
			this.features.data = response.result.map((o: Feature) => new Feature(o));
		} else {
			this.features.data = [];
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

	public async OpenFilter() {
		const dialog = await this.dialog.open(FeaturesFilterDialog, {
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

	public async options(feature: Feature) {
		this.sheet.show({
			role: feature.role,
			title: feature.title,
			options: [
				{
					icon: 'edit',
					title: 'Edit',
					handler: async () => {
						this.router.navigate(['/features', 'editor'], {
							queryParams: {
								mode: 'update',
								featureId: feature.featureId
							}
						});
					},
					disabled: [0, 1]
				},
				{
					icon: 'content_copy',
					title: 'Copy',
					handler: async () => {
						this.router.navigate(['/features', 'editor'], {
							queryParams: {
								mode: 'copy',
								featureId: feature.featureId
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
							message: 'Are you sure you want to delete ' + feature.title + '?',
							handler: async () => {
								this.loading = true;

								const response = await this.service.delete({
									featureId: feature.featureId
								});

								if (response.ok) {
									for (let i = 0; i < this.features.data.length; i++) {
										if (this.features.data[i].featureId == feature.featureId) {
											this.features.data.splice(i, 1);
											this.toast.show('Feature was removed!');
											break;
										};
									};
									this.features.data = this.features.data.map((o: Feature) => new Feature(o));
								} else {
									this.toast.show(response.error.message);
								};

								this.loading = false;
							}
						});
					},
					disabled: [0, 1]
				}
			]
		});
	}

	public unfilter(key: string, value: any) {
		this.filter[key] = this.filter[key].filter((o: any) => o != value);
		this.filters.update(this.filter);
		this.list();
	}

	ngOnInit(): void {
		this.features.sort = this.sort;
		this.features.sort.active = 'title';
		this.features.sort.direction = 'asc';

		this.observers.loaded = this.config.loaded.subscribe(async (loaded) => {
			if (loaded) {
				await this.load();
				await this.list();
			};
		});

		this.observers.search = this.search?.change.subscribe(value => {
			this.features.filter = value;
		});
	}

	ngOnDestroy(): void {
		this.observers.loaded?.unsubscribe();
		this.observers.search?.unsubscribe();
	}

}
