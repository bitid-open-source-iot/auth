import { NgModule } from '@angular/core';
import { AppsPage } from './apps.page';
import { ShareModule } from 'src/app/components/share/share.module';
import { DeleteModule } from 'src/app/components/delete/delete.module';
import { CommonModule } from '@angular/common';
import { SearchModule } from 'src/app/components/search/search.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AppEditorPage } from './editor/editor.page';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { OrderPipeModule } from 'src/app/pipes/order/order.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FilterPipeModule } from 'src/app/pipes/filter/filter.module';
import { ImageUploadModule } from 'src/app/components/image-upload/image-upload.module';
import { BottomSheetModule } from 'src/app/components/bottom-sheet/bottom-sheet.module';
import { UnsubscribeModule } from 'src/app/components/unsubscribe/unsubscribe.module';
import { SubscribersModule } from 'src/app/components/subscribers/subscribers.module';
import { AppsRoutingModule } from './apps-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        ShareModule,
        CommonModule,
        DeleteModule,
        SearchModule,
        MatIconModule,
        MatMenuModule,
        MatTabsModule,
        MatChipsModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule,
        OrderPipeModule,
        MatToolbarModule,
        FilterPipeModule,
        SubscribersModule,
        UnsubscribeModule,
        BottomSheetModule,
        AppsRoutingModule,
        ImageUploadModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatBottomSheetModule,
        MatProgressBarModule,
        MatAutocompleteModule
    ],
    declarations: [
        AppsPage,
        AppEditorPage
    ]
})

export class AppsModule {}