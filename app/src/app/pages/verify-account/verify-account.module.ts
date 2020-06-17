import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VerifyAccountPage } from './verify-account.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VerifyAccountRoutingModule } from './verify-account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatToolbarModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        VerifyAccountRoutingModule
    ],
    declarations: [VerifyAccountPage]
})

export class VerifyAccountModule {}