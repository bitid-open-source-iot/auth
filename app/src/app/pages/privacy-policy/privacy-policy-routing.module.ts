/* --- PAGES --- */
import { PrivacyPolicyPage } from './privacy-policy.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    PrivacyPolicyPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PrivacyPolicyRoutingModule {}