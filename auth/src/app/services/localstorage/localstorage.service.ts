import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class LocalstorageService {

	constructor() {}

	public set(key, value) {
		window.localStorage.setItem(key, value);
	}

	public get(key, value?) {
		const result = window.localStorage.getItem(key);
		if (typeof(result) != 'undefined' && result !== null) {
			return result;
		} else {
			return value;
		}
	}

	public setObject(key, value) {
		window.localStorage.setItem(key, JSON.stringify(value || {}));
	}

	public getObject(key, value?) {
		if (!value) {
			value = {};
		}
		const kayvalue = window.localStorage.getItem(key);
		if (typeof (kayvalue) == 'undefined' || kayvalue == null) {
			return value;
		} else {
			return JSON.parse(kayvalue);
		}
	}

	public clear() {
		window.localStorage.clear();
	}

	public remove(key) {
		window.localStorage.removeItem(key);
	}

}
