import { MatButton } from '@angular/material/button';
import { SplashScreen } from './libs/splashscreen/splashscreen';
import { UpdateService } from './libs/update/update.service';
import { ConfigService } from './services/config/config.service';
import { AccountService } from './services/account/account.service';
import { ButtonsService } from './services/buttons/buttons.service';
import { SettingsService } from './services/settings/settings.service';
import { LocalstorageService } from './services/localstorage/localstorage.service';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { OnInit, Component, ViewChild, Renderer2, AfterViewInit } from '@angular/core';

@Component({
	selector: 'app-root',
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, AfterViewInit {
	@ViewChild(MatDrawer, { static: true }) private drawer: MatDrawer;
	@ViewChild(SplashScreen, { static: true }) private splashscreen: SplashScreen;
	@ViewChild(MatDrawerContainer, { static: true }) private drawercontainer: MatDrawerContainer;

	@ViewChild('add', { static: true }) private add: MatButton;
	@ViewChild('close', { static: true }) private close: MatButton;
	@ViewChild('filter', { static: true }) private filter: MatButton;
	@ViewChild('search', { static: true }) private search: MatButton;

	constructor(private config: ConfigService, private update: UpdateService, private renderer: Renderer2, private buttons: ButtonsService, public account: AccountService, private settings: SettingsService, private localstorage: LocalstorageService) { }

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

	ngAfterViewInit() {
		this.renderer.listen(this.add._elementRef.nativeElement, 'click', event => this.buttons.add.click.next(event));
		this.renderer.listen(this.close._elementRef.nativeElement, 'click', event => this.buttons.close.click.next(event));
		this.renderer.listen(this.filter._elementRef.nativeElement, 'click', event => this.buttons.filter.click.next(event));
		this.renderer.listen(this.search._elementRef.nativeElement, 'click', event => this.buttons.search.click.next(event));

		this.buttons.add.visible.subscribe(visible => {
			if (visible) {
				this.renderer.setStyle(this.add._elementRef.nativeElement, 'display', 'block');
			} else {
				this.renderer.setStyle(this.add._elementRef.nativeElement, 'display', 'none');
			};
		});

		this.buttons.close.visible.subscribe(visible => {
			if (visible) {
				this.renderer.setStyle(this.close._elementRef.nativeElement, 'display', 'block');
			} else {
				this.renderer.setStyle(this.close._elementRef.nativeElement, 'display', 'none');
			};
		});

		this.buttons.filter.visible.subscribe(visible => {
			if (visible) {
				this.renderer.setStyle(this.filter._elementRef.nativeElement, 'display', 'block');
			} else {
				this.renderer.setStyle(this.filter._elementRef.nativeElement, 'display', 'none');
			};
		});

		this.buttons.search.visible.subscribe(visible => {
			if (visible) {
				this.renderer.setStyle(this.search._elementRef.nativeElement, 'display', 'block');
			} else {
				this.renderer.setStyle(this.search._elementRef.nativeElement, 'display', 'none');
			};
		});
	};

}
