import { MenuService } from 'src/app/services/menu/menu.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AccountService } from 'src/app/services/account/account.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:       'app-account-page',
    styleUrls:      ['./account.page.scss'],
    templateUrl:    './account.page.html'
})

export class AccountPage implements OnInit, OnDestroy {

    constructor(public menu: MenuService, private toast: ToastService, private service: AccountService) {};

    public form:            FormGroup   = new FormGroup({
        'picture':          new FormControl('', [Validators.required]),
        'username':         new FormControl('', [Validators.required])
    });
    public errors:          any         = {
        'picture':          '',
        'username':         ''
    };
    public loading:         boolean;
    private subscriptions:  any = {};

    public async submit() {
        this.loading = true;

        const response = await this.service.update({
            'picture':  this.form.value.picture,
            'userName': this.form.value.username
        });

        this.loading = false;

        if (response.ok) {
            this.toast.success('account was updated!');
        } else {
            this.toast.success('issue updating account!');
        };
    };

    ngOnInit(): void {
        this.subscriptions.user = this.service.user.subscribe(user => {
            this.form.controls['picture'].setValue(user.picture);
            this.form.controls['username'].setValue(user.userName);
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.user.unsubscribe()
    };

}