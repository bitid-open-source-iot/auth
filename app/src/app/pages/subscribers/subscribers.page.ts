import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

/* --- CLASSES --- */
import { Accessor } from 'src/app/classes/accessor';

/* --- SERVICES --- */
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TokensService } from 'src/app/services/tokens/tokens.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';

@Component({
	selector: 'subscribers-page',
	styleUrls: ['./subscribers.page.scss'],
	templateUrl: './subscribers.page.html'
})

export class SubscribersPage implements OnInit, OnDestroy {

	constructor(private apps: AppsService, private sheet: OptionsService, private config: ConfigService, private router: Router, private groups: GroupsService, private dialog: MatDialog, private toast: ToastService, private route: ActivatedRoute, private tokens: TokensService, private confirm: ConfirmService) { }

	public id: string = 'unset';
	public role: number = 0;
	public type: string = 'unset';
	public users: MatTableDataSource<any> = new MatTableDataSource<any>();
	public loading: boolean = false;
	private observers: any = {};

	public async options(accesor: Accessor) {
		this.sheet.show({
			role: accesor.role,
			title: 'accesor.title',
			options: [
				{
					icon: 'edit',
					title: 'Edit',
					handler: async () => {
						this.router.navigate(['/subscriptions', 'editor'], {
							queryParams: {
								mode: 'update',
								featureId: accesor.id
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
						// this.confirm.show({
						// 	message: 'Are you sure you want to delete ' + feature.title + '?',
						// 	handler: async () => {
						// 		this.loading = true;

						// 		const response = await this.service.delete({
						// 			featureId: feature.featureId
						// 		});

						// 		if (response.ok) {
						// 			for (let i = 0; i < this.features.data.length; i++) {
						// 				if (this.features.data[i].featureId == feature.featureId) {
						// 					this.features.data.splice(i, 1);
						// 					this.toast.show('Feature was removed!');
						// 					break;
						// 				};
						// 			};
						// 			this.features.data = this.features.data.map((o: Feature) => new Feature(o));
						// 		} else {
						// 			this.toast.show(response.error.message);
						// 		};

						// 		this.loading = false;
						// 	}
						// });
					},
					disabled: [0, 1]
				}
			]
		});
	}

	ngOnInit(): void {
		this.observers.loaded = this.config.loaded.subscribe(async (loaded) => {
			if (loaded) {
				const params: any = this.route.snapshot.queryParams;
				this.id = params.id;
				this.type = params.type;
				// this.get();
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.loaded?.unsubscribe();
	}

}
