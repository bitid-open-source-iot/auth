/* --- PAGES --- */
import { PrivacyPolicyPage } from './privacy-policy.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        PrivacyPolicyRoutingModule
    ],
    declarations: [
        PrivacyPolicyPage
    ]
})

export class PrivacyPolicyModule {}