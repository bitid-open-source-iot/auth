import { NgModule } from '@angular/core';
import { ScopesPage } from './scopes.page';
import { ScopeEditorPage } from './editor/editor.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    ScopesPage
    },
    {
        'path':         ':mode',
        'component':    ScopeEditorPage
    },
    {
        'path':         ':mode/:scopeId',
        'component':    ScopeEditorPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ScopesRoutingModule {}