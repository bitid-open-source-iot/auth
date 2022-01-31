import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

/* --- CLASSES --- */
import { Token } from 'src/app/classes/token';

/* --- SERVICES --- */
import { ToastService } from 'src/app/services/toast/toast.service';
import { TokensService } from 'src/app/services/tokens/tokens.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
	selector: 'tokens-viewer-page',
	styleUrls: ['./viewer.page.scss'],
	templateUrl: './viewer.page.html'
})

export class TokensViewerPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, private config: ConfigService, private router: Router, public service: TokensService) { }

	public token: Token = new Token();
	public loading: boolean = false;
	public tokenId: string | undefined;
	private observers: any = {};

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'app',
				'appId',
				'token',
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
		};

		this.loading = false;
	}

	ngOnInit(): void {
		this.observers.loaded = this.config.loaded.subscribe(async (loaded) => {
			if (loaded) {
				const params: any = this.route.snapshot.queryParams;
				this.tokenId = params.tokenId;
				this.get();
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.loaded?.unsubscribe();
	}

}
