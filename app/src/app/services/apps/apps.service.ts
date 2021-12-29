import { Injectable } from '@angular/core';

/* --- CLASSES --- */
import { App } from 'src/app/classes/app';
import { Accessor } from 'src/app/classes/accessor';

/* --- SERVICES --- */
import { ApiService } from '../api/api.service';

/* --- ENVIRONMENT --- */
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class AppsService {

	public data: App[] = [];

	constructor(private api: ApiService) { }

	public async add(params: ADD_PARAMS) {
		return await this.api.post(environment.auth, '/apps/add', params);
	}

	public async get(params: GET_PARAMS) {
		return await this.api.post(environment.auth, '/apps/get', params);
	}

	public async list(params: LIST_PARAMS) {
		return await this.api.post(environment.auth, '/apps/list', params);
	}

	public async share(params: SHARE_PARAMS) {
		return await this.api.post(environment.auth, '/apps/share', params);
	}

	public async update(params: UPDATE_PARAMS) {
		return await this.api.post(environment.auth, '/apps/update', params);
	}

	public async delete(params: DELETE_PARAMS) {
		return await this.api.post(environment.auth, '/apps/delete', params);
	}

	public async unsubscribe(params: UNSUBSCRIBE_PARAMS) {
		return await this.api.post(environment.auth, '/apps/unsubscribe', params);
	}

	public async changeowner(params: CHANGE_OWNER_PARAMS) {
		return await this.api.put(environment.auth, '/apps/change-owner', params);
	}

	public async updatesubscriber(params: UPDATE_SUBSCRIBER_PARAMS) {
		return await this.api.post(environment.auth, '/apps/update-subscriber', params);
	}

}

interface ADD_PARAMS {
	icons?: {
		icon72x72?: string;
		icon96x96?: string;
		icon128x128?: string;
		icon144x144?: string;
		icon152x152?: string;
		icon192x192?: string;
		icon384x384?: string;
		icon512x512?: string;
	};
	theme?: {
		color?: string;
		background?: string;
	};
	google?: {
		database?: string;
		credentials?: any;
	};
	url?: string;
	icon?: string;
	name?: string;
	apps?: Accessor[];
	users?: Accessor[];
	groups?: Accessor[];
	scopes?: string[];
	secret?: string;
	private?: boolean;
	domains?: string[];
	favicon?: string;
	organizationOnly?: number;
}

interface GET_PARAMS {
	appId?: string;
	filter?: string[];
}

interface LIST_PARAMS {
	appId?: string | string[];
	filter?: string[];
	private?: boolean | boolean[];
}

interface SHARE_PARAMS {
	id?: string;
	role?: 1 | 2 | 3 | 4;
	type?: string;
	appId?: string;
}

interface UPDATE_PARAMS {
	icons?: {
		icon72x72?: string;
		icon96x96?: string;
		icon128x128?: string;
		icon144x144?: string;
		icon152x152?: string;
		icon192x192?: string;
		icon384x384?: string;
		icon512x512?: string;
	};
	theme?: {
		color?: string;
		background?: string;
	};
	google?: {
		database?: string;
		credentials?: any;
	};
	url?: string;
	icon?: string;
	name?: string;
	appId: string;
	scopes?: string[];
	secret?: string;
	private?: boolean;
	domains?: string[];
	favicon?: string;
	organizationOnly?: number;
}

interface DELETE_PARAMS {
	appId?: string;
}

interface UNSUBSCRIBE_PARAMS {
	id?: string;
	type?: string;
	appId?: string;
}

interface CHANGE_OWNER_PARAMS {
	id?: string;
	type?: string;
	appId?: string;
}

interface UPDATE_SUBSCRIBER_PARAMS {
	id?: string;
	role?: 1 | 2 | 3 | 4;
	type?: string;
	appId?: string;
}