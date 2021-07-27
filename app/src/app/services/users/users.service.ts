import { User } from 'src/app/classes/user';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class UsersService {

	public data: User[] = [];
	
	constructor(private api: ApiService) { }

	public async list(params) {
		return await this.api.post(environment.auth, '/users/list', params);
	}

}
