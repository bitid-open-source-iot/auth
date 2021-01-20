import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SubscribersComponent } from './subscribers.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatTableModule,
        MatDialogModule,
        MatSelectModule,
        MatButtonModule,
        MatToolbarModule
    ],
    declarations: [SubscribersComponent]
})

export class SubscribersModule {}