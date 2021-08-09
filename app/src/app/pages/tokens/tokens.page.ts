import { App } from 'src/app/classes/app';
import { Token } from 'src/app/classes/token';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatDialog } from '@angular/material/dialog';
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { TokensService } from 'src/app/services/tokens/tokens.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { FiltersService } from 'src/app/services/filters/filters.service';
import { MatTableDataSource } from '@angular/material/table';
import { TokensFilterDialog } from './filter/filter.dialog';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, ViewChild, OnDestroy } from '@angular/core';

@Component({
	selector: 'tokens-page',
	styleUrls: ['./tokens.page.scss'],
	templateUrl: './tokens.page.html'
})

export class TokensPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, { static: true }) private sort: MatSort;

	constructor(public apps: AppsService, private toast: ToastService, private dialog: MatDialog, private sheet: OptionsService, private config: ConfigService, private filters: FiltersService, private router: Router, private confirm: ConfirmService, private service: TokensService, private buttons: ButtonsService, private clipboard: Clipboard, private localstorage: LocalstorageService) { }

	public filter: any = this.filters.get({
		appId: []
	});
	public tokens: MatTableDataSource<Token> = new MatTableDataSource<Token>();
	public tokenId: string;
	public columns: string[] = ['icon', 'app', 'description', 'expiry', 'disabled', 'options'];
	public loading: boolean;
	private subscriptions: any = {};

	public locked() {
		this.toast.show('This token has been locked as it is your current login token!');
	}

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			filter: [
				'app',
				'role',
				'device',
				'scopes',
				'expiry',
				'tokenId',
				'disabled',
				'description'
			],
			appId: this.filter.appId
		});

		if (response.ok) {
			this.tokens.data = response.result.map(token => new Token(token));
		} else {
			this.tokens.data = [];
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
	
	public async disable(token: Token) {
		this.loading = true;

		const response = await this.service.update({
			tokenId: token.tokenId,
			disabled: !token.disabled
		});

		if (response.ok) {
			token.disabled = !token.disabled;
		} else {
			this.toast.show(response.error.message);
		};

		this.loading = false;
	}

	public async options(token: Token) {
		this.sheet.show({
			role: token.role,
			title: token.description,
			options: [
				{
					icon: 'launch',
					title: 'View',
					handler: async () => {
						this.router.navigate(['/tokens', 'view'], {
							queryParams: {
								tokenId: token.tokenId
							}
						});
					},
					disabled: [0]
				},
				{
					icon: 'content_copy',
					title: 'Copy',
					handler: async () => {
						this.loading = true;

						const response = await this.service.download({
							tokenId: token.tokenId
						});

						if (response.ok) {
							this.clipboard.copy(JSON.stringify(response.result))
							this.toast.show('Token was copied to clipboard!');
						} else {
							this.toast.show(response.error.message);
						}

						this.loading = false;
					},
					disabled: [0, 1]
				},
				{
					icon: 'people',
					title: 'Subscribers',
					handler: async () => {
						this.router.navigate(['/subscribers'], {
							queryParams: {
								id: token.tokenId,
								type: 'token'
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
							message: 'Are you sure you want to unsubscribe from ' + token.description + '?',
							handler: async () => {
								this.loading = true;

								const response = await this.service.unsubscribe({
									email: this.localstorage.get('email'),
									tokenId: token.tokenId
								});

								if (response.ok) {
									for (let i = 0; i < this.tokens.data.length; i++) {
										if (this.tokens.data[i].tokenId == token.tokenId) {
											this.tokens.data.splice(i, 1);
											this.toast.show('You were unsubscribed!');
											break;
										}
									}
									this.tokens.data = JSON.parse(JSON.stringify(this.tokens.data));
								} else {
									this.toast.show(response.error.message);
								}

								this.loading = false;
							}
						});
					},
					disabled: [5]
				},
				{
					icon: 'delete',
					title: 'Revoke',
					danger: true,
					handler: async () => {
						this.confirm.show({
							message: 'Are you sure you want to revoke ' + token.description + '?',
							handler: async () => {
								this.loading = true;

								const response = await this.service.revoke({
									tokenId: token.tokenId
								});

								if (response.ok) {
									for (let i = 0; i < this.tokens.data.length; i++) {
										if (this.tokens.data[i].tokenId == token.tokenId) {
											this.tokens.data.splice(i, 1);
											this.toast.show('Token was revoked!');
											break;
										}
									}
									this.tokens.data = JSON.parse(JSON.stringify(this.tokens.data));
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

		this.tokens.sort = this.sort;
		this.tokens.sort.active = 'expiry';
		this.tokens.sort.direction = 'desc';

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/tokens', 'generate'], {
				queryParams: {
					mode: 'add'
				}
			});
		});

		this.subscriptions.loaded = this.config.loaded.subscribe(async loaded => {
			if (loaded) {
				await this.list();
				await this.load();
				this.tokenId = this.localstorage.get('tokenId', null);
			}
		});

		this.subscriptions.search = this.buttons.search.value.subscribe(value => {
			this.tokens.filter = value;
		});

		this.subscriptions.filter = this.buttons.filter.click.subscribe(async event => {
			const dialog = await this.dialog.open(TokensFilterDialog, {
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
