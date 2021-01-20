import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
	providedIn: 'root'
})

export class AccountService {

	public user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
	public authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private api: ApiService, private router: Router, private localstorage: LocalstorageService) { }

	public async init() {
		const params = {
			filter: [
				'name',
				'email',
				'picture',
				'username'
			],
			email: this.localstorage.get('email')
		};

		const response = await this.api.post(environment.auth, '/users/get', params);

		if (response.ok) {
			this.user.next(response.result);
			this.authenticated.next(true);
		} else {
			this.user.next(null);
			this.authenticated.next(false);
		};

		return response;
	}

	public async signout() {
		this.localstorage.clear();
		this.authenticated.next(false);
		this.router.navigate(['/signin']);
	}

	public async signin(params) {
		this.localstorage.set('email', params.email);

		params.appId = environment.appId;
		params.scopes = environment.scopes;
		params.expiry = new Date(new Date().valueOf() + (60 * 60 * 1000));
		params.description = environment.appName;

		const response = await this.api.put(environment.auth, '/auth/authenticate', params);

		if (response.ok) {
			this.localstorage.setObject('token', response.result[0].token);
			this.init();
		} else {
			this.authenticated.next(false);
		}

		return response;
	}

	public async verify(params) {
		this.localstorage.set('email', params.email);

		return await this.api.put(environment.auth, '/auth/verify', params);
	}

    public async update(params) {
        return await this.api.post(environment.auth, '/users/update', params);
    }

	public async register(params) {
		this.localstorage.set('email', params.email);

		return await this.api.put(environment.auth, '/auth/register', params);
	}

	public async retrieve(params) {
		this.localstorage.set('email', params.email);
		return await this.api.put(environment.auth, '/tokens/retrieve', params);
	}

    public async removeaccount(params) {
        return await this.api.post(environment.auth, '/users/delete', params);
    }

	public async resetpassword(params) {
		params.appId = environment.appId;
		params.description = environment.appName;

		this.localstorage.set('email', params.email);

		return await this.api.put(environment.auth, '/auth/resetpassword', params);
	}

	public async changepassword(params) {
		this.localstorage.set('email', params.email);
		return await this.api.put(environment.auth, '/auth/changepassword', params);
	}

}

interface User {
	'name'?: {
		'last'?: string;
		'first'?: string;
		'middle'?: string;
	};
	'email'?: string;
	'picture'?: string;
	'username'?: string;
}
