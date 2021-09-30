import * as moment from 'moment';
import { App } from 'src/app/classes/app';
import { Token } from 'src/app/classes/token';
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TokensService } from 'src/app/services/tokens/tokens.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'generate-token-page',
	styleUrls: ['./generate.page.scss'],
	templateUrl: './generate.page.html'
})

export class GenerateTokenPage implements OnInit, OnDestroy {

	constructor(public apps: AppsService, private toast: ToastService, private route: ActivatedRoute, private config: ConfigService, private router: Router, private buttons: ButtonsService, public service: TokensService) { }

	public form: FormGroup = new FormGroup({
		appId: new FormControl(null, [Validators.required]),
		expiry: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required])
	});
	public errors: any = {
		appId: '',
		expiry: '',
		description: ''
	};
	public filter: FormGroup = new FormGroup({
		apps: new FormControl('', [Validators.required])
	});
	public loading: boolean;
	public tokenId: string;
	private subscriptions: any = {};

	private async get() {
		this.loading = true;

		const response = await this.service.get({
			filter: [
				'role',
				'appId',
				'expiry',
				'description'
			],
			tokenId: this.tokenId
		});

		if (response.ok) {
			const token = new Token(response.result);
			if (token.role >= 2) {
				this.form.controls.appId.setValue(token.appId);
				this.form.controls.expiry.setValue(moment(token.expiry).format('YYYY-MM-DDTHH:mm'));
				this.form.controls.description.setValue(token.description);
			} else {
				this.toast.show('You have insufficient rights to edit this token!');
				this.router.navigate(['/tokens']);
			}
		} else {
			this.toast.show(response.error.message);
			this.router.navigate(['/tokens']);
		}

		this.loading = false;
	}

	private async load() {
		this.loading = true;

		const response = await this.apps.list({
			filter: [
				'role',
				'name',
				'icon',
				'appId'
			]
		});

		if (response.ok) {
			this.apps.data = response.result.map(app => new App(app));
		} else {
			this.apps.data = [];
			this.toast.show(response.error.message);
		}

		this.loading = false;
	}

	public async submit() {
		this.loading = true;

		const response = await this.service.generate({
			appId: this.form.value.appId,
			expiry: this.form.value.expiry,
			description: this.form.value.description
		});

		if (response.ok) {
			this.router.navigate(['/tokens']);
		} else {
			this.toast.show(response.error.message);
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

		this.subscriptions.loaded = this.config.loaded.subscribe(async loaded => {
			if (loaded) {
				this.tokenId = this.route.snapshot.queryParams.tokenId;
				if (typeof(this.tokenId) != 'undefined' && this.tokenId != null) {
					await this.get();
					await this.load();
				} else {
					await this.load();
				}
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.close.unsubscribe();
		this.subscriptions.loaded.unsubscribe();
	}

}
