/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { OptionsModule } from './libs/options/options.module';
import { ConfirmModule } from './libs/confirm/confirm.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatVersionModule } from './libs/mat-version/mat-version.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SplashscreenModule } from './libs/splashscreen/splashscreen.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* --- SERVICES --- */
import { ApiService } from './services/api/api.service';
import { AppsService } from './services/apps/apps.service';
import { AuthManager } from './services/auth/auth.service';
import { MenuService } from './services/menu/menu.service';
import { ToastService } from './services/toast/toast.service';
import { UsersService } from './services/users/users.service';
import { TokensService } from './services/tokens/tokens.service';
import { ConfigService } from './services/config/config.service';
import { GroupsService } from './services/groups/groups.service';
import { ScopesService } from './services/scopes/scopes.service';
import { AccountService } from './services/account/account.service';
import { FiltersService } from './services/filters/filters.service';
import { SettingsService } from './services/settings/settings.service';
import { FeaturesService } from './services/features/features.service';
import { FormErrorService } from './services/form-error/form-error.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { TipsAndUpdatesService } from './services/tips-and-updates/tips-and-updates.service';

/* --- COMPONENTS --- */
import { AppComponent } from './app.component';

/* --- ENVIRONMENT --- */
import { environment } from '../environments/environment';

@NgModule({
    imports: [
        OptionsModule,
        ConfirmModule,
        BrowserModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatVersionModule,
        MatToolbarModule,
        MatSidenavModule,
        AppRoutingModule,
        HttpClientModule,
        MatSnackBarModule,
        SplashscreenModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [
        ApiService,
        AppsService,
        AuthManager,
        MenuService,
        ToastService,
        UsersService,
        TokensService,
        ConfigService,
        GroupsService,
        ScopesService,
        AccountService,
        FiltersService,
        SettingsService,
        FeaturesService,
        FormErrorService,
        LocalStorageService,
        TipsAndUpdatesService
    ],
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent
    ]
})

export class AppModule { }
