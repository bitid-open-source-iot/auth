import { NgModule } from '@angular/core';
import { AppsPage } from './apps.page';
import { AppEditorPage } from './editor/editor.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    AppsPage
    },
    {
        'path':         ':mode',
        'component':    AppEditorPage
    },
    {
        'path':         ':mode/:appId',
        'component':    AppEditorPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AppsRoutingModule {}