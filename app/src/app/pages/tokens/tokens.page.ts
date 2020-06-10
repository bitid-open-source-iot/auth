import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ShareComponent } from 'src/app/components/share/share.component';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { BottomSheetComponent } from 'src/app/components/bottom-sheet/bottom-sheet.component';
import { Token, TokensService } from 'src/app/services/tokens/tokens.service';
import { SubscribersComponent } from 'src/app/components/subscribers/subscribers.component';
import { UnsubscribeComponent } from 'src/app/components/unsubscribe/unsubscribe.component';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector:       'app-tokens-page',
    styleUrls:      ['./tokens.page.scss'],
    templateUrl:    './tokens.page.html'
})

export class TokensPage implements OnInit, OnDestroy {

    @ViewChild(SearchComponent, {'static': true}) private search: SearchComponent;

    constructor(public menu: MenuService, private toast: ToastService, private sheet: MatBottomSheet, private dialog: MatDialog, private router: Router, private service: TokensService, private localstorage: LocalstorageService) {};

    public sort:            any         = {
        'key':      'description',
        'reverse':  false
    };
    public roles:           any[]       = environment.roles;
    public tokens:          any         = new MatTableDataSource();
    public columns:         string[]    = ['icon', 'app', 'description', 'expiry', 'scopes', 'role'];
    public loading:         boolean;
    private subscriptions:  any         = {};

    private async list() {
        this.loading = true;

        const response = await this.service.list({
            'sort': {
                [this.sort.key]: (this.sort.reverse ? -1 : 1)
            },
            'filter': [
                'app',
                'role',
                'device',
                'expiry',
                'scopes',
                'tokenId',
                'description'
            ]
        });

        this.loading = false;

        if (response.ok) {
            this.tokens.data = response.result;
        } else {
            this.tokens.data = [];
        };
    };

    public GetRoleTitle(value) {
        let title;
        this.roles.map(role => {
            if (role.value == value) {
                title = role.title;
            };
        });
        return title;
    };

    public async options(token: Token) {
        const sheet = await this.sheet.open(BottomSheetComponent, {
            'data': {
                'role':     token.role,
                'title':    token.description,
                'options': [
                    {
                        'icon':     'visibility',
                        'title':    'View',
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
                        'title':    'unsubscribe',
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
                        this.router.navigate(['/tokens', token.tokenId]);
                        break;
                    case(1):
                        this.loading = true;

                        const copy = await this.service.retrieve({
                            'appId':        token.app.appId,
                            'description':  token.description
                        });

                        if (copy.ok) {
                            const input             = document.createElement('textarea');
                            input.value             = JSON.stringify(copy.result.token);
                            input.style.top         = '0px';
                            input.style.left        = '0px';
                            input.style.opacity     = '0';
                            input.style.position    = 'fixed';
                            document.body.appendChild(input);
                            input.focus();
                            input.select();
                            document.execCommand("copy");
                            document.body.removeChild(input);
                            this.toast.success('token was copied to clipboard!');
                        } else {
                            this.toast.error('there was an issue retrieving your token!');
                        };

                        this.loading = false;
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
                                    'tokenId':  token.tokenId
                                });

                                this.loading = false;

                                if (response.ok) {
                                    this.toast.success('user was shared to token!');
                                } else {
                                    this.toast.error('issue sharing user to token!');
                                };
                            };
                        });
                        break;
                    case(3):
                        await this.dialog.open(SubscribersComponent, {
                            'data': {
                                'id':       token.tokenId,
                                'type':     'token',
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

                                const response = await this.service.revoke({
                                    'tokenId': token.tokenId
                                });

                                this.loading = false;

                                if (response.ok) {
                                    this.toast.success('token was deleted!');
                                    for (let i = 0; i < this.tokens.data.length; i++) {
                                        if (this.tokens.data[i].tokenId == token.tokenId) {
                                            this.tokens.data.splice(i, 1);
                                            break;
                                        };
                                    };
                                    this.tokens.data = JSON.parse(JSON.stringify(this.tokens.data));
                                } else {
                                    this.toast.error('issue deleting token!');
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
                                    'tokenId':  token.tokenId
                                });

                                this.loading = false;

                                if (response.ok) {
                                    this.toast.success('you were unsubscribed from token!');
                                    for (let i = 0; i < this.tokens.data.length; i++) {
                                        if (this.tokens.data[i].tokenId == token.tokenId) {
                                            this.tokens.data.splice(i, 1);
                                            break;
                                        };
                                    };
                                    this.tokens.data = JSON.parse(JSON.stringify(this.tokens.data));
                                } else {
                                    this.toast.error('issue unsubscribing from token!');
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
            this.tokens.filter = filter;
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.search.unsubscribe();
    };

}