import { SplashScreen } from './libs/splashscreen/splashscreen';
import { UpdateService } from './libs/update/update.service';
import { ConfigService } from './services/config/config.service';
import { AccountService } from './services/account/account.service';
import { SettingsService } from './services/settings/settings.service';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { OnInit, Component, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';

@Component({
	selector: 'app-root',
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

	@ViewChild(MatDrawer, { static: true }) private drawer: MatDrawer;
	@ViewChild(SplashScreen, { static: true }) private splashscreen: SplashScreen;
	@ViewChild(MatDrawerContainer, { static: true }) private drawercontainer: MatDrawerContainer;

	constructor(private config: ConfigService, private update: UpdateService, public account: AccountService, private settings: SettingsService, private localstorage: LocalstorageService) { }

	public minified: boolean = JSON.parse(this.localstorage.get('minified', false));
	public authenticated: boolean;

	public toggle() {
		this.minified = !this.minified;
		this.localstorage.set('minified', this.minified);
	}

	private async initialize() {
		await this.splashscreen.show();

		if (window.innerWidth <= 600) {
			this.drawer.mode = 'push';
			this.drawercontainer.hasBackdrop = false;
		} else {
			this.drawer.mode = 'side';
		}

		await this.config.init();
		await this.update.init();
		await this.settings.init();

		await this.splashscreen.hide();
	}

	ngOnInit(): void {
		this.config.loaded.subscribe(async loaded => {
			if (loaded) {
				this.account.init();
			}
		});

		this.account.authenticated.subscribe(authenticated => {
			this.authenticated = authenticated;
		});

		this.initialize();
	}

}
