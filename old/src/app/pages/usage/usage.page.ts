import { MenuService } from 'src/app/services/menu/menu.service';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector:       'app-usage-page',
    styleUrls:      ['./usage.page.scss'],
    templateUrl:    './usage.page.html'
})

export class UsagePage implements OnInit, OnDestroy {

    constructor(public menu: MenuService) {};
    
    public loading: boolean;

    ngOnInit(): void {};

    ngOnDestroy(): void {};

}