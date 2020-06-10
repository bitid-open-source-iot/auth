import { NgModule } from '@angular/core';
import { TokensPage } from './tokens.page';
import { ShareModule } from 'src/app/components/share/share.module';
import { DeleteModule } from 'src/app/components/delete/delete.module';
import { CommonModule } from '@angular/common';
import { SearchModule } from 'src/app/components/search/search.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { TokenViewerPage } from './viewer/viewer.page';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { OrderPipeModule } from 'src/app/pipes/order/order.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BottomSheetModule } from 'src/app/components/bottom-sheet/bottom-sheet.module';
import { SubscribersModule } from 'src/app/components/subscribers/subscribers.module';
import { UnsubscribeModule } from 'src/app/components/unsubscribe/unsubscribe.module';
import { GenerateTokenPage } from './generate/generate.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TokensRoutingModule } from './tokens-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
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
        MatCardModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule,
        OrderPipeModule,
        MatToolbarModule,
        BottomSheetModule,
        SubscribersModule,
        UnsubscribeModule,
        MatFormFieldModule,
        TokensRoutingModule,
        ReactiveFormsModule,
        MatBottomSheetModule,
        MatProgressBarModule
    ],
    declarations: [
        TokensPage,
        TokenViewerPage,
        GenerateTokenPage
    ]
})

export class TokensModule {}