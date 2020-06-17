import { NgModule } from '@angular/core';
import { VerifyAccountPage } from './verify-account.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    VerifyAccountPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class VerifyAccountRoutingModule {}