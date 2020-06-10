import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UnsubscribeComponent } from './unsubscribe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
let UnsubscribeModule = class UnsubscribeModule {
};
UnsubscribeModule = __decorate([
    NgModule({
        imports: [
            FormsModule,
            CommonModule,
            MatIconModule,
            MatSelectModule,
            MatDialogModule,
            MatButtonModule,
            MatToolbarModule,
            MatFormFieldModule,
            ReactiveFormsModule
        ],
        declarations: [UnsubscribeComponent]
    })
], UnsubscribeModule);
export { UnsubscribeModule };
//# sourceMappingURL=unsubscribe.module.js.map