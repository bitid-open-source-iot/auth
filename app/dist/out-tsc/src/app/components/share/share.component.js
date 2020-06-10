import { __decorate } from "tslib";
import { environment } from 'src/environments/environment';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let ShareComponent = class ShareComponent {
    constructor(dialog, formerror) {
        this.dialog = dialog;
        this.formerror = formerror;
        this.form = new FormGroup({
            'role': new FormControl(1, [Validators.required]),
            'email': new FormControl('', [Validators.required, Validators.email])
        });
        this.roles = environment.roles;
        this.errors = {
            'role': '',
            'email': ''
        };
        this.subscriptions = {};
    }
    ;
    close() {
        this.dialog.close(false);
    }
    ;
    submit() {
        this.dialog.close(this.form.value);
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
ShareComponent = __decorate([
    Component({
        selector: 'app-share',
        styleUrls: ['./share.component.scss'],
        templateUrl: './share.component.html'
    })
], ShareComponent);
export { ShareComponent };
//# sourceMappingURL=share.component.js.map