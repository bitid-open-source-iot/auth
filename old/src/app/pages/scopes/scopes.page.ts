import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { BottomSheetComponent } from 'src/app/components/bottom-sheet/bottom-sheet.component';
import { Scope, ScopesService } from 'src/app/services/scopes/scopes.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector:       'app-scopes-page',
    styleUrls:      ['./scopes.page.scss'],
    templateUrl:    './scopes.page.html'
})

export class ScopesPage implements OnInit, OnDestroy {

    @ViewChild(SearchComponent, {'static': true}) private search: SearchComponent;

    constructor(public menu: MenuService, private toast: ToastService, private sheet: MatBottomSheet, private dialog: MatDialog, private router: Router, private service: ScopesService) {};

    public sort:            any         = {
        'key':      'description',
        'reverse':  false
    };
    public scopes:          any         = new MatTableDataSource();
    public columns:         string[]    = ['app', 'description', 'url'];
    public loading:         boolean;
    private subscriptions:  any         = {};

    private async list() {
        this.loading = true;

        const response = await this.service.list({
            'sort': {
                [this.sort.key]: (this.sort.reverse ? -1 : 1)
            },
            'filter': [
                'url',
                'app',
                'role',
                'appId',
                'scopeId',
                'description'
            ]
        });

        this.loading = false;

        if (response.ok) {
            this.scopes.data = response.result;
        } else {
            this.scopes.data = [];
        };
    };

    public async options(scope: Scope) {
        const sheet = await this.sheet.open(BottomSheetComponent, {
            'data': {
                'role':     scope.role,
                'title':    scope.description,
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
                        'icon':     'delete',
                        'title':    'Delete',
                        'disabled': [0, 1, 2, 3, 4],
                        'optionId': 2
                    }
                ]
            }
        });

        await sheet.afterDismissed().subscribe(async optionId => {
            if (typeof(optionId) !== "undefined") {
                switch(optionId) {
                    case(0):
                        this.router.navigate(['/scopes', 'update', scope.scopeId]);
                        break;
                    case(1):
                        this.router.navigate(['/scopes', 'copy', scope.scopeId]);
                        break;
                    case(2):
                        const remove = await this.dialog.open(DeleteComponent, {
                            'panelClass':   'delete-dialog',
                            'disableClose': true
                        });

                        await remove.afterClosed().subscribe(async user => {
                            if (user) {
                                this.loading = true;

                                const response = await this.service.delete({
                                    'scopeId': scope.scopeId
                                });

                                this.loading = false;

                                if (response.ok) {
                                    this.toast.success('scope was deleted!');
                                    for (let i = 0; i < this.scopes.data.length; i++) {
                                        if (this.scopes.data[i].scopeId == scope.scopeId) {
                                            this.scopes.data.splice(i, 1);
                                            break;
                                        };
                                    };
                                    this.scopes.data = JSON.parse(JSON.stringify(this.scopes.data));
                                } else {
                                    this.toast.error('issue deleting scope!');
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

        this.subscriptions.search = this.search.change.subscribe(filter => {
            this.scopes.filter = filter;
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.search.unsubscribe();
    };

}