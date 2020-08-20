/* --- PAGES --- */
import { TermsAndConditionsPage } from './terms-and-conditions.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TermsAndConditionsRoutingModule } from './terms-and-conditions-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        TermsAndConditionsRoutingModule
    ],
    declarations: [
        TermsAndConditionsPage
    ]
})

export class TermsAndConditionsModule {}