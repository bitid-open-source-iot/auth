import { NgModule } from '@angular/core';
import { AccountPage } from './account.page';
import { RemoveAccountPage } from './remove-account/remove-account.page';
import { ChangePasswordPage } from './change-password/change-password.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    AccountPage
    },
    {
        'path':         'remove-account',
        'component':    RemoveAccountPage
    },
    {
        'path':         'change-password',
        'component':    ChangePasswordPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AccountRoutingModule {}