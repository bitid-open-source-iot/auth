import { MatDrawer } from '@angular/material/sidenav';
import { OnInit, Component, ViewChild } from '@angular/core';

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

export class AppComponent implements OnInit {

    @ViewChild(MatDrawer, { static: true }) private drawer?: MatDrawer;
    @ViewChild(SplashScreen, { static: true }) private splashscreen?: SplashScreen;

    constructor(public menu: MenuService, public account: AccountService, private config: ConfigService, private update: UpdateService, private settings: SettingsService) { }

    public app = {
        icon: environment.icon,
        name: environment.appName
    };
    public icon: string = environment.icon;
    public title: any[] = [];
    public badges: any = {};
    public authenticated?: boolean;

    public async signout() {
        await this.menu.close();
        await this.account.signout();
    }

    private async initialize() {
        await this.splashscreen?.show();

        await this.config.init();
        await this.update.init();
        await this.settings.init();

        await this.splashscreen?.hide();
    }

    ngOnInit(): void {
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
                this.app.name = environment.appName;
            };
        });

        this.account.authenticated.subscribe(async (authenticated: any) => {
            this.authenticated = authenticated;
            if (authenticated) {
                this.account.init();
            };
        });

        this.initialize();
    }

}