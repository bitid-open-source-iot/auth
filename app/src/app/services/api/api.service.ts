import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* --- SERVICES --- */
import { LocalStorageService } from '../local-storage/local-storage.service';

/* --- ENVIRONMENT --- */
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class ApiService {

	constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorageService) { }

	public async put(url: string, endpoint: string, payload: any) {
		const options = {
			'headers': new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		payload.header = {
			'appId': environment.appId,
			'email': this.localstorage.get('email'),
			'userId': this.localstorage.get('userId')
		};

		return await this.http.put([url, endpoint].join(''), payload, options)
			.toPromise()
			.then(response => {
				return ({
					'ok': true,
					'result': response
				} as RESPONSE);
			})
			.catch(error => {
				return this.error(error);
			});
	}

	public async post(url: string, endpoint: string, payload: any) {
		const options = {
			'headers': new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': this.localstorage.get('token')
			})
		};

		payload.header = {
			'email': this.localstorage.get('email'),
			'appId': environment.appId,
			'userId': this.localstorage.get('userId')
		};

		return await this.http.post([url, endpoint].join(''), payload, options)
			.toPromise()
			.then(response => {
				return ({
					ok: true,
					result: response
				} as RESPONSE);
			})
			.catch(error => {
				return this.error(error);
			});
	}

	private async error(error: any) {
		if (error.error) {
			if (error.error.errors) {
				error.error = error.error.errors[0];
				const routes = ['/signin', '/signup', '/verify-account', '/reset-password', '/forgot-password'];
				if (error.error.code == 401) {
					if (routes.includes(window.location.pathname)) {
						return error;
					};
					this.localstorage.clear();
					this.router.navigate(['/signin']);
				}
				return (error as RESPONSE);
			} else {
				return (error as RESPONSE);
			};
		} else {
			return (error as RESPONSE);
		};
	}
}


interface RESPONSE {
	ok: boolean;
	error?: {
		code?: number;
		message?: string;
	};
	result?: any;
}