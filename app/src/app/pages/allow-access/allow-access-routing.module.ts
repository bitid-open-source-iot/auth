import { NgModule } from '@angular/core';
import { AllowAccessPage } from './allow-access.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    AllowAccessPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AllowAccessRoutingModule {}