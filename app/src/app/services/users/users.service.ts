import { Injectable } from '@angular/core';

/* --- CLASSES --- */
import { User } from 'src/app/classes/user';

/* --- SERVICES --- */
import { ApiService } from '../api/api.service';

/* --- ENVIRONMENT --- */
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class UsersService {

	public data: User[] = [];

	constructor(private api: ApiService) { }

	public async list(params: LIST_PARAMS) {
		return await this.api.post(environment.auth, '/users/list', params);
	}

}

interface LIST_PARAMS {
	filter?: string[];
	userId?: string | string[];
	validated?: number[];
}