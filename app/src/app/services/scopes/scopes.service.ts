import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class ScopesService {

	public data: any[] = [];

	constructor(private api: ApiService) { }

	public async add(params: ADD_PARAMS) {
		return await this.api.post(environment.auth, '/scopes/add', params);
	}

	public async get(params: GET_PARAMS) {
		return await this.api.post(environment.auth, '/scopes/get', params);
	}

	public async list(params: LIST_PARAMS) {
		return await this.api.post(environment.auth, '/scopes/list', params);
	}

	public async update(params: UPDATE_PARAMS) {
		return await this.api.post(environment.auth, '/scopes/update', params);
	}

	public async delete(params: DELETE_PARAMS) {
		return await this.api.post(environment.auth, '/scopes/delete', params);
	}

}


interface ADD_PARAMS { }

interface GET_PARAMS { }

interface LIST_PARAMS { }

interface UPDATE_PARAMS { }

interface DELETE_PARAMS { }
