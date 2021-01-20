import { NgModule } from '@angular/core';
import { AccountPage } from './account.page';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ImageUploadModule } from 'src/app/components/image-upload/image-upload.module';
import { RemoveAccountPage } from './remove-account/remove-account.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangePasswordPage } from './change-password/change-password.page';
import { AccountRoutingModule } from './account-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatToolbarModule,
        ImageUploadModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        MatProgressBarModule
    ],
    declarations: [
        AccountPage,
        RemoveAccountPage,
        ChangePasswordPage
    ]
})

export class AccountModule {}