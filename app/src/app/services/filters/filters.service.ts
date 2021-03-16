import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
    providedIn: 'root'
})

export class FiltersService {

    private filter: BehaviorSubject<Filter[]> = new BehaviorSubject<Filter[]>([]);

    constructor(private localstorage: LocalstorageService) {
        this.filter.next(this.localstorage.getObject('filters', []));
    };

    public get(filter: any) {
        let found: boolean;
        this.filter.value.map(o => {
            if (o.route == window.location.pathname) {
                found = true;
                Object.keys(o.filter).map(key => {
                    filter[key] = o.filter[key];
                });
            };
        });

        if (found) {
            this.update(filter);
        } else {
            this.add(filter);
        };

        return filter;
    };

    public add(filter: any) {
        let filters: Filter[] = this.filter.value;
        filters.push({
            'route': window.location.pathname,
            'filter': filter
        });
        this.localstorage.setObject('filters', filters);
        this.filter.next(filters);
    };

    public update(filter: any) {
        let filters: Filter[] = this.filter.value;
        filters.map(o => {
            if (o.route == window.location.pathname) {
                o.filter = filter;
            };
        });
        this.localstorage.setObject('filters', filters);
        this.filter.next(filters);
    };

}

export interface Filter {
    'route': string;
    'filter': any;
}