import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { BottomSheetComponent } from './bottom-sheet.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatRippleModule
    ],
    declarations: [
        BottomSheetComponent
    ]
})

export class BottomSheetModule {}