import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

/* --- SERVICES --- */
import { AccountService } from '../account/account.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
	providedIn: 'root'
})

export class AuthManager implements CanActivate {

	constructor(private account: AccountService, private localstorage: LocalStorageService) { }

	canActivate() {
		const now = new Date();
		let valid = true;
		const email = this.localstorage.get('email');
		const token = this.localstorage.getObject('token');

		if (!email || !token) {
			valid = false;
		} else {
			// let scopes = token.scopes.map(o => o.url);

			// environment.scopes.map(scope => {
			//     if (!scopes.includes(scope.url)) {
			//         valid = false;
			//     };
			// });

			// if (typeof (email) == 'undefined') {
			//     valid = false;
			// };

			if (typeof (token.expiry) != 'undefined') {
				const expiry = new Date(token.expiry);
				if (expiry < now) {
					valid = false;
				};
			} else {
				valid = false;
			};
		};

		if (this.account.authenticated.value != valid) {
			this.account.authenticated.next(valid);
		};

		if (valid) {
			return true;
		};

		this.account.signout();
		return false;
	}
}
