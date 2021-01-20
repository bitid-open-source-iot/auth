import { NgModule } from '@angular/core';
import { TokensPage } from './tokens.page';
import { TokenViewerPage } from './viewer/viewer.page';
import { GenerateTokenPage } from './generate/generate.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    TokensPage
    },
    {
        'path':         'generate',
        'component':    GenerateTokenPage
    },
    {
        'path':         ':tokenId',
        'component':    TokenViewerPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TokensRoutingModule {}