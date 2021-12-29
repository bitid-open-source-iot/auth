import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class MenuService {

	public badge: BehaviorSubject<Object> = new BehaviorSubject<Object>({});
	public events: Subject<string> = new Subject<string>();

	constructor() { }

	public async open() {
		this.events.next('open');
	}

	public async close() {
		this.events.next('close');
	}

	public async toggle() {
		this.events.next('toggle');
	}

	public async addBadge(key: string, value: number) {
		let params = this.badge.value;
		(params as any)[key] = value;
		this.badge.next(params);
	}

	public async clearBadge(key: string) {
		let params = this.badge.value;
		(params as any)[key] = 0;
		this.badge.next(params);
	}

}
