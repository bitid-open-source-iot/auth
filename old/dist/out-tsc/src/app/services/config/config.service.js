import { __awaiter, __decorate, __param } from "tslib";
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
let ConfigService = class ConfigService {
    constructor(http, title, meta, document) {
        this.http = http;
        this.title = title;
        this.meta = meta;
        this.document = document;
        this.application = new BehaviorSubject(APPLICATION);
    }
    ;
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                'headers': new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };
            return yield this.http.put(environment.auth + '/clients/load', {
                'hostname': window.location.hostname
            }, options)
                .toPromise()
                .then((response) => {
                this.application.next({
                    'theme': {
                        'color': response.theme.color,
                        'background': response.theme.background
                    },
                    'name': response.name,
                    'icon': response.icon,
                    'favicon': response.favicon
                });
                // environment.scopes          = response.scopes;
                environment.appName = response.name;
                environment.appId = response.appId;
                this.title.setTitle(response.name);
                if (typeof (response.theme) != "undefined") {
                    this.meta.updateTag({ 'name': 'theme-color', 'content': response.theme.background });
                    let style = this.document.createElement('style');
                    style.type = 'text/css';
                    style.innerText = theme_default.split('FONT_COLOR').join(response.theme.color).split('BACKGROUND_COLOR').join(response.theme.background);
                    this.document.body.appendChild(style);
                }
                ;
                return {
                    'ok': true,
                    'result': response
                };
            })
                .catch(error => {
                return {
                    'ok': false,
                    'result': error
                };
            });
        });
    }
    ;
};
ConfigService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(3, Inject(DOCUMENT))
], ConfigService);
export { ConfigService };
export const APPLICATION = {
    'theme': {
        'color': '#FFFFFF',
        'background': '#3860AD'
    },
    'name': 'OpenThings',
    'icon': './assets/icons/icon-512x512.png',
    'favicon': './favicon.ico',
};
const theme_default = `
    mat-toolbar {
        color:              FONT_COLOR !important;
        background-color:   BACKGROUND_COLOR !important;
        button.mat-icon-button.mat-primary {
            color: FONT_COLOR !important;
        }
    }
    mat-list mat-list-item.active,
    mat-list mat-list-item:hover {
        color: BACKGROUND_COLOR !important;
    }
    .small .active {
        color:              FONT_COLOR !important;
        background-color:   BACKGROUND_COLOR !important;
    }
    button.mat-icon-button.mat-primary {
        color: BACKGROUND_COLOR !important;
    }
    button.mat-flat-button.mat-primary {
        color:              FONT_COLOR !important;
        background-color:   BACKGROUND_COLOR !important;
    }
    button.mat-stroked-button.mat-primary {
        color: BACKGROUND_COLOR !important;
    }
`;
//# sourceMappingURL=config.service.js.map