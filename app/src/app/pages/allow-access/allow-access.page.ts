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
		appId: environment.appId,
		privacyPolicy: environment.urlPrivacyPolicy,
		termsAndConditions: environment.urlTermsAndConditions
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
			appId: this.app.appId,
			expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
			description: this.app.name
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
				this.app.privacyPolicy = environment.urlPrivacyPolicy;
				this.app.termsAndConditions = environment.urlTermsAndConditions;

				const params: any = this.route.snapshot.queryParams;

				if (typeof (params.returl) != 'undefined' && params.returl != null) {
					this.returl = params.returl;
					this.app.appId = params.appId;
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