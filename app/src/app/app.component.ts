import { OnInit, Component, ViewChild } from '@angular/core';

/* --- SERVICES --- */
import { SplashScreen } from './libs/splashscreen/splashscreen';
import { UpdateService } from './libs/update/update.service';
import { ConfigService } from './services/config/config.service';
import { AccountService } from './services/account/account.service';
import { SettingsService } from './services/settings/settings.service';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

    @ViewChild(SplashScreen, { static: true }) private splashscreen?: SplashScreen;

    constructor(private config: ConfigService, private update: UpdateService, public account: AccountService, private settings: SettingsService) { }

    private async initialize() {
        await this.splashscreen?.show();

        await this.config.init();
        await this.update.init();
        await this.settings.init();

        await this.splashscreen?.hide();
    }

    ngOnInit(): void {
        this.config.loaded.subscribe(async (loaded) => {
            if (loaded) {
                this.account.validate();
            };
        });

        this.account.authenticated.subscribe(async (authenticated) => {
            if (authenticated) {
                this.account.init();
            };
        });

        this.initialize();
    }

}