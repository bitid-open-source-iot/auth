import { NgModule } from '@angular/core';
import { ResetPasswordPage } from './reset-password.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    ResetPasswordPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ResetPasswordRoutingModule {}