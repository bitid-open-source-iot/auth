import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ShareComponent } from 'src/app/components/share/share.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { App, AppsService } from 'src/app/services/apps/apps.service';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { SubscribersComponent } from 'src/app/components/subscribers/subscribers.component';
import { UnsubscribeComponent } from 'src/app/components/unsubscribe/unsubscribe.component';
import { BottomSheetComponent } from 'src/app/components/bottom-sheet/bottom-sheet.component';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector:       'app-apps-page',
    styleUrls:      ['./apps.page.scss'],
    templateUrl:    './apps.page.html'
})

export class AppsPage implements OnInit, OnDestroy {

    @ViewChild(SearchComponent, {'static': true}) private search: SearchComponent;

    constructor(public menu: MenuService, private toast: ToastService, private sheet: MatBottomSheet, private dialog: MatDialog, private router: Router, private service: AppsService, private localstorage: LocalstorageService) {};

    public sort:            any         = {
        'key':      'name',
        'reverse':  false
    };
    public apps:            any         = new MatTableDataSource();
    public columns:         string[]    = ['icon', 'name'];
    public loading:         boolean;
    private subscriptions:  any         = {};

    private async list() {
        this.loading = true;

        const response = await this.service.list({
            'sort': {
                [this.sort.key]: (this.sort.reverse ? -1 : 1)
            },
            'filter': [
                'role',
                'icon',
                'name',
                'appId'
            ]
        });

        this.loading = false;

        if (response.ok) {
            this.apps.data = response.result;
        } else {
            this.apps.data = [];
        };
    };

    public async options(app: any) {
        const sheet = await this.sheet.open(BottomSheetComponent, {
            'data': {
                'role':     app.role,
                'title':    app.title,
                'options': [
                    {
                        'icon':     'create',
                        'title':    'Edit',
                        'disabled': [0, 1],
                        'optionId': 0
                    },
                    {
                        'icon':     'file_copy',
                        'title':    'Copy',
                        'disabled': [0, 1, 2],
                        'optionId': 1
                    },
                    {
                        'icon':     'share',
                        'title':    'Share',
                        'disabled': [0, 1, 2, 3],
                        'optionId': 2
                    },
                    {
                        'icon':     'people',
                        'title':    'Subscribers',
                        'disabled': [0, 1, 2, 3],
                        'optionId': 3
                    },
                    {
                        'icon':     'delete',
                        'title':    'Delete',
                        'disabled': [0, 1, 2, 3, 4],
                        'optionId': 4
                    },
                    {
                        'icon':     'remove',
                        'title':    'Unsubscribe',
                        'disabled': [5],
                        'optionId': 5
                    }
                ]
            }
        });

        await sheet.afterDismissed().subscribe(async optionId => {
            if (typeof(optionId) !== "undefined") {
                switch(optionId) {
                    case(0):
                        this.router.navigate(['/apps', 'update', app.appId]);
                        break;
                    case(1):
                        this.router.navigate(['/apps', 'copy', app.appId]);
                        break;
                    case(2):
                        const share = await this.dialog.open(ShareComponent, {
                            'panelClass':   'share-dialog',
                            'disableClose': true
                        });

                        await share.afterClosed().subscribe(async user => {
                            if (user) {
                                this.loading = true;

                                const response = await this.service.share({
                                    'role':     user.role,
                                    'email':    user.email,
                                    'appId':    app.appId
                                });

                                this.loading = false;

                                if (response.ok) {
                                    this.toast.success('user was shared to app!');
                                } else {
                                    this.toast.error('issue sharing user to app!');
                                };
                            };
                        });
                        break;
                    case(3):
                        await this.dialog.open(SubscribersComponent, {
                            'data': {
                                'id':       app.appId,
                                'type':     'app',
                                'service':  this.service
                            },
                            'panelClass':   'subscribers-dialog',
                            'disableClose': true
                        });
                        break;
                    case(4):
                        const remove = await this.dialog.open(DeleteComponent, {
                            'panelClass':   'delete-dialog',
                            'disableClose': true
                        });

                        await remove.afterClosed().subscribe(async user => {
                            if (user) {
                                this.loading = true;

                                const response = await this.service.delete({
                                    'appId': app.appId
                                });

                                this.loading = false;

                                if (response.ok) {
                                    this.toast.success('app was deleted!');
                                    for (let i = 0; i < this.apps.data.length; i++) {
                                        if (this.apps.data[i].appId == app.appId) {
                                            this.apps.data.splice(i, 1);
                                            break;
                                        };
                                    };
                                    this.apps.data = JSON.parse(JSON.stringify(this.apps.data));
                                } else {
                                    this.toast.error('issue deleting app!');
                                };
                            };
                        });
                        break;
                    case(5):
                        const unsubscribe = await this.dialog.open(UnsubscribeComponent, {
                            'panelClass':   'unsubscribe-dialog',
                            'disableClose': true
                        });

                        await unsubscribe.afterClosed().subscribe(async user => {
                            if (user) {
                                this.loading = true;

                                const response = await this.service.unsubscribe({
                                    'email':    this.localstorage.get('email'),
                                    'appId':   app.appId
                                });

                                this.loading = false;

                                if (response.ok) {
                                    this.toast.success('you were unsubscribed from app!');
                                    for (let i = 0; i < this.apps.data.length; i++) {
                                        if (this.apps.data[i].appId == app.appId) {
                                            this.apps.data.splice(i, 1);
                                            break;
                                        };
                                    };
                                    this.apps.data = JSON.parse(JSON.stringify(this.apps.data));
                                } else {
                                    this.toast.error('issue unsubscribing from app!');
                                };
                            };
                        });
                        break;
                };
            };
        });
    };

    ngOnInit(): void {
        this.list();

        this.apps.filterPredicate = (app: App, filter: string) => app.name.indexOf(filter) != -1;

        this.subscriptions.search = this.search.change.subscribe(filter => {
            this.apps.filter = filter;
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.search.unsubscribe();
    };

}