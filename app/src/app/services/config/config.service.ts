import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class ConfigService {

	public loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private api: ApiService) { }

	public async init() {
		let url: string;
		if (environment.production) {
			url = window.location.origin;
		} else {
			url = environment.auth;
		}

		const response = await this.api.put(url, '/config/get', {});

		if (response.ok) {
			Object.keys(response.result).map(key => {
				environment[key] = response.result[key];
			});
			this.loaded.next(true);
			return true;
		} else {
			return false;
		}
	}

}
