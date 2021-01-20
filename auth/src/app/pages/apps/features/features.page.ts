import { ConfigService } from 'src/app/services/config/config.service';
import { ActivatedRoute } from '@angular/router';
import { FeaturesService } from 'src/app/services/features/features.service';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-features-page',
	styleUrls: ['./features.page.scss'],
	templateUrl: './features.page.html'
})

export class AppFeaturesPage implements OnInit, OnDestroy {

	constructor(private route: ActivatedRoute, private config: ConfigService, private service: FeaturesService) { }

	public appId: string;
	public features: MatTableDataSource<any> = new MatTableDataSource<any>();
	public columns: string[] = ['title', 'description', 'options'];
	public loading: boolean;
	private subscriptions: any = {};

	private async list() {
		this.loading = true;

		const response = await this.service.list({
			filter: [
				'icon',
				'role',
				'title',
				'featureId',
				'description'
			],
			appId: this.appId
		});

		if (response.ok) {
			this.features.data = response.result;
		} else {
			this.features.data = [];
		}

		this.loading = false;
	}

	public async options(app) { }

	ngOnInit(): void {
		this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				const params = this.route.snapshot.queryParams;
				this.appId = params.appId;
				this.list();
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.loaded.unsubscribe();
	}

}
