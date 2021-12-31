import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

/* --- CLASSES --- */
import { Accessor } from 'src/app/classes/accessor';

/* --- SERVICES --- */
import { AppsService } from 'src/app/services/apps/apps.service';
import { UsersService } from 'src/app/services/users/users.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TokensService } from 'src/app/services/tokens/tokens.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { OptionsService } from 'src/app/libs/options/options.service';
import { ConfirmService } from 'src/app/libs/confirm/confirm.service';
import { App } from 'src/app/classes/app';
import { Group } from 'src/app/classes/group';
import { User } from 'src/app/classes/user';

@Component({
	selector: 'subscribers-page',
	styleUrls: ['./subscribers.page.scss'],
	templateUrl: './subscribers.page.html'
})

export class SubscribersPage implements OnInit, OnDestroy {

	constructor(public apps: AppsService, public users: UsersService, public groups: GroupsService, public tokens: TokensService, private toast: ToastService, private route: ActivatedRoute, private sheet: OptionsService, private config: ConfigService, private router: Router, private confirm: ConfirmService) { }

	public id: string = 'unset';
	public role: number = 0;
	public type: string = 'unset';
	public data: Accessor[] = [];
	public loading: boolean = false;
	private observers: any = {};

	private async get() {
		this.loading = true;

		let params: any = {
			filter: [
				'role',
				'apps',
				'users',
				'groups'
			]
		};
		let service: any;

		switch(this.type) {
			case('app'):
				service = this.apps;
				params.appId = this.id;
				break;
			case('group'):
				service = this.groups;
				params.groupId = this.id;
				break;
			case('token'):
				service = this.tokens;
				params.tokenId = this.id;
				break;
		};

		const response = await service.get(params);

		if (response.ok) {
			this.data = [];
			this.role = response.result.role;
			response.result.apps.map((o: Accessor) => this.data.push({
				id: o.id,
				type: 'app',
				role: o.role
			}));
			response.result.users.map((o: Accessor) => this.data.push({
				id: o.id,
				type: 'user',
				role: o.role
			}));
			response.result.groups.map((o: Accessor) => this.data.push({
				id: o.id,
				type: 'group',
				role: o.role
			}));
		} else {
			this.toast.show(response.error.message);
		};

		this.loading = false;
	}

	private async load() {
		this.loading = true;

		const apps = await this.apps.list({
			filter: [
				'appId',
				'description'
			],
			appId: this.data.filter(o => o.type == 'app').map(o => o.id),
			private: [true, false]
		} as any);

		if (apps.ok) {
			this.apps.data = apps.result.map((o: App) => new App(o));
		} else {
			this.apps.data = [];
		};

		const users = await this.users.list({
			filter: [
				'userId',
				'description'
			],
			userId: this.data.filter(o => o.type == 'user').map(o => o.id)
		} as any);

		if (users.ok) {
			this.users.data = users.result.map((o: User) => new User(o)).map((o: User) => {
				return {
					name: [o.name.first, o.name.last].join(' '),
					userId: o.userId
				}
			});
		} else {
			this.users.data = [];
		};

		const groups = await this.groups.list({
			filter: [
				'groupId',
				'description'
			],
			groupId: this.data.filter(o => o.type == 'group').map(o => o.id),
			private: [true, false]
		} as any);

		if (groups.ok) {
			this.groups.data = groups.result.map((o: Group) => new Group(o));
		} else {
			this.groups.data = [];
		};

		this.loading = false;
	}

	public async options(accesor: Accessor, type: string) {
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
				const params: any = this.route.snapshot.params;
				this.id = params.id;
				this.type = params.type;
				await this.get();
				await this.load();
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.loaded?.unsubscribe();
	}

}
