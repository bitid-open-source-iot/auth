import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/* --- CLASSES --- */
import { App } from 'src/app/classes/app';
import { User } from 'src/app/classes/user';
import { Group } from 'src/app/classes/group';

/* --- SERVICES --- */
import { AppsService } from 'src/app/services/apps/apps.service';
import { UsersService } from 'src/app/services/users/users.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';

@Component({
	selector: 'subscribers-editor-page',
	styleUrls: ['./editor.page.scss'],
	templateUrl: './editor.page.html'
})

export class SubscribersEditorPage implements OnInit, OnDestroy {

	constructor(private apps: AppsService, private users: UsersService, private route: ActivatedRoute, private toast: ToastService, private groups: GroupsService, private config: ConfigService, private router: Router, private formerror: FormErrorService) { }

	public id?: string;
	public role?: string | number;
	public type?: string;
	public mode?: 'add' | 'update';
	public form: FormGroup = new FormGroup({
		id: new FormControl(null, [Validators.required]),
		role: new FormControl(1, [Validators.required]),
		type: new FormControl('app', [Validators.required]),
		search: new FormControl(null)
	});
	public errors: any = {
		id: '',
		role: '',
		type: '',
		search: ''
	};
	public options: any[] = [];
	public loading: boolean = false;
	public searching: boolean = false;
	private observers: any = {};

	public async submit() {
		this.loading = true;

		let params: any = {
			id: this.form.value.id,
			type: this.form.value.type,
			role: this.form.value.role
		};
		let service: any;

		switch (this.type) {
			case ('app'):
				params.appId = this.id;
				service = this.apps;
				break;
			case ('user'):
				params.userId = this.id;
				service = this.users;
				break;
			case ('group'):
				params.groupId = this.id;
				service = this.groups;
				break;
		};

		const response = await service.share(params);

		if (response.ok) {
			this.router.navigate(['/subscribers', this.type, this.id], {
				replaceUrl: true
			});
		} else {
			this.toast.show(response.error.message);
		};

		this.loading = false;
	}

	private async search() {
		this.searching = true;

		let params: any = {
			limit: 10
		};
		let service: any;

		switch (this.form.value.type) {
			case ('app'):
				params = {
					filter: [
						'name',
						'appId'
					],
					name: this.form.value.search,
					private: [true, false]
				};
				service = this.apps;
				break;
			case ('user'):
				params = {
					filter: [
						'name',
						'userId'
					],
					name: this.form.value.search
				};
				service = this.users;
				break;
			case ('group'):
				params = {
					filter: [
						'groupId',
						'description'
					],
					private: [true, false],
					description: this.form.value.search
				};
				service = this.groups;
				break;
		};

		const response = await service.list(params);

		if (response.ok) {
			switch (this.form.value.type) {
				case ('app'):
					this.options = response.result.map((o: App) => {
						return {
							id: o.appId,
							description: o.name
						};
					});
					break;
				case ('user'):
					this.options = response.result.map((o: User) => {
						return {
							id: o.userId,
							description: [o.name.first, o.name.last].join(' ')
						};
					});
					break;
				case ('group'):
					this.options = response.result.map((o: Group) => {
						return {
							id: o.groupId,
							description: o.description
						};
					});
					break;
			};
		} else {
			this.options = [];
		};

		this.searching = false;
	}

	public setSearchValue(value: string) {
		this.form.controls['id'].setValue(value);
	}

	ngOnInit(): void {
		this.observers.form = this.form.valueChanges.subscribe(data => {
			this.errors = this.formerror.validateForm(this.form, this.errors, true);
		});

		this.observers.search = this.form.controls['search'].valueChanges.subscribe(value => {
			if (typeof (value) != 'undefined' && value != null && value?.length > 0) {
				setTimeout(() => this.search(), 250);
			} else {
				this.options = [];
			};
		});

		this.observers.loaded = this.config.loaded.subscribe(async (loaded) => {
			if (loaded) {
				const params: any = this.route.snapshot.params;
				const queryParams: any = this.route.snapshot.queryParams;
				this.id = params.id;
				this.type = params.type;
				this.role = parseInt(queryParams.role);
				this.mode = queryParams.mode;
				if (this.mode == 'update') {
					this.form.controls['id'].setValue(this.id);
					this.form.controls['id'].disable();
					this.form.controls['type'].setValue(this.type);
					this.form.controls['type'].disable();
					this.form.controls['role'].setValue(this.role);
					this.form.controls['search'].disable();
				};
			};
		});
	}

	ngOnDestroy(): void {
		this.observers.form?.unsubscribe();
		this.observers.search?.unsubscribe();
		this.observers.loaded?.unsubscribe();
	}

}
