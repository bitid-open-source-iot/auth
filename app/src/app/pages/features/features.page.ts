import { Router } from '@angular/router';
import { Feature } from 'src/app/classes/feature';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { FeaturesService } from 'src/app/services/features/features.service';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, ViewChild, OnDestroy } from '@angular/core';

@Component({
	selector: 'features-page',
	styleUrls: ['./features.page.scss'],
	templateUrl: './features.page.html'
})

export class FeaturesPage implements OnInit, OnDestroy {

	@ViewChild(MatSort, {static: true}) private sort: MatSort;

	constructor(private toast: ToastService, private sheet: OptionsService, private config: ConfigService, private router: Router, private confirm: ConfirmService, private buttons: ButtonsService, private service: FeaturesService) { }

	public columns: string[] = ['title', 'description', 'options'];
	public loading: boolean;
	public features: MatTableDataSource<Feature> = new MatTableDataSource<Feature>();
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
			]
		});

		if (response.ok) {
			this.features.data = response.result.map(feature => new Feature(feature));
		} else {
			this.features.data = [];
		}

		this.loading = false;
	}

	public async options(feature: Feature) {
		this.sheet.show({
			role: feature.role,
			title: feature.title,
			options: [
				{
					icon: 'edit',
					title: 'Edit',
					handler: async () => {
						this.router.navigate(['/features', 'editor'], {
							queryParams: {
								mode: 'update',
								featureId: feature.featureId
							}
						});
					},
					disabled: [0, 1]
				},
				{
					icon: 'content_copy',
					title: 'Copy',
					handler: async () => {
						this.router.navigate(['/features', 'editor'], {
							queryParams: {
								mode: 'copy',
								featureId: feature.featureId
							}
						});
					},
					disabled: [0, 1]
				},
				{
					icon: 'delete',
					title: 'Delete',
					danger: true,
					handler: async () => {
						this.confirm.show({
							message: 'Are you sure you want to delete ' + feature.title + '?',
							handler: async () => {
								this.loading = true;

								const response = await this.service.delete({
									featureId: feature.featureId
								});

								if (response.ok) {
									for (let i = 0; i < this.features.data.length; i++) {
										if (this.features.data[i].featureId == feature.featureId) {
											this.features.data.splice(i, 1);
											this.toast.show('Feature was removed!');
											break;
										}
									}
									this.features.data = JSON.parse(JSON.stringify(this.features.data));
								} else {
									this.toast.show(response.error.message);
								}

								this.loading = false;
							}
						});
					},
					disabled: [0, 1, 2, 3, 4]
				}
			]
		});
	}

	ngOnInit(): void {
		this.buttons.show('add');
		this.buttons.hide('close');
		this.buttons.hide('filter');
		this.buttons.hide('search');

		this.features.sort = this.sort;
		this.features.sort.active = 'title';
		this.features.sort.direction = 'asc';

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.router.navigate(['/features', 'editor'], {
				queryParams: {
					mode: 'add'
				}
			});
		});

		this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				this.list();
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.add.unsubscribe();
		this.subscriptions.loaded.unsubscribe();
	}

}
