import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let AppEditorPage = class AppEditorPage {
    constructor(route, toast, dialog, router, service, formerror) {
        this.route = route;
        this.toast = toast;
        this.dialog = dialog;
        this.router = router;
        this.service = service;
        this.formerror = formerror;
        this.form = new FormGroup({
            'title': new FormControl('', [Validators.required]),
            'description': new FormControl('', [Validators.required]),
            'organizationOnly': new FormControl(0, [Validators.required])
        });
        this.errors = {
            'title': '',
            'description': '',
            'organizationOnly': ''
        };
        this.tariff = {};
        this.subscriptions = {};
    }
    ;
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = true;
            const response = yield this.service.get({
                'filter': [
                    'role',
                    'title',
                    'appId',
                    'description',
                    'organizationOnly'
                ],
                'appId': this.appId
            });
            this.loading = false;
            if (response.ok) {
                if (response.result.role < 3) {
                    this.router.navigate(['/apps']);
                    this.toast.error('you do not have permission to access this app!');
                }
                ;
                this.tariff = response.result.tariff;
                debugger;
                this.form.controls['appId'].setValue(response.result.appId);
                this.form.controls['title'].setValue(response.result.title);
                this.form.controls['cycles'].setValue(response.result.cycles);
                this.form.controls['frequency'].setValue(response.result.frequency);
                this.form.controls['notify_url'].setValue(response.result.notify.url);
                this.form.controls['description'].setValue(response.result.description);
                this.form.controls['notify_enabled'].setValue(response.result.notify.enabled);
                this.form.controls['organizationOnly'].setValue(response.result.organizationOnly);
            }
            else {
                this.router.navigate(['/apps']);
                this.toast.error('issue loading app!');
            }
            ;
        });
    }
    ;
    submit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = true;
            let mode = this.mode;
            if (mode == 'copy') {
                mode = 'add';
            }
            ;
            this.form.disable();
            const response = yield this.service[mode]({
                'appId': this.appId,
                'title': this.form.value.title,
                'description': this.form.value.description,
                'organizationOnly': this.form.value.organizationOnly
            });
            this.form.enable();
            this.loading = false;
            if (response.ok) {
                this.router.navigate(['/apps']);
                if (mode == 'add') {
                    this.toast.success('app was added!');
                }
                else {
                    this.toast.success('app was updated!');
                }
                ;
            }
            else {
                if (mode == 'add') {
                    this.toast.success('there was an issue adding app!');
                }
                else {
                    this.toast.success('there was an issue updating app!');
                }
                ;
            }
            ;
        });
    }
    ;
    ngOnInit() {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });
        this.subscriptions.route = this.route.params.subscribe(params => {
            this.mode = params.mode;
            this.appId = params.appId;
            if (this.mode != 'add') {
                this.get();
            }
            ;
        });
    }
    ;
    ngOnDestroy() {
        this.subscriptions.form.unsubscribe();
        this.subscriptions.route.unsubscribe();
    }
    ;
};
AppEditorPage = __decorate([
    Component({
        selector: 'app-app-editor',
        styleUrls: ['./editor.page.scss'],
        templateUrl: './editor.page.html'
    })
], AppEditorPage);
export { AppEditorPage };
//# sourceMappingURL=editor.page.js.map