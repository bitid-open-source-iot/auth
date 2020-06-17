import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { Inject, OnInit, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector:       'app-subscribers',
    styleUrls:      ['./subscribers.component.scss'],
    templateUrl:    './subscribers.component.html'
})

export class SubscribersComponent implements OnInit {

    constructor(private toast: ToastService, private dialog: MatDialogRef<SubscribersComponent>, @Inject(MAT_DIALOG_DATA) private config: any, private localstorage: LocalstorageService) {};

    public role:    number      = 0;
    public email:   string      = this.localstorage.get('email');
    public roles:   any[]       = environment.roles;
    public users:   any         = new MatTableDataSource();
    public loading: boolean;
    public columns: string[]    = ['email', 'role', 'remove'];

    public close() {
        this.dialog.close();
    };

    public async get() {
        this.loading = true;

        let params: any = {
            'filter': [
                'role',
                'users'
            ]
        };

        switch(this.config.type) {
            case('app'):
                params.appId = this.config.id;
                break;
            case('token'):
                params.tokenId = this.config.id;
                break;
        };

        const response = await this.config.service.get(params);

        this.loading = false;

        if (response.ok) {
            this.role = response.result.role;
            if (this.role < 4) {
                this.close();
                this.toast.error('insufficient role');
            } else {
                this.role       = response.result.role;
                this.users.data = response.result.users;
            };
        } else {
            this.toast.error('issue loading users');
        };
    };

    public async unsubscribe(email) {
        this.loading = true;

        let params: any = {
            'email': email
        };

        switch(this.config.type) {
            case('app'):
                params.appId = this.config.id;
                break;
            case('token'):
                params.tokenId = this.config.id;
                break;
        };

        const response = await this.config.service.unsubscribe(params);

        this.loading = false;

        if (response.ok) {
            for (let i = 0; i < this.users.data.length; i++) {
                if (this.users.data[i].email == email) {
                    this.users.data.splice(i, 1);
                    break;
                };
            };
            this.users.data = JSON.parse(JSON.stringify(this.users.data));
            this.toast.success('user was unsubscribed');
        } else {
            this.toast.error('issue unsubscribing user');
        };
    };

    public async updatesubscriber(email, role) {
        this.loading = true;

        let params: any = {
            'role':     role.value,
            'email':    email
        };

        switch(this.config.type) {
            case('app'):
                params.appId = this.config.id;
                break;
            case('token'):
                params.tokenId = this.config.id;
                break;
        };

        const response = await this.config.service.updatesubscriber(params);

        this.loading = false;

        if (response.ok) {
            this.toast.success('user role updated');
        } else {
            this.toast.error('issue updating user role');
        };
    };

    ngOnInit(): void {
        this.get();
    };

}