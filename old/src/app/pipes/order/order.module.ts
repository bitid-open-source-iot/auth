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
    ]
})

export class OrderPipeModule {}