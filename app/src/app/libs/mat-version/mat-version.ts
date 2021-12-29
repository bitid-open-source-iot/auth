import { SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { OnInit, Component, OnDestroy, Renderer2, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'mat-version',
	styleUrls: ['./mat-version.scss'],
	templateUrl: './mat-version.html',
	encapsulation: ViewEncapsulation.None
})

export class MatVersion implements OnInit, OnDestroy {


	constructor(private el: ElementRef, private renderer: Renderer2, private readonly updates: SwUpdate) { }

	public version: string = environment.version;
	public available: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private observers: any = {};

	ngOnInit(): void {
		this.renderer.listen(this.el.nativeElement, 'click', event => {
			if (this.available) {
				this.updates.activateUpdate().then(() => document.location.reload());
			}
		});

		this.observers.available = this.updates.available.subscribe(async event => {
			this.available.next(true);
		});
	}

	ngOnDestroy(): void {
		this.observers.available.unsubscribe();
	}

}
