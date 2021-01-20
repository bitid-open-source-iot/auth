import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        FilterPipe
    ],
    declarations: [
        FilterPipe
    ]
})

export class FilterPipeModule {}