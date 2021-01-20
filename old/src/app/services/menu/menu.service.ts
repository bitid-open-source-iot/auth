import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LocalstorageService } from './../localstorage/localstorage.service';

@Injectable({
    providedIn: 'root'
})

export class MenuService {

    constructor(private localstorage: LocalstorageService) {};

    public menu:   MatSidenav;
    public change: Subject<string> = new Subject();

    public init(menu) {
        this.menu = menu;
    };

    public close() {
        this.menu.close();
    };

    public toggle() {
        this.menu.toggle();
    };

}