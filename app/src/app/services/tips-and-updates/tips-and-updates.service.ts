import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class TipsAndUpdatesService {

	constructor(private api: ApiService) { }

	public async add(params) {
		return await this.api.post(environment.auth, '/tips-and-updates/add', params);
	}

	public async get(params) {
		return await this.api.post(environment.auth, '/tips-and-updates/get', params);
	}

	public async list(params) {
		return await this.api.post(environment.auth, '/tips-and-updates/list', params);
	}

	public async update(params) {
		return await this.api.post(environment.auth, '/tips-and-updates/update', params);
	}

	public async delete(params) {
		return await this.api.post(environment.auth, '/tips-and-updates/delete', params);
	}

}
