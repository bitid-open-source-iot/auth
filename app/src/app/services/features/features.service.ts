import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class FeaturesService {

    constructor(private api: ApiService) {};

    public async add(params) {
        return await this.api.post(environment.auth, '/features/add', params);
    };

    public async get(params) {
        return await this.api.post(environment.auth, '/features/get', params);
    };

    public async list(params) {
        return await this.api.post(environment.auth, '/features/list', params);
    };

    public async update(params) {
        return await this.api.post(environment.auth, '/features/update', params);
    };

    public async delete(params) {
        return await this.api.post(environment.auth, '/features/delete', params);
    };

}