import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class AppsService {

	public data: any[] = [];

	constructor(private api: ApiService) { }

	public async add(params) {
		return await this.api.post(environment.auth, '/apps/add', params);
	}

	public async get(params) {
		return await this.api.post(environment.auth, '/apps/get', params);
	}

	public async load(params) {
		return await this.api.put(environment.auth, '/apps/load', params);
	}

	public async list(params) {
		return await this.api.post(environment.auth, '/apps/list', params);
	}

	public async share(params) {
		return await this.api.post(environment.auth, '/apps/share', params);
	}

	public async update(params) {
		return await this.api.post(environment.auth, '/apps/update', params);
	}

	public async delete(params) {
		return await this.api.post(environment.auth, '/apps/delete', params);
	}

	public async allowaccess(params) {
		return await this.api.put(environment.auth, '/apps/allow-access', params);
	}

	public async unsubscribe(params) {
		return await this.api.post(environment.auth, '/apps/unsubscribe', params);
	}

	public async requestaccess(params) {
		return await this.api.put(environment.auth, '/apps/request-access', params);
	}

	public async updatesubscriber(params) {
		return await this.api.post(environment.auth, '/apps/update-subscriber', params);
	}

}
