import { Component } from '@angular/core';
import { HistoryService } from 'src/app/services/history/history.service';

@Component({
    selector: 'app-terms-and-conditions-page',
    styleUrls: ['./terms-and-conditions.page.scss'],
    templateUrl: './terms-and-conditions.page.html'
})

export class TermsAndConditionsPage {

    constructor(public history: HistoryService) { };

}