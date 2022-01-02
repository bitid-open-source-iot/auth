import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

/* --- DIALOGS --- */
import { SubscribersEditorDialog } from './editor/editor.dialog';

/* --- CLASSES --- */
import { App } from 'src/app/classes/app';
import { User } from 'src/app/classes/user';
import { Group } from 'src/app/classes/group';
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

@Component({
	selector: 'subscribers-page',
	styleUrls: ['./subscribers.page.scss'],
	templateUrl: './subscribers.page.html'
})

export class SubscribersPage implements OnInit, OnDestroy {

	constructor(public apps: AppsService, public users: UsersService, public groups: GroupsService, public tokens: TokensService, private dialog: MatDialog, private toast: ToastService, private route: ActivatedRoute, private sheet: OptionsService, private config: ConfigService, private router: Router, private confirm: ConfirmService) { }

	public id: string = 'unset';
	public role: number = 0;
	public type: string = 'unset';
	public table: MatTableDataSource<Accessor> = new MatTableDataSource<Accessor>();
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

		switch (this.type) {
			case ('app'):
				service = this.apps;
				params.appId = this.id;
				break;
			case ('group'):
				service = this.groups;
				params.groupId = this.id;
				break;
			case ('token'):
				service = this.tokens;
				params.tokenId = this.id;
				break;
		};

		const response = await service.get(params);

		if (response.ok) {
			this.table.data = [];
			this.role = response.result.role;
			response.result.apps.map((o: Accessor) => this.table.data.push({
				id: o.id,
				type: 'app',
				role: o.role,
				avatar: './assets/icons/icon-512x512.png',
				description: '-'
			}));
			response.result.users.map((o: Accessor) => this.table.data.push({
				id: o.id,
				type: 'user',
				role: o.role,
				avatar: './assets/icons/icon-512x512.png',
				description: '-'
			}));
			response.result.groups.map((o: Accessor) => this.table.data.push({
				id: o.id,
				type: 'group',
				role: o.role,
				avatar: './assets/icons/icon-512x512.png',
				description: '-'
			}));
			this.table.data = this.table.data.map((o: Accessor) => new Accessor(o));
		} else {
			this.toast.show(response.error.message);
		};

		this.loading = false;
	}

	private async load() {
		this.loading = true;

		const apps = await this.apps.list({
			filter: [
				'name',
				'icon',
				'appId'
			],
			appId: this.table.data.filter(o => o.type == 'app').map(o => o.id),
			private: [true, false]
		} as any);

		if (apps.ok) {
			this.apps.data = apps.result.map((o: App) => new App(o));
			this.apps.data.map(app => {
				for (let i = 0; i < this.table.data.length; i++) {
					if (this.table.data[i].id == app.appId && this.table.data[i].type == 'app') {
						this.table.data[i].avatar = app.icon;
						this.table.data[i].description = app.name;
					};
				};
			});
		} else {
			this.apps.data = [];
		};

		const users = await this.users.list({
			filter: [
				'userId',
				'picture',
				'description'
			],
			userId: this.table.data.filter(o => o.type == 'user').map(o => o.id)
		} as any);

		if (users.ok) {
			this.users.data = users.result.map((o: User) => new User(o));

			this.users.data.map(user => {
				for (let i = 0; i < this.table.data.length; i++) {
					if (this.table.data[i].id == user.userId && this.table.data[i].type == 'user') {
						this.table.data[i].avatar = user.picture;
						this.table.data[i].description = [user.name.first, user.name.last].join(' ')
					};
				};
			});
		} else {
			this.users.data = [];
		};

		const groups = await this.groups.list({
			filter: [
				'groupId',
				'description'
			],
			groupId: this.table.data.filter(o => o.type == 'group').map(o => o.id),
			private: [true, false]
		} as any);

		if (groups.ok) {
			this.groups.data = groups.result.map((o: Group) => new Group(o));
			this.groups.data.map(group => {
				for (let i = 0; i < this.table.data.length; i++) {
					if (this.table.data[i].id == group.groupId && this.table.data[i].type == 'group') {
						this.table.data[i].avatar = './assets/group.png';
						this.table.data[i].description = group.description;
					};
				};
			});
		} else {
			this.groups.data = [];
		};

		this.loading = false;
	}

	public async options(accesor: Accessor) {
		let disabled = {
			edit: false,
			delete: false,
			makeOwner: false
		};
		
		if (this.role < 4 || this.role <= accesor.role) {
			disabled.edit = true;
			disabled.delete = true;
		};
		
		if (this.role < 5 || accesor.role == 5 || accesor.type != 'user') {
			disabled.makeOwner = true;
		};

		this.sheet.show({
			role: this.role,
			title: accesor.description,
			options: [
				{
					icon: 'edit',
					title: 'Edit',
					handler: async () => this.editor('update', accesor),
					disabled: disabled.edit ? [this.role] : []
				},
				{
					icon: 'remove',
					title: 'Unsubscribe',
					danger: true,
					handler: async () => {
						this.confirm.show({
							message: 'Are you sure you want to unsubscribe ' + accesor.description + '?',
							handler: async () => {
								this.loading = true;
						
								let params: any = {
									id: accesor.id,
									type: accesor.type
								};
								let service: any;
						
								switch (this.type) {
									case ('app'):
										service = this.apps;
										params.appId = this.id;
										break;
									case ('group'):
										service = this.groups;
										params.groupId = this.id;
										break;
									case ('token'):
										service = this.tokens;
										params.tokenId = this.id;
										break;
								};
						
								const response = await service.unsubscribe(params);

								if (response.ok) {
									if (response.result.updated > 0) {
										for (let i = 0; i < this.table.data.length; i++) {
											if (this.table.data[i].id == accesor.id && this.table.data[i].type == accesor.type) {
												this.table.data.splice(i, 1);
												break;
											};
										};
										this.table.data = this.table.data.map((o: Accessor) => new Accessor(o));
									} else {
										this.toast.show('Accesor was not unsubscribed from ' + this.type + '!');
									};
								} else {
									this.toast.show(response.error.message);
								};

								this.loading = false;
							}
						});
					},
					disabled: disabled.delete ? [this.role] : []
				},
				{
					icon: 'vpn_key',
					title: 'Make Owner',
					danger: true,
					handler: async () => {
						this.confirm.show({
							message: 'Are you sure you want to change ownership to ' + accesor.description + '?',
							handler: async () => {
								this.loading = true;
						
								let params: any = {
									id: accesor.id,
									type: accesor.type
								};
								let service: any;
						
								switch (this.type) {
									case ('app'):
										service = this.apps;
										params.appId = this.id;
										break;
									case ('group'):
										service = this.groups;
										params.groupId = this.id;
										break;
									case ('token'):
										service = this.tokens;
										params.tokenId = this.id;
										break;
								};
						
								const response = await service.changeowner(params);

								if (response.ok) {
									if (response.result.updated > 0) {
										this.table.data.map((o: Accessor) => {
											if (o.role == 5) {
												o.role = 4;	
											};
										});
										for (let i = 0; i < this.table.data.length; i++) {
											if (this.table.data[i].id == accesor.id && this.table.data[i].type == accesor.type) {
												this.table.data[i].role = 5;
												break;
											};
										};
										this.table.data = this.table.data.map((o: Accessor) => new Accessor(o));
									} else {
										this.toast.show('Accesor was not set as owner on ' + this.type + '!');
									};
								} else {
									this.toast.show(response.error.message);
								};

								this.loading = false;
							}
						});
					},
					disabled: disabled.makeOwner ? [this.role] : []
				}
			]
		});
	}

	public async editor(mode: string, accesor?: Accessor) {
		const dialog = await this.dialog.open(SubscribersEditorDialog, {
			data: {
				id: this.id,
				mode: mode,
				type: this.type,
				accesor: accesor
			},
			panelClass: 'fullscreen-dialog'
		});

		await dialog.afterClosed().subscribe(async (result) => {
			if (result) {
				if (mode == 'add') {
					this.loading = true;
			
					let params: any = {
						id: result.id,
						type: result.type,
						role: result.role
					};
					let service: any;
			
					switch (this.type) {
						case ('app'):
							service = this.apps;
							params.appId = this.id;
							break;
						case ('group'):
							service = this.groups;
							params.groupId = this.id;
							break;
						case ('token'):
							service = this.tokens;
							params.tokenId = this.id;
							break;
					};
			
					const response = await service.share(params);

					if (response.ok) {
						if (response.result.updated > 0) {
							this.table.data.push({
								id: result.id,
								type: result.type,
								role: result.role,
								avatar: '-',
								description: '-'
							});
							await this.load();
						} else {
							this.toast.show('Accesor was not added to ' + this.type + '!');
						};
					} else {
						this.toast.show(response.error.message);
					};

					this.loading = false;
				} else if ('update') {
					this.loading = true;
			
					let params: any = {
						id: result.id,
						type: result.type,
						role: result.role
					};
					let service: any;
			
					switch (this.type) {
						case ('app'):
							service = this.apps;
							params.appId = this.id;
							break;
						case ('group'):
							service = this.groups;
							params.groupId = this.id;
							break;
						case ('token'):
							service = this.tokens;
							params.tokenId = this.id;
							break;
					};
			
					const response = await service.updatesubscriber(params);

					if (response.ok) {
						for (let i = 0; i < this.table.data.length; i++) {
							if (this.table.data[i].id == accesor?.id && this.table.data[i].type == accesor?.type) {
								this.table.data[i].role = result.role;
								break;
							};
						};
					} else {
						this.toast.show(response.error.message);
					};

					this.loading = false;
				};

				this.table.data = this.table.data.map((o: Accessor) => new Accessor(o));
			};
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
