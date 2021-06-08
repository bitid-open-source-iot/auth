/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

/* --- COMPONENTS --- */
import { MatFileComponent } from './mat-file.component';

@NgModule({
    imports: [
        CommonModule,
        MatRippleModule
    ],
    exports: [
        MatFileComponent
    ],
    declarations: [
        MatFileComponent
    ]
})

export class MatFileModule { }
