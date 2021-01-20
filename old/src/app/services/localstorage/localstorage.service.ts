import { Injectable } from '@angular/core';

@Injectable()

export class LocalstorageService {
    set(key, value) {
        window.localStorage.setItem(key, value);
    };

    get(key) {
        return window.localStorage.getItem(key);
    };

    setObject(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value || {}));
    };

    getObject(key) {
        return JSON.parse(window.localStorage.getItem(key) || '{}');
    };

    clear() {
        window.localStorage.clear();
    };

    remove(key) {
        window.localStorage.removeItem(key);
    };
}