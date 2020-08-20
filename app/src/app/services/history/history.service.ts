import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class HistoryService {

    private current: any = {};
    private previous: any = {};

    constructor(private router: Router) { };

    public init() {
        this.current = {
            'route': this.router.url.split('?')[0],
            'params': (this.router.url.split('?').length == 2 ? this.GetParams(this.router.url.split('?')[1]) : {}),
        };;
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.previous = this.current;
                this.current = {
                    'route': event.url.split('?')[0],
                    'params': (event.url.split('?').length == 2 ? this.GetParams(event.url.split('?')[1]) : {}),
                };
            };
        });
    };

    private GetParams(params) {
        let result = {};
        params.split('&').map(o => {
            o = o.split('=');
            result[o[0]] = o[1];
        });
        return result;
    };

    public async back() {
        this.router.navigate([this.previous.route], {
            'queryParams': this.previous.params
        });
    };

}