import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class ApiService {

	constructor(private http: HttpClient, private router: Router, private localstorage: LocalstorageService) { }

	public async put(url, endpoint, payload) {
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		payload.header = {
			appId: environment.appId,
			email: this.localstorage.get('email')
		};

		return await this.http.put(url + endpoint, payload, options)
			.toPromise()
			.then(response => {
				return {
					ok: true,
					result: response
				};
			})
			.catch(error => {
				return this.error(error);
			});
	}

	public async post(url, endpoint, payload) {
		const email = this.localstorage.get('email');
		const token = this.localstorage.get('token');

		if (typeof (token) == 'undefined' || (typeof (email) == 'undefined')) {
			this.localstorage.clear();
			this.router.navigate(['/signin']);
		}

		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: token
			})
		};

		payload.header = {
			email,
			appId: environment.appId
		};

		return await this.http.post(url + endpoint, payload, options)
			.toPromise()
			.then(response => {
				return {
					ok: true,
					result: response
				};
			})
			.catch(error => {
				return this.error(error);
			});
	}

	private async error(error) {
		if (error.error) {
			if (error.error.errors) {
				error.error = error.error.errors[0];
				if (error.code == 401) {
					this.localstorage.clear();
					this.router.navigate(['/signin']);
				}
				return error;
			} else {
				return error;
			}
		} else {
			return error;
		}
	}
}
