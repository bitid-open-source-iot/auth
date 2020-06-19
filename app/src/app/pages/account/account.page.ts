import { MenuService } from 'src/app/services/menu/menu.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AccountService } from 'src/app/services/account/account.service';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector:       'app-account-page',
    styleUrls:      ['./account.page.scss'],
    templateUrl:    './account.page.html'
})

export class AccountPage implements OnInit, OnDestroy {

    @ViewChild(ImageUploadComponent, {'static': true}) uplaod: ImageUploadComponent;

    constructor(public menu: MenuService, private toast: ToastService, private service: AccountService) {};

    public form:            FormGroup   = new FormGroup({
        'picture':      new FormControl('', [Validators.required]),
        'username':     new FormControl('', [Validators.required]),
        'name_last':    new FormControl('', [Validators.required]),
        'name_first':   new FormControl('', [Validators.required])
    });
    public errors:          any         = {
        'picture':      '',
        'username':     '',
        'name_last':    '',
        'name_first':   ''
    };
    public loading:         boolean;
    private subscriptions:  any = {};

    public async submit() {
        this.loading = true;

        const response = await this.service.update({
            'name': {
                'last':     this.form.value.name_last,
                'first':    this.form.value.name_first
            },
            'picture':  this.form.value.picture,
            'username': this.form.value.username
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
            this.form.controls['username'].setValue(user.username);
            this.form.controls['name_last'].setValue(user.name.last);
            this.form.controls['name_first'].setValue(user.name.first);
        });

        this.subscriptions.uplaod = this.uplaod.change.subscribe(picture => {
            this.form.controls['picture'].setValue(picture);
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.user.unsubscribe();
        this.subscriptions.uplaod.unsubscribe();
    };

}