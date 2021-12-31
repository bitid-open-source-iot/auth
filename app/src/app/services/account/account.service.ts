import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/* --- CLASSES --- */
import { User } from 'src/app/classes/user';

/* --- SERVICES --- */
import { ApiService } from '../api/api.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

/* --- ENVIRONMENT --- */
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class AccountService {

	public user: BehaviorSubject<null | User> = new BehaviorSubject<null | User>(null);
	public authenticated: BehaviorSubject<null | boolean> = new BehaviorSubject<null | boolean>(false);

	constructor(private api: ApiService, private router: Router, private localstorage: LocalStorageService) { }

	public async init() {
		const params = {
			filter: [
				'name',
				'email',
				'picture',
				'username'
			],
			userId: this.localstorage.get('userId')
		};

		const response = await this.api.post(environment.auth, '/users/get', params);

		if (response.ok) {
			this.user.next(response.result);
		} else {
			this.user.next(null);
		};

		return response;
	}

	public async signout() {
		this.localstorage.clear();
		this.authenticated.next(false);
		this.router.navigate(['/signin']);
	}

	public async validate() {
		const now = new Date();
		
		let valid = true;
		
		const token = this.localstorage.getObject('token');
		const userId = this.localstorage.get('userId');

		if (!userId || !token) {
			valid = false;
		} else {
			if (typeof (userId) == 'undefined') {
				valid = false;
			};

			if (typeof (token.expiry) != 'undefined') {
				const expiry = new Date(token.expiry);
				if (expiry < now) {
					valid = false;
				};
			} else {
				valid = false;
			};
		};

		if (valid) {
			this.authenticated.next(true);
			return true;
		} else {
			this.authenticated.next(false);
			return false;
		};
	}

	public async verify(params: VERIFY_PARAMS) {
		return await this.api.put(environment.auth, '/auth/verify', params);
	}

	public async update(params: UPDATE_PARAMS) {
		return await this.api.post(environment.auth, '/users/update', params);
	}

	public async delete(params: DELETE_PARAMS) {
		return await this.api.post(environment.auth, '/users/delete', params);
	}

	public async signin(params: SIGN_IN_PARAMS) {
		const response = await this.api.put(environment.auth, '/auth/authenticate', params);

		if (response.ok) {
			this.localstorage.set('userId', response.result[0].userId);
			this.localstorage.set('tokenId', response.result[0].tokenId);
			this.localstorage.setObject('token', response.result[0].token);
			this.init();
		} else {
			this.authenticated.next(false);
		};

		return response;
	}

	public async register(params: REGISTER_PARAMS) {
		return await this.api.put(environment.auth, '/auth/register', params);
	}

	public async retrieve(params: RETRIEVE_PARAMS) {
		return await this.api.put(environment.auth, '/tokens/retrieve', params);
	}

	public async resetpassword(params: RESET_PASSWORD_PARAMS) {
		return await this.api.put(environment.auth, '/auth/reset-password', params);
	}

	public async changepassword(params: CHANGE_PASSWORD_PARAMS) {
		this.localstorage.set('userId', params.userId);
		return await this.api.put(environment.auth, '/auth/change-password', params);
	}

}

interface VERIFY_PARAMS { }

interface UPDATE_PARAMS { }

interface DELETE_PARAMS { }

interface SIGN_IN_PARAMS {
	email: string;
	password: string;
}

interface REGISTER_PARAMS {
	name: {
		last: string;
		first: string;
	};
	appId: string;
	email: string;
	confirm: string;
	password: string;
	privacyPolicy: string;
	newsAndChanges: string;
	termsAndConditions: string;
}

interface RETRIEVE_PARAMS { }

interface RESET_PASSWORD_PARAMS { }

interface CHANGE_PASSWORD_PARAMS {
	old: string;
	new: string;
	userId: string;
	confirm: string;
}
