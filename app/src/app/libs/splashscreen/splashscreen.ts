import { Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'splashscreen',
	styleUrls: ['./splashscreen.scss'],
	templateUrl: './splashscreen.html',
	encapsulation: ViewEncapsulation.None
})

export class SplashScreen {

	constructor(private element: ElementRef, private renderer: Renderer2) {
		this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
	}

	public async show() {
		this.renderer.setStyle(this.element.nativeElement, 'display', 'flex');
	}

	public async hide() {
		this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
	}

}
