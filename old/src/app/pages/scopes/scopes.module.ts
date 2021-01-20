import { NgModule } from '@angular/core';
import { ScopesPage } from './scopes.page';
import { DeleteModule } from 'src/app/components/delete/delete.module';
import { CommonModule } from '@angular/common';
import { SearchModule } from 'src/app/components/search/search.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ScopeEditorPage } from './editor/editor.page';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { OrderPipeModule } from 'src/app/pipes/order/order.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BottomSheetModule } from 'src/app/components/bottom-sheet/bottom-sheet.module';
import { ScopesRoutingModule } from './scopes-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
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
        BottomSheetModule,
        MatFormFieldModule,
        ScopesRoutingModule,
        ReactiveFormsModule,
        MatBottomSheetModule,
        MatProgressBarModule
    ],
    declarations: [
        ScopesPage,
        ScopeEditorPage
    ]
})

export class ScopesModule {}