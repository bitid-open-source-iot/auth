import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

/* --- SERVICES --- */
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { TokensService } from 'src/app/services/tokens/tokens.service';
import { AccountService } from 'src/app/services/account/account.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

/* --- ENVIRONMENT --- */
import { environment } from 'src/environments/environment';

@Component({
	selector: 'allow-access-page',
	styleUrls: ['./allow-access.page.scss'],
	templateUrl: './allow-access.page.html'
})

export class AllowAccessPage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, private tokens: TokensService, private router: Router, private config: ConfigService, private account: AccountService, private localstorage: LocalStorageService) { }

	public app = {
		icon: environment.icon,
		name: environment.name,
		privacyPolicy: environment.privacyPolicy,
		termsAndConditions: environment.termsAndConditions
	};
	public url: string | undefined;
	public returl: string | undefined;
	public loading: boolean = false;
	private observers: any = {};

	public async back() {
		window.history.back();
	}

	public async submit() {
		this.loading = true;

		const response = await this.tokens.generate({
			appId: environment.appId,
			expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
			description: environment.name
		});

		if (response.ok) {
			this.url = [this.returl, '?email=', response.result.email, '&userId=', response.result.userId, '&tokenId=', response.result.tokenId].join('');
			window.open(this.url, '_parent');
		} else {
			this.toast.show(response.error.message);
		};

		this.loading = false;
	}

	public async switch() {
		this.localstorage.clear();
		this.router.navigate(['/signin'], {
			queryParams: {
				allowaccess: true
			},
			queryParamsHandling: 'merge'
		});
	}

	private async process() {
		if (!await this.account.validate()) {
			this.router.navigate(['/signin'], {
				queryParams: {
					allowaccess: true
				},
				queryParamsHandling: 'merge'
			});
		};
	}

	ngOnInit(): void {
		this.observers.config = this.config.loaded.subscribe(async (loaded) => {
			if (loaded) {
				this.app.icon = environment.icon;
				this.app.name = environment.name;
				this.app.privacyPolicy = environment.privacyPolicy;
				this.app.termsAndConditions = environment.termsAndConditions;

				if (typeof(this.route.snapshot.queryParams['returl']) != 'undefined' && this.route.snapshot.queryParams['returl'] != null) {
					this.returl = this.route.snapshot.queryParams['returl'];
					await this.process();
				} else {
					await window.alert('Please supply a return url in the query params of your request!');
					window.history.back();
				};
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.config?.unsubscribe();
	}

}