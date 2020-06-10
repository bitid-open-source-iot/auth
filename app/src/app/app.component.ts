import { MatSidenav } from '@angular/material/sidenav';
import { MenuService } from './services/menu/menu.service';
import { SplashScreen } from './splashscreen/splashscreen.component';
import { AccountService } from './services/account/account.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector:       'app-root',
    styleUrls:      ['./app.component.scss'],
    templateUrl:    './app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {

    @ViewChild(MatSidenav, {'static': true})    private sidemenu:       MatSidenav;
    @ViewChild(SplashScreen, {'static': true})  private splashscreen:   SplashScreen;

    constructor(public menu: MenuService, private account: AccountService) {};

    public authenticated:   boolean;
    private subscriptions:  any = {};
    
    public async logout() {
        this.menu.close();
        this.account.logout();
    };

    private async initialize() {
        await this.splashscreen.show();

        await this.account.validate();
        
        await this.splashscreen.hide();
    };

    ngOnInit(): void {
        this.menu.init(this.sidemenu);

        this.subscriptions.authenticated = this.account.authenticated.subscribe(async authenticated => {
            this.authenticated = authenticated;
            if (authenticated) {
                this.account.load();
            };
        });
        
        this.initialize();
    };
    
    ngOnDestroy(): void {
        this.subscriptions.authenticated.unsubscribe();
    };

}