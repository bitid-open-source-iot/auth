import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AccountService } from 'src/app/services/account/account.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-change-password',
    styleUrls: ['./change-password.page.scss'],
    templateUrl: './change-password.page.html'
})

export class ChangePasswordPage implements OnInit, OnDestroy {

    constructor(private toast: ToastService, private router: Router, private service: AccountService, private formerror: FormErrorService) { };

    public form: FormGroup = new FormGroup({
        'old': new FormControl('', [Validators.required]),
        'new': new FormControl('', [Validators.required]),
        'confirm': new FormControl('', [Validators.required]),
    });
    public errors: any = {
        'old': '',
        'new': '',
        'confirm': ''
    };
    public loading: boolean;
    private subscriptions: any = {};

    public async submit() {
        this.loading = true;

        this.form.disable();

        const response = await this.service.changepassword({
            'old': this.form.value.old,
            'new': this.form.value.new,
            'confirm': this.form.value.confirm
        });

        this.form.enable();

        this.loading = false;

        if (response.ok) {
            this.router.navigate(['/account']);
            this.toast.success('password was changed!');
        } else {
            this.toast.error('there was an issue changing password!');
        };
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
    };

}