import { MenuService } from 'src/app/services/menu/menu.service';
import { OnInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'mat-menu-button',
	styleUrls: ['./mat-menu-button.scss'],
	templateUrl: './mat-menu-button.html',
	encapsulation: ViewEncapsulation.None
})

export class MatMenuButton implements OnInit, OnDestroy {

	constructor(public menu: MenuService) { }

	public badge: number = 0;
	private observers: any = {};

	ngOnInit(): void {
		this.observers.badge = this.menu.badge.subscribe((data: any) => {
			this.badge = 0;
			Object.keys(data).map(key => {
				this.badge += data[key];
			});
		});
	}

	ngOnDestroy(): void {
		this.observers.badge.unsubscribe();
	}

}
