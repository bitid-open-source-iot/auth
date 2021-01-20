import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let UnsubscribeComponent = class UnsubscribeComponent {
    constructor(dialog, formerror) {
        this.dialog = dialog;
        this.formerror = formerror;
        this.form = new FormGroup({
            'confirm': new FormControl(false, [Validators.required])
        });
        this.errors = {
            'confirm': ''
        };
        this.subscriptions = {};
    }
    ;
    close() {
        this.dialog.close(false);
    }
    ;
    submit() {
        this.dialog.close(this.form.value.confirm);
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
UnsubscribeComponent = __decorate([
    Component({
        selector: 'app-unsubscribe',
        styleUrls: ['./unsubscribe.component.scss'],
        templateUrl: './unsubscribe.component.html'
    })
], UnsubscribeComponent);
export { UnsubscribeComponent };
//# sourceMappingURL=unsubscribe.component.js.map