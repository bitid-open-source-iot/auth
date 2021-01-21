import { ButtonsService } from 'src/app/services/buttons/buttons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'apps-editor-page',
    styleUrls: ['./editor.page.scss'],
    templateUrl: './editor.page.html'
})

export class AppsEditorpage implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private router: Router, private buttons: ButtonsService) { };

    private subscriptions: any = { };

    ngOnInit(): void {
        this.buttons.hide('add');
        this.buttons.show('close');
        this.buttons.hide('filter');
        this.buttons.hide('search');
        
        this.subscriptions.close = this.buttons.close.click.subscribe(event => {
            this.router.navigate(['/apps']);
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.close.unsubscribe();
    };

}