import { User } from 'src/app/interfaces/user';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
    providedIn: 'root'
})

export class AppsService {

    public data: App[] = [];

    constructor(private api: ApiService, private localstorage: LocalstorageService) {};

    public async add(params: AddQuery) {
        const response = await this.api.post(environment.auth, '/apps/add', params);
        
        if (response.ok) {
            let app: App    = params;
            app.appId       = response.result.appId;
            this.data.push(app);
        };

        return response;
    };

    public async get(params: GetQuery) {
        return await this.api.post(environment.auth, '/apps/get', params);
    };

    public async load(params: LoadQuery) {
        return await this.api.put(environment.auth, '/apps/load', params);
    };

    public async list(params: ListQuery) {
        const response = await this.api.post(environment.auth, '/apps/list', params);
        
        if (response.ok) {
            this.data = response.result;
        };

        return response;
    };

    public async share(params: ShareQuery) {
        return await this.api.post(environment.auth, '/apps/share', params);
    };

    public async update(params: UpdateQuery) {
        const response = await this.api.post(environment.auth, '/apps/update', params);
        
        if (response.ok) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].appId == params.appId) {
                    Object.keys(params).map(key => {
                        this.data[i][key] = params[key];
                    });
                    break;
                };
            };
        };

        return response;
    };

    public async delete(params: DeleteQuery) {
        const response = await this.api.post(environment.auth, '/apps/delete', params);
        
        if (response.ok) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].appId == params.appId) {
                    this.data.splice(i, 1);
                    break;
                };
            };
        };

        return response;
    };

    public async unsubscribe(params: UnsubscribeQuery) {
        const response = await this.api.post(environment.auth, '/apps/unsubscribe', params);
        
        if (response.ok) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].appId == params.appId && params.email == this.localstorage.get('email')) {
                    this.data.splice(i, 1);
                    break;
                };
            };
        };

        return response;
    };

    public async allowaccess(params: any) {
        return await this.api.put(environment.auth, '/apps/allowaccess', params);
    };

    public async updatesubscriber(params: UpdateSubscriberQuery) {
        return await this.api.post(environment.auth, '/apps/updatesubscriber', params);
    };

}

export interface App {
    'theme'?: {
        'color'?:       string;
        'background'?:  string;
    };
    'role'?:                number;
    'icon'?:	            string;
    'name'?:	            string;
    'users'?:               User[];
    'appId'?:	            string;
    'scopes'?:	            any[];
    'secret'?:	            string;
    'domains'?:	            string[];
    'organizationOnly'?:    number;
}

interface AddQuery {
    'theme'?: {
        'color'?:       string;
        'background'?:  string;
    };
    'icon'?:	            string;
    'name'?:	            string;
    'users'?:               User[];
    'scopes'?:	            any[];
    'secret'?:	            string;
    'domains'?:	            string[];
    'organizationOnly'?:    number;
}

interface GetQuery {
    'appId':    string;
    'filter'?:  string[];
}

interface LoadQuery {
    'appId'?:   string;
    'filter'?:  string[];
}

interface ListQuery {
    'sort'?:    any;
    'skip'?:    number;
    'limit'?:   number;
    'appId'?:   any;
    'filter'?:  string[];
}

interface ShareQuery {
    'role':     number;
    'appId':    string;
    'email':    string;
}

interface UpdateQuery {
    'theme'?: {
        'color':        string;
        'background':   string;
    };
    'icon'?:	            string;
    'name'?:	            string;
    'appId':	            string;
    'scopes'?:	            any[];
    'secret'?:	            string;
    'domains'?:	            string[];
    'organizationOnly'?:    number;
}

interface DeleteQuery {
    'appId':    string;
}

interface UnsubscribeQuery {
    'appId':    string;
    'email':    string;
}

interface UpdateSubscriberQuery {
    'role':     number;
    'appId':    string;
    'email':    string;
}