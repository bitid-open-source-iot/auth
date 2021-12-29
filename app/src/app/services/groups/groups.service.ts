import { Injectable } from '@angular/core';

/* --- CLASSES --- */
import { Group } from 'src/app/classes/group';

/* --- SERVICES --- */
import { ApiService } from '../api/api.service';

/* --- ENVIRONMENT --- */
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class GroupsService {

	public data: Group[] = [];

	constructor(private api: ApiService) { }

	public async add(params: ADD_PARAMS) {
		return await this.api.post(environment.auth, '/groups/add', params);
	}

	public async get(params: GET_PARAMS) {
		return await this.api.post(environment.auth, '/groups/get', params);
	}

	public async list(params: LIST_PARAMS) {
		return await this.api.post(environment.auth, '/groups/list', params);
	}

	public async share(params: SHARE_PARAMS) {
		return await this.api.post(environment.auth, '/groups/share', params);
	}

	public async update(params: UPDATE_PARAMS) {
		return await this.api.post(environment.auth, '/groups/update', params);
	}

	public async delete(params: DELETE_PARAMS) {
		return await this.api.post(environment.auth, '/groups/delete', params);
	}

	public async unsubscribe(params: UNSUBSCRIBE_PARAMS) {
		return await this.api.post(environment.auth, '/groups/unsubscribe', params);
	}

	public async changeowner(params: CHANGE_OWNER_PARAMS) {
		return await this.api.post(environment.auth, '/groups/change-owner', params);
	}

	public async updatesubscriber(params: UPDATE_SUBSCRIBER_PARAMS) {
		return await this.api.post(environment.auth, '/groups/update-subscriber', params);
	}

}


interface ADD_PARAMS { }

interface GET_PARAMS { }

interface LIST_PARAMS { }

interface SHARE_PARAMS { }

interface UPDATE_PARAMS { }

interface DELETE_PARAMS { }

interface UNSUBSCRIBE_PARAMS { }

interface CHANGE_OWNER_PARAMS { }

interface UPDATE_SUBSCRIBER_PARAMS { }
