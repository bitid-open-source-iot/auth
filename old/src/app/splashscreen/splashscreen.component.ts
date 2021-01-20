import { Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
    selector:       'app-splashscreen',
    styleUrls:      ['./splashscreen.component.scss'],
    templateUrl:    './splashscreen.component.html',
    encapsulation:  ViewEncapsulation.None
})

export class SplashScreen {

    constructor(private element: ElementRef, private renderer: Renderer2) {
        this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
    };

    public async show() {
        this.renderer.setStyle(this.element.nativeElement, 'display', 'flex');
    };

    public async hide() {
        this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
    };

}