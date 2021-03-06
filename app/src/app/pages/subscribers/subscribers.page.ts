import { MatDialog } from '@angular/material/dialog';
import { AppsService } from 'src/app/services/apps/apps.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TokensService } from 'src/app/services/tokens/tokens.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { UserEditorDialog } from './editor/editor.dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
	selector: 'subscribers-page',
	styleUrls: ['./subscribers.page.scss'],
	templateUrl: './subscribers.page.html'
})

export class SubscribersPage implements OnInit, OnDestroy {

	constructor(private apps: AppsService, private config: ConfigService, private dialog: MatDialog, private toast: ToastService, private route: ActivatedRoute, private buttons: ButtonsService, private tokens: TokensService) { }

	public id: string;
	public role: number;
	public type: string;
	public users: MatTableDataSource<any> = new MatTableDataSource<any>();
	public columns: string[] = ['email', 'role', 'options'];
	public loading: boolean;
	private subscriptions: any = { };

	private async get() {
		this.loading = true;

		const params: any = {
			filter: [
				'role',
				'users'
			]
		};
		let service: any;

		switch (this.type) {
			case ('app'):
				service = this.apps;
				params.appId = this.id;
				break;
			case ('token'):
				service = this.tokens;
				params.tokenId = this.id;
				break;
		}

		const response = await service.get(params);

		if (response.ok) {
			this.role = response.result.role;
			this.users.data = response.result.users;
		} else {
			this.users.data = [];
		}

		this.loading = false;
	}

	private async share(user) {
		this.loading = true;

		const params: any = {
			role: user.role,
			email: user.email
		};
		let service: any;

		switch (this.type) {
			case ('app'):
				service = this.apps;
				params.appId = this.id;
				break;
			case ('token'):
				service = this.tokens;
				params.tokenId = this.id;
				break;
		}

		const response = await service.share(params);

		if (response.ok) {
			this.users.data.push(user);
			this.users.data = JSON.parse(JSON.stringify(this.users.data));
			this.toast.show('User was shared!');
		} else {
			this.toast.show(response.error.message);
		}

		this.loading = false;
	}

	public async editor(user?) {
		const dialog = await this.dialog.open(UserEditorDialog, {
			data: user,
			panelClass: 'user-editor-dialog'
		});

		dialog.afterClosed().subscribe(result => {
			if (result) {
				if (user) {
					this.updatesubscriber(user.email, result.role);
				} else {
					this.share(result);
				}
			}
		});
	}

	public async unsubscribe(email) {
		this.loading = true;

		const params: any = {
			email
		};
		let service: any;

		switch (this.type) {
			case ('app'):
				service = this.apps;
				params.appId = this.id;
				break;
			case ('token'):
				service = this.tokens;
				params.tokenId = this.id;
				break;
		}

		const response = await service.unsubscribe(params);

		if (response.ok) {
			for (let i = 0; i < this.users.data.length; i++) {
				if (this.users.data[i].email == email) {
					this.users.data.splice(i, 1);
				}
			}
			this.users.data = JSON.parse(JSON.stringify(this.users.data));
			this.toast.show('User was removed!');
		} else {
			this.toast.show(response.error.message);
		}

		this.loading = false;
	}

	public async updatesubscriber(email, role) {
		this.loading = true;

		const params: any = {
			role,
			email
		};
		let service: any;

		switch (this.type) {
			case ('app'):
				service = this.apps;
				params.appId = this.id;
				break;
			case ('token'):
				service = this.tokens;
				params.tokenId = this.id;
				break;
		}

		const response = await service.updatesubscriber(params);

		if (response.ok) {
			this.toast.show('User was updated!');
		} else {
			this.toast.show(response.error.message);
		}

		this.loading = false;
	}

	ngOnInit(): void {
		this.buttons.show('add');
		this.buttons.show('close');
		this.buttons.hide('search');
		this.buttons.hide('filter');

		this.subscriptions.add = this.buttons.add.click.subscribe(event => {
			this.editor();
		});

		this.subscriptions.close = this.buttons.close.click.subscribe(event => {
			window.history.back();
		});

		this.subscriptions.loaded = this.config.loaded.subscribe(loaded => {
			if (loaded) {
				const params = this.route.snapshot.queryParams;
				this.id = params.id;
				this.type = params.type;

				this.get();
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.add.unsubscribe();
		this.subscriptions.close.unsubscribe();
		this.subscriptions.loaded.unsubscribe();
	}

}
