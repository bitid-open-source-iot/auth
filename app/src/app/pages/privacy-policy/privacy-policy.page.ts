import { Component } from '@angular/core';
import { HistoryService } from 'src/app/services/history/history.service';

@Component({
    selector: 'app-privacy-policy',
    styleUrls: ['./privacy-policy.page.scss'],
    templateUrl: './privacy-policy.page.html'
})

export class PrivacyPolicyPage {

    constructor(public history: HistoryService) { };

}