import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class ToastService {

    constructor(private snackbar: MatSnackBar) {};

    public async error(message: string, duration?: number) {
        return await this.snackbar.open(message, null, {
            'duration':     duration || 3000,
            'panelClass':   'toast-error'
        });
    };

    public async success(message: string, duration?: number) {
        return await this.snackbar.open(message, null, {
            'duration':     duration || 3000,
            'panelClass':   'toast-success'
        });
    };

}