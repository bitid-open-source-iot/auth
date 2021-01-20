import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreen } from './splashscreen.component';

@NgModule({
    imports: [CommonModule],
    exports: [SplashScreen],
    declarations: [SplashScreen]
})

export class SplashscreenModule {}