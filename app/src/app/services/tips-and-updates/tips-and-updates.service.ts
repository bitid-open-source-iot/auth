import { Injectable } from '@angular/core';

/* --- CLASSES --- */
import { TipUpdate } from 'src/app/classes/tip-update';

/* --- SERVICES --- */
import { ApiService } from '../api/api.service';

/* --- ENVIRONMENT --- */
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class TipsAndUpdatesService {

	public data: TipUpdate[] = [];

	constructor(private api: ApiService) { }

	public async add(params: ADD_PARAMS) {
		return await this.api.post(environment.auth, '/tips-and-updates/add', params);
	}

	public async get(params: GET_PARAMS) {
		return await this.api.post(environment.auth, '/tips-and-updates/get', params);
	}

	public async list(params: LIST_PARAMS) {
		return await this.api.post(environment.auth, '/tips-and-updates/list', params);
	}

	public async update(params: UPDATE_PARAMS) {
		return await this.api.post(environment.auth, '/tips-and-updates/update', params);
	}

	public async delete(params: DELETE_PARAMS) {
		return await this.api.post(environment.auth, '/tips-and-updates/delete', params);
	}

}


interface ADD_PARAMS {
	data: string;
	appId: string;
	title: string;
	subtitle: string;
}

interface GET_PARAMS {
	itemId: string;
	filter?: string[];
}

interface LIST_PARAMS {
	appId?: string | string[];
	filter?: string[];
}

interface UPDATE_PARAMS {
	data?: string;
	appId?: string;
	title?: string;
	itemId: string;
	subtitle?: string;
}

interface DELETE_PARAMS {
	itemId: string;
}
