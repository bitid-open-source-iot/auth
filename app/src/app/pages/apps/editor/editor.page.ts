import { App } from 'src/app/classes/app';
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'apps-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class AppsEditorpage implements OnInit, OnDestroy {

	constructor(private toast: ToastService, private route: ActivatedRoute, private config: ConfigService, private router: Router, private buttons: ButtonsService, private service: AppsService) { }

	public mode: string;
	public appId: string;
	public loading: boolean;
	private subscriptions: any = { };

	private async get() {
		this.loading = true;

		const response =  await this.service.get({
			appId: this.appId
		});

		if (response.ok) {
			const app = new App(response.result);
			debugger;
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
			this.router.navigate(['/apps']);
		});

		this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				const params = this.route.snapshot.queryParams;
				this.mode = params.mode;
				this.appId = params.appId;
				if (this.mode != 'add') {
					this.get();
				}
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.close.unsubscribe();
		this.subscriptions.loaded.unsubscribe();
	}

}
