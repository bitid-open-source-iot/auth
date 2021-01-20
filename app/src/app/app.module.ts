/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SplashscreenModule } from './libs/splashscreen/splashscreen.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* --- SERVICES --- */
import { ApiService } from './services/api/api.service';
import { AppsService } from './services/apps/apps.service';
import { ToastService } from './services/toast/toast.service';
import { ConfigService } from './services/config/config.service';
import { AccountService } from './services/account/account.service';
import { SettingsService } from './services/settings/settings.service';
import { FeaturesService } from './services/features/features.service';
import { FormErrorService } from './services/form-error/form-error.service';
import { LocalstorageService } from './services/localstorage/localstorage.service';

/* --- COMPONENTS --- */
import { AppComponent } from './app.component';

/* --- ENVIRONMENT --- */
import { environment } from '../environments/environment';

@NgModule({
	imports: [
		MatIconModule,
		BrowserModule,
		MatListModule,
		MatButtonModule,
		MatRippleModule,
		HttpClientModule,
		MatTooltipModule,
		AppRoutingModule,
		MatSidenavModule,
		MatToolbarModule,
		MatSnackBarModule,
		SplashscreenModule,
		MatFormFieldModule,
		BrowserAnimationsModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production
		})
	],
	providers: [
		ApiService,
		AppsService,
		ToastService,
		ConfigService,
		AccountService,
		FeaturesService,
		SettingsService,
		FormErrorService,
		LocalstorageService
	],
	bootstrap: [
		AppComponent
	],
	declarations: [
		AppComponent
	]
})

export class AppModule { }
