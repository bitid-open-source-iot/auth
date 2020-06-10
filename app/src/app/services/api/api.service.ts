import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { LocalstorageService }  from '../localstorage/localstorage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class ApiService {

    constructor(private http: HttpClient, private router: Router, private localstorage: LocalstorageService) {}

    private email: string;
    private token: string;

    public async put(url, endpoint, payload) {
        this.email = this.localstorage.get('email');

        if (!this.email || typeof(this.email) == "undefined") {
            this.localstorage.clear();
            this.router.navigate(['/signin'])
        };
        
        const options = {
            'headers': new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        payload.header = {
           'email':         this.email,
           'appId':  environment.appId
        };

        return await this.http.put(url + endpoint, payload, options)
        .toPromise()
        .then(response => {
            return {
                'ok':     true,
                'result': response
            };
        })
        .catch(error => {
            return this.error(error);
        });
    };

    public async post(url, endpoint, payload, settings?) {
        this.email = this.localstorage.get('email');
        this.token = this.localstorage.get('token');

        if (typeof(this.token) == "undefined" || (typeof(this.email) == "undefined")) {
            this.localstorage.clear();
            this.router.navigate(['/signin']);
        };
        
        const options = {
            'headers': new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': this.token
            })
        };

        payload.header = {
           'email':         this.email,
           'appId':  environment.appId
        };

        return await this.http.post(url + endpoint, payload, options)
        .toPromise()
        .then(response => {
            return {
                'ok':     true,
                'result': response
            };
        })
        .catch(async error => {
            const response = await this.error(error);
            if (response.error.code == 401) {
                this.localstorage.clear();
                this.router.navigate(['/signin']);
            };
            return response;
        });
    };

    private async error(error) {
        if (error.error) {
            if (error.error.errors) { 
                error.error = error.error.errors[0];
                if (error.code == 401) {
                    this.localstorage.clear();
                    this.router.navigate(['/signin']);
                };
                return error;
            } else {
                return error;
            };
        } else {
            return error;
        };
    };
}