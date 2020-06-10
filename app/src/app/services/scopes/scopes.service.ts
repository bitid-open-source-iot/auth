import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/interfaces/user';

@Injectable({
    providedIn: 'root'
})

export class ScopesService {

    public data: Scope[] = [];

    constructor(private api: ApiService) {};

    public async add(params) {
        return await this.api.post(environment.auth, '/scopes/add', params);
    };

    public async get(params) {
        return await this.api.post(environment.auth, '/scopes/get', params);
    };

    public async list(params) {
        return await this.api.post(environment.auth, '/scopes/list', params);
    };

    public async update(params) {
        return await this.api.post(environment.auth, '/scopes/update', params);
    };

    public async delete(params) {
        return await this.api.post(environment.auth, '/scopes/delete', params);
    };

}

export interface Scope {
    'url'?:	        string;
    'role'?:        number;
    'roles'?:       number[];
    'users'?:       User[];
    'appId'?:	    string;
    'scopeId'?:	    string;
    'description'?: number;
}