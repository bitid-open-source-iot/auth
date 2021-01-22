import { Scope } from 'src/app/classes/scope';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ScopesService } from 'src/app/services/scopes/scopes.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'scopes-page',
	styleUrls: ['./scopes.page.scss'],
	templateUrl: './scopes.page.html'
})

export class ScopesPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private sheet: OptionsService, private config: ConfigService, private router: Router, private confirm: ConfirmService, private buttons: ButtonsService, private service: ScopesService) { }

	public scopes: MatTableDataSource<any> = new MatTableDataSource<any>();
	public columns: string[] = ['app', 'url', 'description', 'options'];
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
			]
		});

		if (response.ok) {
			this.scopes.data = response.result.map(scope => new Scope(scope));
		} else {
			this.scopes.data = [];
		}

		this.loading = false;
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

	ngOnInit(): void {
		this.buttons.show('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/scopes', 'editor'], {
				queryParams: {
					mode: 'add'
				}
			});
		});

		this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				this.list();
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.add.unsubscribe();
		this.subscriptions.loaded.unsubscribe();
	}

}
