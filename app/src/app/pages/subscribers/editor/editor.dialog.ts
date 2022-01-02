import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit, Inject, Component, OnDestroy, AfterViewInit } from '@angular/core';

/* --- CLASSES --- */
import { App } from 'src/app/classes/app';
import { User } from 'src/app/classes/user';
import { Group } from 'src/app/classes/group';

/* --- SERVICES --- */
import { AppsService } from 'src/app/services/apps/apps.service';
import { UsersService } from 'src/app/services/users/users.service';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'subscribers-editor-dialog',
	styleUrls: ['./editor.dialog.scss'],
	templateUrl: './editor.dialog.html'
})

export class SubscribersEditorDialog implements OnDestroy, AfterViewInit {

	constructor(private apps: AppsService, private users: UsersService, private dialog: MatDialogRef<SubscribersEditorDialog>, private groups: GroupsService, @Inject(MAT_DIALOG_DATA) private config: any, private formerror: FormErrorService) { }

	public id?: string;
	public type?: string;
	public mode?: string;
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
		delete this.form.value.search;
		this.form.controls['id'].enable();
		this.form.controls['type'].enable();
		this.form.controls['search'].enable();
		this.dialog.close(this.form.value);
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

	ngOnDestroy(): void {
		this.observers.form?.unsubscribe();
		this.observers.search?.unsubscribe();
	}

	ngAfterViewInit(): void {
		this.mode = this.config.mode;
		let accesor = this.config.accesor;
		
		if (this.config.mode == 'update') {
			this.form.controls['id'].setValue(accesor?.id);
			this.form.controls['id'].disable();
			this.form.controls['type'].setValue(accesor?.type);
			this.form.controls['type'].disable();
			this.form.controls['role'].setValue(accesor?.role);
			this.form.controls['search'].setValue(accesor?.description);
			this.form.controls['search'].disable();
		};

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
	}

}
