import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { AppsPage } from './apps.page';
import { ShareModule } from 'src/app/components/share/share.module';
import { DeleteModule } from 'src/app/components/delete/delete.module';
import { CommonModule } from '@angular/common';
import { SearchModule } from 'src/app/components/search/search.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { AppEditorPage } from './editor/editor.page';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { OrderPipeModule } from 'src/app/pipes/order/order.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BottomSheetModule } from 'src/app/components/bottom-sheet/bottom-sheet.module';
import { UnsubscribeModule } from 'src/app/components/unsubscribe/unsubscribe.module';
import { SubscribersModule } from 'src/app/components/subscribers/subscribers.module';
import { AppsRoutingModule } from './apps-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
let AppsModule = class AppsModule {
};
AppsModule = __decorate([
    NgModule({
        imports: [
            FormsModule,
            ShareModule,
            CommonModule,
            DeleteModule,
            SearchModule,
            MatIconModule,
            MatMenuModule,
            MatInputModule,
            MatTableModule,
            MatSelectModule,
            MatDialogModule,
            MatButtonModule,
            OrderPipeModule,
            MatToolbarModule,
            SubscribersModule,
            UnsubscribeModule,
            BottomSheetModule,
            AppsRoutingModule,
            MatFormFieldModule,
            ReactiveFormsModule,
            MatBottomSheetModule,
            MatProgressBarModule
        ],
        declarations: [
            AppsPage,
            AppEditorPage
        ]
    })
], AppsModule);
export { AppsModule };
//# sourceMappingURL=apps.module.js.map