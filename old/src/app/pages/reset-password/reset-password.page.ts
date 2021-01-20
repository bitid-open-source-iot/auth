import { ToastService } from 'src/app/services/toast/toast.service';
import { AccountService } from 'src/app/services/account/account.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:       'app-reset-password',
    styleUrls:      ['./reset-password.page.scss'],
    templateUrl:    './reset-password.page.html'
})

export class ResetPasswordPage implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private toast: ToastService, private router: Router, private service: AccountService, private formerror: FormErrorService) {};

    public form:            FormGroup   = new FormGroup({
        'old':      new FormControl('', [Validators.required]),
        'new':      new FormControl('', [Validators.required]),
        'email':    new FormControl('', [Validators.required]),
        'confirm':  new FormControl('', [Validators.required])
    });
    public errors:          any         = {
        'old':      '',
        'new':      '',
        'email':    '',
        'confirm':  ''
    };
    public loading:         boolean;
    private subscriptions:  any         = {};

    public async submit() {
        this.loading = true;

        this.form.disable();

        const response = await this.service.changepassword({
            'old':      this.form.value.old,
            'new':      this.form.value.new,
            'email':    this.form.value.email
        });

        this.form.enable();

        this.loading = false;

        if (response.ok) {
            this.router.navigate(['/signin'], {
                'replaceUrl': true
            });
        } else {
            this.toast.error(response.error.message);
        };
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });

        this.subscriptions.route = this.route.queryParams.subscribe(params => {
            if (typeof(params.email) != "undefined") {
                this.form.controls['email'].setValue(params.email);
            };
            if (typeof(params.password) != "undefined") {
                this.form.controls['old'].setValue(params.password);
            };
            if (params.email == "" || params.email == null || typeof(params.email) == "undefined" || params.password == "" || params.password == null || typeof(params.password) == "undefined") {
                this.router.navigate(['/']);
            };
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
        this.subscriptions.route.unsubscribe();
    };

}