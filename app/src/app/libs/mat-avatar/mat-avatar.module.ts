/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* --- COMPONENTS --- */
import { MatAvatarComponent } from './mat-avatar.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        MatAvatarComponent
    ],
    declarations: [
        MatAvatarComponent
    ]
})

export class MatAvatarModule { }
