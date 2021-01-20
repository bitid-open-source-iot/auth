import { __awaiter, __decorate } from "tslib";
import { ShareComponent } from 'src/app/components/share/share.component';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { MatTableDataSource } from '@angular/material/table';
import { SubscribersComponent } from 'src/app/components/subscribers/subscribers.component';
import { UnsubscribeComponent } from 'src/app/components/unsubscribe/unsubscribe.component';
import { BottomSheetComponent } from 'src/app/components/bottom-sheet/bottom-sheet.component';
import { Component, ViewChild } from '@angular/core';
let AppsPage = class AppsPage {
    constructor(menu, toast, sheet, dialog, router, service, localstorage) {
        this.menu = menu;
        this.toast = toast;
        this.sheet = sheet;
        this.dialog = dialog;
        this.router = router;
        this.service = service;
        this.localstorage = localstorage;
        this.sort = {
            'key': 'appName',
            'reverse': false
        };
        this.apps = new MatTableDataSource();
        this.columns = ['icon', 'title'];
        this.subscriptions = {};
    }
    ;
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loading = true;
            const response = yield this.service.list({
                'sort': {
                    [this.sort.key]: (this.sort.reverse ? -1 : 1)
                },
                'filter': [
                    'role',
                    'title',
                    'appId'
                ]
            });
            this.loading = false;
            if (response.ok) {
                this.apps.data = response.result;
            }
            else {
                this.apps.data = [];
            }
            ;
        });
    }
    ;
    options(app) {
        return __awaiter(this, void 0, void 0, function* () {
            const sheet = yield this.sheet.open(BottomSheetComponent, {
                'data': {
                    'role': app.role,
                    'title': app.title,
                    'options': [
                        {
                            'icon': 'create',
                            'title': 'Edit',
                            'disabled': [0, 1],
                            'optionId': 0
                        },
                        {
                            'icon': 'file_copy',
                            'title': 'Copy',
                            'disabled': [0, 1, 2],
                            'optionId': 1
                        },
                        {
                            'icon': 'share',
                            'title': 'Share',
                            'disabled': [0, 1, 2, 3],
                            'optionId': 2
                        },
                        {
                            'icon': 'people',
                            'title': 'Subscribers',
                            'disabled': [0, 1, 2, 3],
                            'optionId': 3
                        },
                        {
                            'icon': 'delete',
                            'title': 'Delete',
                            'disabled': [0, 1, 2, 3, 4],
                            'optionId': 4
                        },
                        {
                            'icon': 'remove',
                            'title': 'Unsubscribe',
                            'disabled': [5],
                            'optionId': 5
                        }
                    ]
                }
            });
            yield sheet.afterDismissed().subscribe((optionId) => __awaiter(this, void 0, void 0, function* () {
                if (typeof (optionId) !== "undefined") {
                    switch (optionId) {
                        case (0):
                            this.router.navigate(['/apps', 'update', app.appId]);
                            break;
                        case (1):
                            this.router.navigate(['/apps', 'copy', app.appId]);
                            break;
                        case (2):
                            const share = yield this.dialog.open(ShareComponent, {
                                'panelClass': 'share-dialog',
                                'disableClose': true
                            });
                            yield share.afterClosed().subscribe((user) => __awaiter(this, void 0, void 0, function* () {
                                if (user) {
                                    this.loading = true;
                                    const response = yield this.service.share({
                                        'role': user.role,
                                        'email': user.email,
                                        'appId': app.appId
                                    });
                                    this.loading = false;
                                    if (response.ok) {
                                        this.toast.success('user was shared to app!');
                                    }
                                    else {
                                        this.toast.error('issue sharing user to app!');
                                    }
                                    ;
                                }
                                ;
                            }));
                            break;
                        case (3):
                            yield this.dialog.open(SubscribersComponent, {
                                'data': {
                                    'id': app.appId,
                                    'type': 'app',
                                    'service': this.service
                                },
                                'panelClass': 'subscribers-dialog',
                                'disableClose': true
                            });
                            break;
                        case (4):
                            const remove = yield this.dialog.open(DeleteComponent, {
                                'panelClass': 'delete-dialog',
                                'disableClose': true
                            });
                            yield remove.afterClosed().subscribe((user) => __awaiter(this, void 0, void 0, function* () {
                                if (user) {
                                    this.loading = true;
                                    const response = yield this.service.delete({
                                        'appId': app.appId
                                    });
                                    this.loading = false;
                                    if (response.ok) {
                                        this.toast.success('app was deleted!');
                                        for (let i = 0; i < this.apps.data.length; i++) {
                                            if (this.apps.data[i].appId == app.appId) {
                                                this.apps.data.splice(i, 1);
                                                break;
                                            }
                                            ;
                                        }
                                        ;
                                        this.apps.data = JSON.parse(JSON.stringify(this.apps.data));
                                    }
                                    else {
                                        this.toast.error('issue deleting app!');
                                    }
                                    ;
                                }
                                ;
                            }));
                            break;
                        case (5):
                            const unsubscribe = yield this.dialog.open(UnsubscribeComponent, {
                                'panelClass': 'unsubscribe-dialog',
                                'disableClose': true
                            });
                            yield unsubscribe.afterClosed().subscribe((user) => __awaiter(this, void 0, void 0, function* () {
                                if (user) {
                                    this.loading = true;
                                    const response = yield this.service.unsubscribe({
                                        'email': this.localstorage.get('email'),
                                        'appId': app.appId
                                    });
                                    this.loading = false;
                                    if (response.ok) {
                                        this.toast.success('you were unsubscribed from app!');
                                        for (let i = 0; i < this.apps.data.length; i++) {
                                            if (this.apps.data[i].appId == app.appId) {
                                                this.apps.data.splice(i, 1);
                                                break;
                                            }
                                            ;
                                        }
                                        ;
                                        this.apps.data = JSON.parse(JSON.stringify(this.apps.data));
                                    }
                                    else {
                                        this.toast.error('issue unsubscribing from app!');
                                    }
                                    ;
                                }
                                ;
                            }));
                            break;
                    }
                    ;
                }
                ;
            }));
        });
    }
    ;
    ngOnInit() {
        this.list();
        this.apps.filterPredicate = (data, filter) => data.appName.indexOf(filter) != -1;
        this.subscriptions.search = this.search.change.subscribe(filter => {
            this.apps.filter = filter;
        });
    }
    ;
    ngOnDestroy() {
        this.subscriptions.search.unsubscribe();
    }
    ;
};
__decorate([
    ViewChild(SearchComponent, { 'static': true })
], AppsPage.prototype, "search", void 0);
AppsPage = __decorate([
    Component({
        selector: 'app-apps-page',
        styleUrls: ['./apps.page.scss'],
        templateUrl: './apps.page.html'
    })
], AppsPage);
export { AppsPage };
//# sourceMappingURL=apps.page.js.map