import { Token } from 'src/app/classes/token';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TokensService } from 'src/app/services/tokens/tokens.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'view-token-page',
	styleUrls: ['./view.page.scss'],
	templateUrl: './view.page.html'
})

export class ViewTokenPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, private config: ConfigService, private router: Router, private buttons: ButtonsService, public service: TokensService) { }

	public token: Token = new Token();
	public loading: boolean;
	public tokenId: string;
	private subscriptions: any = {};

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'app',
				'appId',
				'device',
				'expiry',
				'scopes',
				'tokenId',
				'description'
			],
			tokenId: this.tokenId
		});

		if (response.ok) {
			this.token = new Token(response.result);
		} else {
			this.toast.show(response.error.message);
			this.router.navigate(['/tokens']);
		}

		this.loading = false;
	}

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.show('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.subscriptions.close = this.buttons.close.click.subscribe(event => {
			this.router.navigate(['/tokens']);
		});

		this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				this.tokenId = this.route.snapshot.queryParams.tokenId;
				this.get();
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.close.unsubscribe();
		this.subscriptions.loaded.unsubscribe();
	}

}
