import { Inject, OnInit, Component, OnDestroy } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
    selector:       'app-bottom-sheet',
    styleUrls:      ['./bottom-sheet.component.scss'],
    templateUrl:    './bottom-sheet.component.html'
})

export class BottomSheetComponent implements OnInit, OnDestroy {

    constructor(private sheet: MatBottomSheetRef<BottomSheetComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) private data: any) {};
    
    public title:   string;
    public options: any[]   = [];

    public submit(optionsId) {
        this.sheet.dismiss(optionsId);
    };

    ngOnInit(): void {
        this.title      = this.data.title;
        this.options    = this.data.options.map(option => {
            if (option.disabled.indexOf(this.data.role) > -1) {
                option.disabled = true;
            } else {
                option.disabled = false;
            };
            return option;
        });
    };

    ngOnDestroy(): void {};

}