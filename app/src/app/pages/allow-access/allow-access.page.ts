import { MatDialog } from '@angular/material/dialog';
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AcceptDialog } from './accept/accept.dialog';

@Component({
	selector: 'allow-access-page',
	styleUrls: ['./allow-access.page.scss'],
	templateUrl: './allow-access.page.html'
})

export class AllowAccessPage implements OnInit, OnDestroy {

	constructor(private route: ActivatedRoute, private toast: ToastService, private dialog: MatDialog, private config: ConfigService, private formerror: FormErrorService, private buttons: ButtonsService, private service: AppsService, private localstorage: LocalstorageService) { }

	public form: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.email, Validators.required]),
		password: new FormControl('', [Validators.required])
	});
	public errors: any = {
		email: '',
		password: ''
	};
	public app: any = {};
	public url: string;
	public appId: string;
	public returl: string;
	public loading: boolean;
	private subscriptions: any = {};

	private async load() {
		this.loading = true;

		const response = await this.service.load({
			filter: [
				'icon',
				'name',
				'scopes'
			],
			appId: this.appId
		});

		this.loading = false;

		if (response.ok) {
			this.app = response.result;
		} else {
			this.toast.show('Issue loading app!');
		}
	}

	public async submit() {
		this.loading = true;

		this.form.disable();

		this.localstorage.set('email', this.form.value.email);

		const expiry = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

		const response = await this.service.allowaccess({
			appId: this.appId,
			email: this.form.value.email,
			expiry,
			scopes: this.app.scopes,
			password: this.form.value.password,
			description: this.app.name + ' (LOGIN)'
		});

		this.form.enable();

		this.loading = false;

		if (response.ok) {
			if (!response.result.user.privacyPolicy || !response.result.user.termsAndConditions) {
				this.accept();
			} else {
				this.url = [this.returl, '?', 'email=', this.form.value.email, '&', 'tokenId=', response.result.tokenId].join('');
				window.open(this.url, '_parent');
			};
		} else {
			this.toast.show(response.error.message);
		}
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
	};

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.subscriptions.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		this.subscriptions.config = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				const params = this.route.snapshot.queryParams;
				this.appId = params.appId;
				this.returl = params.returl;
				if (typeof (params.email) != 'undefined' && params.email !== null) {
					this.form.controls.email.setValue(params.email);
				}
				this.load();
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.form.unsubscribe();
		this.subscriptions.config.unsubscribe();
	}

}
