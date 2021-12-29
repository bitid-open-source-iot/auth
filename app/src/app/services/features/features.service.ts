import { Injectable } from '@angular/core';

/* --- CLASSES --- */
import { Feature } from 'src/app/classes/feature';

/* --- SERVICES --- */
import { ApiService } from '../api/api.service';

/* --- ENVIRONMENT --- */
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class FeaturesService {

	public data: Feature[] = [];

	constructor(private api: ApiService) { }

	public async add(params: ADD_PARAMS) {
		return await this.api.post(environment.auth, '/features/add', params);
	}

	public async get(params: GET_PARAMS) {
		return await this.api.post(environment.auth, '/features/get', params);
	}

	public async list(params: LIST_PARAMS) {
		return await this.api.post(environment.auth, '/features/list', params);
	}

	public async update(params: UPDATE_PARAMS) {
		return await this.api.post(environment.auth, '/features/update', params);
	}

	public async delete(params: DELETE_PARAMS) {
		return await this.api.post(environment.auth, '/features/delete', params);
	}

}

interface ADD_PARAMS { }

interface GET_PARAMS { }

interface LIST_PARAMS { }

interface UPDATE_PARAMS { }

interface DELETE_PARAMS { }
