import { Renderer2, Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[back-button]'
})

export class BackButtonDirective {

	constructor(private el: ElementRef, private renderer: Renderer2) {
		this.renderer.listen(this.el.nativeElement, 'click', event => {
			window.history.back();
		});
	}

}
