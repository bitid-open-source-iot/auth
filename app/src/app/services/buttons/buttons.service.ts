import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class ButtonsService {

	constructor() { };

	public add: BUTTON = {
		'click': new Subject(),
		'change': new Subject(),
		'visible': new BehaviorSubject(true)
	};

	public close: BUTTON = {
		'click': new Subject(),
		'change': new Subject(),
		'visible': new BehaviorSubject(true)
	};

	public filter: BUTTON = {
		'click': new Subject(),
		'change': new Subject(),
		'visible': new BehaviorSubject(true)
	};

	public search: BUTTON = {
		'click': new Subject(),
		'change': new Subject(),
		'visible': new BehaviorSubject(true)
	};

	public show(button) {
		this[button].visible.next(true);
	};

	public hide(button) {
		this[button].visible.next(false);
	};

}

interface BUTTON {
	'click': Subject<any>;
	'change'?: Subject<any>;
	'visible': BehaviorSubject<boolean>;
}