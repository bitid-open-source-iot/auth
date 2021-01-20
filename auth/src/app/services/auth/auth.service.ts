import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
	providedIn: 'root'
})

export class AuthManager implements CanActivate {

	constructor(private account: AccountService, private localstorage: LocalstorageService) { }

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
				}
			} else {
				valid = false;
			}
		}
		if (this.account.authenticated.value != valid) {
			this.account.authenticated.next(valid);
		}
		if (valid) {
			return true;
		} else {
			this.account.signout();
		}
	}
}
