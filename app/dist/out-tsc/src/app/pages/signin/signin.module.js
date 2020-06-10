import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { SigninPage } from './signin.page';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SigninRoutingModule } from './signin-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
let SigninModule = class SigninModule {
};
SigninModule = __decorate([
    NgModule({
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
            SigninRoutingModule,
            MatProgressSpinnerModule
        ],
        declarations: [SigninPage]
    })
], SigninModule);
export { SigninModule };
//# sourceMappingURL=signin.module.js.map