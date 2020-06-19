import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { LocalstorageService }  from '../localstorage/localstorage.service';

@Injectable()

export class AccountService {

    constructor(private api: ApiService, private router: Router, private localstorage: LocalstorageService) {};

    public user:            BehaviorSubject<Account>    = new BehaviorSubject(ACCOUNT);
    public authenticated:   BehaviorSubject<boolean>    = new BehaviorSubject(false);
    
    public logout() {
        this.localstorage.clear();
        this.router.navigate(['/signin']);
        this.authenticated.next(false);
    };

    public async load() {
        const response = await this.api.post(environment.auth, '/users/get', {});

        if (response.ok) {
            this.user.next(response.result);
        };
        
        return response;
    };

    public async validate() {
        let now   = new Date();
        let valid = true;
        let email = this.localstorage.get("email");
        let token = this.localstorage.getObject("token");

        if (!email || !token) {
            valid = false;
        } else {
            if (typeof(email) == "undefined") {
                valid = false;
            };

            if (typeof(token.expiry) != "undefined") {
                let expiry = new Date(token.expiry);
                if (expiry < now) {
                    valid = false;
                };
            } else {
                valid = false;
            };
        };

        if (valid) { 
            this.authenticated.next(true);
            return true;
        } else {
            this.authenticated.next(false);
            return false;
        };
    };

    public async login(params) {
        const authenticate = await this.authenticate({
            'email':    params.email,
            'password': params.password
        });

        if (!authenticate.ok)  {
            this.authenticated.next(false);
            authenticate.error.type = "authenticate";
            return authenticate;
        };

        const allowaccess = await this.allowaccess();

        if (allowaccess.ok)  {
            this.authenticated.next(true);
            return allowaccess;
        } else {
            this.authenticated.next(false);
            allowaccess.error.type = "allowaccess";
            return allowaccess;
        };
    };

    private async allowaccess() {
        let expiry = new Date();
        expiry.setDate(expiry.getDate() + 1000);
        
        const response = await this.api.post(environment.auth, '/auth/allowaccess', {
            'appId':        environment.appId,
            'expiry':       expiry,
            'scopes':       environment.scopes,
            'tokenAddOn':   {},
            'description':  environment.appName
        });

        if (response.ok) {
            this.localstorage.setObject('token', response.result[0].token);
        };
        
        return response;
    };

    public async verify(params) {
        params.email        = params.email;
        params.appId        = environment.appId;
        params.description  = environment.appName;
       
        this.localstorage.set('email', params.email);

        return await this.api.put(environment.auth, '/auth/verify', params);
    };

    public async update(params) {
        return await this.api.post(environment.auth, '/users/update', params);
    };

    public async register(params) {
        params.appId    = environment.appId;
        params.description = environment.appName;

        this.localstorage.set('email', params.email);

        return await this.api.put(environment.auth, '/auth/register', params);
    };

    public async removeaccount(params) {
        return await this.api.post(environment.auth, '/users/delete', params);
    };
    
    private async authenticate(params) {
        params.appId    = environment.appId;
        params.description = environment.appName;

        this.localstorage.set('email', params.email);

        const response = await this.api.put(environment.auth, '/auth/authenticate', params);

        if (response.ok) {
            this.localstorage.setObject('token', response.result[0].token);
        };

        return response;
    };

    public async resetpassword(params) {
        params.appId    = environment.appId;
        params.description = environment.appName;

        this.localstorage.set('email', params.email);

        return await this.api.put(environment.auth, '/auth/resetpassword', params);
    };

    public async changepassword(params) {
        this.localstorage.set('email', params.email);
        return await this.api.put(environment.auth, '/auth/changepassword', params);
    };
    
}

const ACCOUNT = {
    'name': {
        'last':     null,
        'first':    null,
        'middle':   null
    },
    'picture':  null,
    'language': null,
    'username': null
};

export interface Account {
    'name'?: {
        'last'?:    string;
        'first'?:   string;
        'middle'?:  string;
    };
    'picture'?:     string;
    'language'?:    string;
    'username'?:    string;
}