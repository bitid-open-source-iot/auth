import { Group } from 'src/app/classes/group';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class GroupsService {

	public data: Group[] = [];

	constructor(private api: ApiService) { }

	public async add(params) {
		return await this.api.post(environment.auth, '/groups/add', params);
	}

	public async get(params) {
		return await this.api.post(environment.auth, '/groups/get', params);
	}

	public async list(params) {
		return await this.api.post(environment.auth, '/groups/list', params);
	}

	public async share(params) {
		return await this.api.post(environment.auth, '/groups/share', params);
	}

	public async update(params) {
		return await this.api.post(environment.auth, '/groups/update', params);
	}

	public async delete(params) {
		return await this.api.post(environment.auth, '/groups/delete', params);
	}

	public async unsubscribe(params) {
		return await this.api.post(environment.auth, '/groups/unsubscribe', params);
	}

	public async changeowner(params) {
		return await this.api.post(environment.auth, '/groups/change-owner', params);
	}

	public async updatesubscriber(params) {
		return await this.api.post(environment.auth, '/groups/updatesubscriber', params);
	}

}
