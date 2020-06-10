import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let SigninPage = class SigninPage {
    constructor(toast, router, service, formerror) {
        this.toast = toast;
        this.router = router;
        this.service = service;
        this.formerror = formerror;
        this.form = new FormGroup({
            'email': new FormControl('', [Validators.email, Validators.required]),
            'password': new FormControl('', [Validators.required])
        });
        this.errors = {
            'email': '',
            'password': ''
        };
        this.subscriptions = {};
    }
    ;
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = true;
            this.form.disable();
            const response = yield this.service.login({
                'email': this.form.value.email,
                'password': this.form.value.password
            });
            this.form.enable();
            this.loading = false;
            if (response.ok) {
                this.router.navigate(['/apps'], {
                    'replaceUrl': true
                });
            }
            else {
                this.toast.error(response.error.message);
            }
            ;
        });
    }
    ;
    ngOnInit() {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });
    }
    ;
    ngOnDestroy() {
        this.subscriptions.form.unsubscribe();
    }
    ;
};
SigninPage = __decorate([
    Component({
        selector: 'app-signin',
        styleUrls: ['./signin.page.scss'],
        templateUrl: './signin.page.html'
    })
], SigninPage);
export { SigninPage };
//# sourceMappingURL=signin.page.js.map