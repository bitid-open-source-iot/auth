import * as path from 'object-path';
import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Route, Router, ActivatedRoute } from '@angular/router';

/* --- SERVICES --- */
import { ApiService } from '../api/api.service';

/* --- ENVIRONMENT --- */
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class ConfigService {

	public loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private api: ApiService, private title: Title, private route: ActivatedRoute, private router: Router) { }

	public async init() {
		if (environment.production) {
			environment.auth = window.location.origin
		};

		let params: any = {};
		this.router.config.filter((o: Route) => typeof(o.canActivate) == 'undefined' || o.canActivate != null).map((o: Route) => {
			if (window.location.pathname.includes(o.path as any) && typeof(this.route.snapshot.queryParams['appId']) != 'undefined' && this.route.snapshot.queryParams['appId'] != null) {
				params.appId = this.route.snapshot.queryParams['appId'];
			};
		});

		const response = await this.api.put(environment.auth, '/config/get', params);

		if (response.ok) {
			Object.keys(response.result).map(key => {
				path.set(environment, key, path.get(response.result, key));
			});
			let favicon = <HTMLLinkElement>document.getElementById('favicon');
			favicon.href = response.result.favicon;
			let manifest = <HTMLLinkElement>document.getElementById('manifest');
			manifest.href = [environment.auth, '/apps/manifest'].join('');
			this.title.setTitle(environment.name);
			this.loaded.next(true);
			return true;
		} else {
			return false;
		};
	}

}
