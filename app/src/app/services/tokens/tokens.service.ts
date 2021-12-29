import { Injectable } from '@angular/core';

/* --- CLASSES --- */
import { Token } from 'src/app/classes/token';

/* --- SERVICES --- */
import { ApiService } from 'src/app/services/api/api.service';

/* --- ENVIRONMENT --- */
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class TokensService {

	public data: Token[] = [];

	constructor(private api: ApiService) { }

	public async get(params: GET_PARAMS) {
		return await this.api.post(environment.auth, '/tokens/get', params);
	}

	public async list(params: LIST_PARAMS) {
		return await this.api.post(environment.auth, '/tokens/list', params);
	}

	public async share(params: SHARE_PARAMS) {
		return await this.api.post(environment.auth, '/tokens/share', params);
	}

	public async update(params: UPDATE_PARAMS) {
		return await this.api.post(environment.auth, '/tokens/update', params);
	}

	public async revoke(params: REVOKE_PARAMS) {
		return await this.api.post(environment.auth, '/tokens/revoke', params);
	}

	public async retrieve(params: RETRIEVE_PARAMS) {
		return await this.api.put(environment.auth, '/tokens/retrieve', params);
	}

	public async generate(params: GENERATE_PARAMS) {
		return await this.api.post(environment.auth, '/tokens/generate', params);
	}

	public async unsubscribe(params: UNSUBSCRIBE_PARAMS) {
		return await this.api.post(environment.auth, '/tokens/unsubscribe', params);
	}

	public async changeowner(params: CHANGE_OWNER_PARAMS) {
		return await this.api.post(environment.auth, '/tokens/change-owner', params);
	}

	public async updatesubscriber(params: UPDATE_SUBSCRIBER_PARAMS) {
		return await this.api.post(environment.auth, '/tokens/update-subscriber', params);
	}

}

interface GET_PARAMS {
	filter?: string[];
	tokenId: string;
}

interface LIST_PARAMS {
	appId?: string | string[];
	filter?: string[];
	tokenId?: string | string[];
	private?: boolean | boolean[];

}

interface SHARE_PARAMS {
	id: string;
	role: 1 | 2 | 3 | 4;
	type: string;
	tokenId: string;
}

interface UPDATE_PARAMS {
	tokenId: string;
	disabled?: boolean;
}

interface REVOKE_PARAMS {
	tokenId: string;
}

interface RETRIEVE_PARAMS {
	tokenId: string;
}

interface GENERATE_PARAMS {
	appId: string;
	expiry: Date;
	description: string;
}

interface UNSUBSCRIBE_PARAMS {
	id: string;
	type: string;
	tokenId: string;
}

interface CHANGE_OWNER_PARAMS {
	id: string;
	type: string;
	tokenId: string;
}

interface UPDATE_SUBSCRIBER_PARAMS {
	id: string;
	role: 1 | 2 | 3 | 4;
	type: string;
	tokenId: string;
}