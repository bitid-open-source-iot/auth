import { __decorate } from "tslib";
/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SplashscreenModule } from './splashscreen/splashscreen.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* --- SERVICES --- */
import { ApiService } from './services/api/api.service';
import { MenuService } from './services/menu/menu.service';
import { AppsService } from './services/apps/apps.service';
import { AuthManager } from './services/account/account.manager';
import { ToastService } from './services/toast/toast.service';
import { AccountService } from './services/account/account.service';
import { FormErrorService } from './services/form-error/form-error.service';
import { LocalstorageService } from './services/localstorage/localstorage.service';
/* --- COMPONENTS --- */
import { AppComponent } from './app.component';
/* --- ENVIRONMENT --- */
import { environment } from '../environments/environment';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            MatIconModule,
            BrowserModule,
            MatListModule,
            MatButtonModule,
            MatToolbarModule,
            AppRoutingModule,
            MatSidenavModule,
            HttpClientModule,
            MatSnackBarModule,
            SplashscreenModule,
            BrowserAnimationsModule,
            ServiceWorkerModule.register('ngsw-worker.js', {
                'enabled': environment.production
            })
        ],
        providers: [
            ApiService,
            MenuService,
            AppsService,
            AuthManager,
            ToastService,
            AccountService,
            FormErrorService,
            LocalstorageService
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map