import { MatDrawer } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { Component, ViewChild, AfterViewInit } from '@angular/core';

/* --- SERVICES --- */
import { MenuService } from './services/menu/menu.service';
import { UpdateService } from './libs/update/update.service';
import { ConfigService } from './services/config/config.service';
import { AccountService } from './services/account/account.service';
import { SettingsService } from './services/settings/settings.service';

/* --- COMPONENTS --- */
import { SplashScreen } from './libs/splashscreen/splashscreen';

/* --- ENVIRONMENT --- */
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})

export class AppComponent implements AfterViewInit {

    @ViewChild(MatDrawer, { static: true }) private drawer?: MatDrawer;
    @ViewChild(SplashScreen, { static: true }) private splashscreen?: SplashScreen;

    constructor(public menu: MenuService, public account: AccountService, private config: ConfigService, private update: UpdateService, private router: Router, private settings: SettingsService) { }

    public app = {
        icon: environment.icon,
        name: environment.name
    };
    public icon: string = environment.icon;
    public title: any[] = [];
    public badges: any = {};
    public authenticated?: boolean;

    private async initialize() {
        await this.splashscreen?.show();

        await this.config.init();
        await this.update.init();
        await this.settings.init();

        await this.splashscreen?.hide();
    }

    ngAfterViewInit(): void {
        this.menu.events.subscribe(event => {
            switch (event) {
                case ('open'):
                    this.drawer?.open();
                    break;
                case ('close'):
                    this.drawer?.close();
                    break;
                case ('toggle'):
                    this.drawer?.toggle();
                    break;
            };
        });

        this.menu.badge.subscribe((data: any) => {
            Object.keys(data).map(key => {
                (this.badges as any)[key] = data[key];
            });
        });

        this.config.loaded.subscribe(async (loaded) => {
            if (loaded) {
                this.account.validate();
                this.app.icon = environment.icon;
                this.app.name = environment.name;
            };
        });

        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd && this.drawer?.opened) {
                this.drawer?.close();
            };
        });

        this.account.authenticated.subscribe(async (authenticated: any) => {
            this.authenticated = authenticated;
            if (authenticated) {
                this.account.init();
            };
        });

        const ready = this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                ready.unsubscribe();
                this.initialize();
            };
        });
    }

}