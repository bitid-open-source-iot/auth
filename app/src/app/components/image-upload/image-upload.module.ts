import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { ImageUploadComponent } from './image-upload.component';

@NgModule({
    imports: [
        CommonModule,
        MatRippleModule
    ],
    exports: [
        ImageUploadComponent
    ],
    declarations: [
        ImageUploadComponent
    ]
})

export class ImageUploadModule {}