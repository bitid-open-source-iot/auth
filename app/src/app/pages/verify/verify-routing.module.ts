import { NgModule } from '@angular/core';
import { VerifyPage } from './verify.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    VerifyPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class VerifyRoutingModule {}