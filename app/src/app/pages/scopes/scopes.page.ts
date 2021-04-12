import { App } from 'src/app/classes/app';
import { Scope } from 'src/app/classes/scope';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ScopesService } from 'src/app/services/scopes/scopes.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { MatTableDataSource } from '@angular/material/table';
import { ScopesFilterDialog } from './filter/filter.dialog';
import { OnInit, Component, ViewChild, OnDestroy } from '@angular/core';

@Component({
	selector: 'scopes-page',
	styleUrls: ['./scopes.page.scss'],
	templateUrl: './scopes.page.html'
})

export class ScopesPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, {static: true}) private sort: MatSort;

	constructor(public apps: AppsService, private toast: ToastService, private dialog: MatDialog, private sheet: OptionsService, private config: ConfigService, private router: Router, private confirm: ConfirmService, private filters: FiltersService, private buttons: ButtonsService, private service: ScopesService) { }

	public filter: any = this.filters.get({
		appId: []
	});
	public scopes: MatTableDataSource<any> = new MatTableDataSource<any>();
	public columns: string[] = ['app.name', 'url', 'description', 'options'];
	public loading: boolean;
	private subscriptions: any = {};

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
			appId: this.filter.appId
		});

		if (response.ok) {
			this.scopes.data = response.result.map(scope => new Scope(scope));
		} else {
			this.scopes.data = [];
		}

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
			this.apps.data = apps.result.map(o => new App(o));
		} else {
			this.apps.data = [];
		}

		this.loading = false;
	}

    public unfilter(key, value) {
        this.filter[key] = this.filter[key].filter(o => o != value);
        this.filters.update(this.filter);
        this.list();
    }

	public async options(scope: Scope) {
		this.sheet.show({
			role: scope.role,
			title: scope.url,
			options: [
				{
					icon: 'edit',
					title: 'Edit',
					handler: async () => {
						this.router.navigate(['/scopes', 'editor'], {
							queryParams: {
								mode: 'update',
								scopeId: scope.scopeId
							}
						});
					},
					disabled: [0, 1]
				},
				{
					icon: 'content_copy',
					title: 'Copy',
					handler: async () => {
						this.router.navigate(['/scopes', 'editor'], {
							queryParams: {
								mode: 'copy',
								scopeId: scope.scopeId
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
							message: 'Are you sure you want to delete ' + scope.url + '?',
							handler: async () => {
								this.loading = true;

								const response = await this.service.delete({
									scopeId: scope.scopeId
								});

								if (response.ok) {
									for (let i = 0; i < this.scopes.data.length; i++) {
										if (this.scopes.data[i].scopeId == scope.scopeId) {
											this.scopes.data.splice(i, 1);
											this.toast.show('Scope was removed!');
											break;
										}
									}
									this.scopes.data = JSON.parse(JSON.stringify(this.scopes.data));
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

	ngOnInit(): void {
		this.buttons.show('add');
		this.buttons.hide('close');
		this.buttons.show('filter');
		this.buttons.show('search');

		this.scopes.sort = this.sort;
		this.scopes.sort.active = 'url';
		this.scopes.sort.direction = 'asc';

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/scopes', 'editor'], {
				queryParams: {
					mode: 'add'
				}
			});
		});

		this.subscriptions.loaded = this.config.loaded.subscribe(async loaded => {
			if (loaded) {
				await this.list();
				await this.load();
			}
		});

        this.subscriptions.search = this.buttons.search.value.subscribe(value => {
            this.scopes.filter = value;
        });

        this.subscriptions.filter = this.buttons.filter.click.subscribe(async event => {
            const dialog = await this.dialog.open(ScopesFilterDialog, {
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
		this.subscriptions.add.unsubscribe();
		this.subscriptions.loaded.unsubscribe();
		this.subscriptions.search.unsubscribe();
		this.subscriptions.filter.unsubscribe();
	}

}
