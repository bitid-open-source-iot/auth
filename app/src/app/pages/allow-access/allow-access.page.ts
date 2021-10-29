import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

/* --- CLASSES --- */
import { App } from 'src/app/classes/app';

/* --- DIALOGS --- */
import { AcceptDialog } from './accept/accept.dialog';

/* --- SERVICES --- */
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { TokensService } from 'src/app/services/tokens/tokens.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { AccountService } from 'src/app/services/account/account.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';

@Component({
	selector: 'allow-access-page',
	styleUrls: ['./allow-access.page.scss'],
	templateUrl: './allow-access.page.html'
})

export class AllowAccessPage implements OnInit, OnDestroy {

	constructor(private apps: AppsService, private toast: ToastService, private route: ActivatedRoute, private tokens: TokensService, private router: Router, private dialog: MatDialog, private config: ConfigService, private account: AccountService, private buttons: ButtonsService, private localstorage: LocalstorageService) { }

	public app: any = {};
	public url: string;
	public appId: string;
	public returl: string;
	public loading: boolean;
	private subscriptions: any = {};

	private async load() {
		this.loading = true;

		const apps = await this.apps.load({
			filter: [
				'icon',
				'name',
				'scopes'
			],
			appId: this.appId
		});

		this.loading = false;

		if (apps.ok) {
			this.app = new App(apps.result);
		} else {
			this.toast.show('Issue loading app!');
		}
	}

	public async submit() {
		this.loading = true;
	
		const response = await this.tokens.generate({
			appId: this.appId,
			expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
			description: this.app.name + ' (LOGIN)'
		});

		if (response.ok) {
			this.url = [this.returl, '?', 'email=', this.localstorage.get('email'), '&', 'tokenId=', response.result.tokenId].join('');
			window.open(this.url, '_parent');
		} else {
			this.toast.show(response.error.message);
		};

		this.loading = false;
	}

	private async accept() {
		const dialog = await this.dialog.open(AcceptDialog, {
			panelClass: 'accept-dialog',
			disableClose: true
		});

		await dialog.afterClosed().subscribe(async result => {
			if (result) {
				debugger
				window.open(this.url, '_parent');
			};
		});
	}

	public async switch() {
		this.localstorage.clear();
		this.router.navigate(['/signin'], {
			queryParams: {
				appId: this.appId,
				returl: this.returl,
				allowaccess: true
			}
		});
	}

	private async process() {
		this.loading = true;
		
		setTimeout(() => {
			this.loading = false;
			if (this.account.authenticated.value) {
				this.load();
			} else {
				this.router.navigate(['/signin'], {
					queryParams: {
						appId: this.appId,
						returl: this.returl,
						allowaccess: true
					}
				});
			};
		}, 2000);
	}

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.subscriptions.config = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				const params = this.route.snapshot.queryParams;
				this.appId = params.appId;
				this.returl = params.returl;
				this.process();
			};
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.config?.unsubscribe();
	}

}