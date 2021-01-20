import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class ScopesService {

	constructor(private api: ApiService) {}

	public async add(params) {
		return await this.api.post(environment.auth, '/scopes/add', params);
	}

	public async get(params) {
		return await this.api.post(environment.auth, '/scopes/get', params);
	}

	public async load(params) {
		return await this.api.put(environment.auth, '/scopes/load', params);
	}

	public async list(params) {
		return await this.api.post(environment.auth, '/scopes/list', params);
	}

	public async update(params) {
		return await this.api.post(environment.auth, '/scopes/update', params);
	}

	public async delete(params) {
		return await this.api.post(environment.auth, '/scopes/delete', params);
	}

}
