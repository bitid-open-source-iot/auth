import { App } from 'src/app/classes/app';
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'request-access-page',
	styleUrls: ['./request-access.page.scss'],
	templateUrl: './request-access.page.html'
})

export class RequestAccessPage implements OnInit, OnDestroy {

	constructor(private route: ActivatedRoute, private toast: ToastService, private config: ConfigService, private formerror: FormErrorService, private buttons: ButtonsService, private service: AppsService, private localstorage: LocalstorageService) { }

	public form: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.email, Validators.required]),
		password: new FormControl('', [Validators.required])
	});
	public errors: any = {
		email: '',
		password: ''
	};
	public app: App = new App();
	public appId: string;
	public loading: boolean;
	public requested: boolean;
	private observers: any = {};

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

		const response = await this.service.requestaccess({
			appId: this.appId,
			email: this.form.value.email,
			password: this.form.value.password
		});

		this.form.enable();

		this.loading = false;

		if (response.ok) {
			this.requested = true;
		} else {
			this.requested = false;
			this.toast.show(response.error.message);
		}
	}

	ngOnInit(): void {
		this.buttons.hide('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.observers.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		this.observers.config = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				const params = this.route.snapshot.queryParams;
				this.appId = params.appId;
				if (typeof (params.email) != 'undefined' && params.email !== null) {
					this.form.controls.email.setValue(params.email);
				}
				this.load();
			}
		});
	}

	ngOnDestroy(): void {
		this.observers.form.unsubscribe();
		this.observers.config.unsubscribe();
	}

}
