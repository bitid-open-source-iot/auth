import { Token } from 'src/app/classes/token';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { TokensService } from 'src/app/services/tokens/tokens.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'tokens-page',
	styleUrls: ['./tokens.page.scss'],
	templateUrl: './tokens.page.html'
})

export class TokensPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private sheet: OptionsService, private config: ConfigService, private router: Router, private confirm: ConfirmService, private service: TokensService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

	public tokens: MatTableDataSource<Token> = new MatTableDataSource<Token>();
	public columns: string[] = ['icon', 'app', 'description', 'expiry', 'options'];
	public loading: boolean;
	private subscriptions: any = { };

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
				'description'
			]
		});

		if (response.ok) {
			this.tokens.data = response.result.map(token => new Token(token));
		} else {
			this.tokens.data = [];
		}

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
						this.router.navigate(['/tokens', 'generate'], {
							queryParams: {
								mode: 'copy',
								tokenId: token.tokenId
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

	ngOnInit(): void {
		this.buttons.show('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/tokens', 'generate'], {
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
