import { AppsPage } from './apps.page';
import { AppEditorPage } from './editor/editor.page';
import { AppFeaturesPage } from './features/features.page';
import { AppFeatureEditorPage } from './features/editor/editor.page';

import { NgModule } from '@angular/core';
import { ShareModule } from 'src/app/components/share/share.module';
import { DeleteModule } from 'src/app/components/delete/delete.module';
import { CommonModule } from '@angular/common';
import { SearchModule } from 'src/app/components/search/search.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { Routes, RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        'path': '',
        'component': AppsPage
    },
    {
        'path': 'features',
        'component': AppFeaturesPage
    },
    {
        'path': 'features/editor',
        'component': AppFeatureEditorPage
    },
    {
        'path': ':mode',
        'component': AppEditorPage
    },
    {
        'path': ':mode/:appId',
        'component': AppEditorPage
    }
];

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
        ImageUploadModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatBottomSheetModule,
        MatProgressBarModule,
        MatAutocompleteModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        AppsPage,
        AppEditorPage,
        AppFeaturesPage
    ]
})

export class AppsModule {}