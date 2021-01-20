import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let DeleteComponent = class DeleteComponent {
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
DeleteComponent = __decorate([
    Component({
        selector: 'app-delete',
        styleUrls: ['./delete.component.scss'],
        templateUrl: './delete.component.html'
    })
], DeleteComponent);
export { DeleteComponent };
//# sourceMappingURL=delete.component.js.map