import { NgModule } from '@angular/core';
import { UsagePage } from './usage.page';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UsageRoutingModule } from './usage-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        MatButtonModule,
        MatToolbarModule,
        UsageRoutingModule,
        ReactiveFormsModule,
        MatProgressBarModule
    ],
    declarations: [
        UsagePage
    ]
})

export class UsageModule {}