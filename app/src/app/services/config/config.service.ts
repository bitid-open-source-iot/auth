import * as path from 'object-path';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/* --- SERVICES --- */
import { ApiService } from '../api/api.service';

/* --- ENVIRONMENT --- */
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class ConfigService {

	public loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private api: ApiService) { }

	public async init() {
		if (environment.production) {
			environment.auth = window.location.origin
		};

		const response = await this.api.put(environment.auth, '/config/get', {});

		if (response.ok) {
			Object.keys(response.result).map(key => {
				path.set(environment, key, path.get(response.result, key));
			});
			let favicon = <HTMLLinkElement>document.getElementById('favicon');
			favicon.href = response.result.favicon;
			let manifest = <HTMLLinkElement>document.getElementById('manifest');
			manifest.href = [environment.auth, '/apps/manifest'].join('');
			this.loaded.next(true);
			return true;
		} else {
			return false;
		};
	}

}
