import { Injectable } from '@angular/core';
import { LocalstorageService } from './../localstorage/localstorage.service';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthManager implements CanActivate {

    constructor(private router: Router, private localstorage: LocalstorageService) {};

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
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
            return true;
        } else {
            return this.router.navigate(["/signin"]);
        };
    };
}
