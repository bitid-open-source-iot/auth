import { NgModule } from '@angular/core';
import { OrderPipe } from './order.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        OrderPipe
    ],
    declarations: [
        OrderPipe
    ],
    entryComponents: [
        OrderPipe
    ]
})

export class OrderPipeModule {}