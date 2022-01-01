import { Input, Component, OnChanges, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'mat-avatar',
	styleUrls: ['./mat-avatar.component.scss'],
	templateUrl: './mat-avatar.component.html',
	encapsulation: ViewEncapsulation.None
})

export class MatAvatarComponent implements OnChanges {

	@Input('src') public src?: string;

	constructor(private el: ElementRef, private renderer: Renderer2) { }

	ngOnChanges(): void {
		this.renderer.setStyle(this.el.nativeElement, 'background-image', ['url(', this.src, ')'].join(''));
	}

}
