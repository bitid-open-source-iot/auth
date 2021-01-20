/* --- PAGES --- */
import { TermsAndConditionsPage } from './terms-and-conditions.page';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    TermsAndConditionsPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TermsAndConditionsRoutingModule {}