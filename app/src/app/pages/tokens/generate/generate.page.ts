import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/* --- CLASSES --- */
import { App } from 'src/app/classes/app';
import { Token } from 'src/app/classes/token';

/* --- SERVICES --- */
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TokensService } from 'src/app/services/tokens/tokens.service';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
	selector: 'tokens-generate-page',
	styleUrls: ['./generate.page.scss'],
	templateUrl: './generate.page.html'
})

export class TokensGeneratePage implements OnInit, OnDestroy {

	constructor(public apps: AppsService, private toast: ToastService, private route: ActivatedRoute, private config: ConfigService, private router: Router, private service: TokensService) { }

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
	public loading: boolean = false;
	private observers: any = {};

	private async load() {
		this.loading = true;

		const response = await this.apps.list({
			filter: [
				'role',
				'name',
				'icon',
				'appId'
			],
			private: [true, false]
		});

		if (response.ok) {
			this.apps.data = response.result.map((o: App) => new App(o));
		} else {
			this.apps.data = [];
			this.toast.show(response.error.message);
		};

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
		};

		this.loading = false;
	}

	ngOnInit(): void {
		this.observers.loaded = this.config.loaded.subscribe(async (loaded) => {
			if (loaded) {
				await this.load();
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.loaded?.unsubscribe();
	}

}
