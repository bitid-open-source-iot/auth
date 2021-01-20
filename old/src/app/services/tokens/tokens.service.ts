import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/interfaces/user';

@Injectable({
    providedIn: 'root'
})

export class TokensService {

    public data: Token[] = [];

    constructor(private api: ApiService) {};

    public async get(params) {
        return await this.api.post(environment.auth, '/tokens/get', params);
    };

    public async list(params) {
        return await this.api.post(environment.auth, '/tokens/list', params);
    };

    public async share(params) {
        return await this.api.post(environment.auth, '/tokens/share', params);
    };

    public async update(params) {
        return await this.api.post(environment.auth, '/tokens/update', params);
    };

    public async revoke(params) {
        return await this.api.post(environment.auth, '/tokens/revoke', params);
    };

    public async retrieve(params) {
        return await this.api.post(environment.auth, '/tokens/retrieve', params);
    };

    public async generate(params) {
        return await this.api.post(environment.auth, '/tokens/generate', params);
    };

    public async unsubscribe(params) {
        return await this.api.post(environment.auth, '/tokens/unsubscribe', params);
    };

    public async updatesubscriber(params) {
        return await this.api.post(environment.auth, '/tokens/updatesubscriber', params);
    };

}

export interface Token {
    'app'?: {
        'name'?:    string;
        'icon'?:    string;
        'appId'?:   string;
    };
    'role'?:        number;
    'users'?:       User[];
    'appId'?:       string;
    'scopes'?:      any[];
    'device'?:      string;
    'expiry'?:      string;
    'tokenId'?:     string;
    'description'?: string;
}