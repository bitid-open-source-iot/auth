import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ShareComponent } from './share.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        ReactiveFormsModule
    ],
    declarations: [ShareComponent]
})

export class ShareModule {}