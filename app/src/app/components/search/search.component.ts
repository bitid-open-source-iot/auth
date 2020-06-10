import { Subject } from 'rxjs';
import { MatInput } from '@angular/material/input';
import { Input, Output, Component, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector:       'search',
    styleUrls:      ['./search.component.scss'],
    templateUrl:    './search.component.html',
    encapsulation:  ViewEncapsulation.None
})

export class SearchComponent {

    @Input('value')         public value:       string = '';
    @Input('color')         public color:       string = '';
    @Output('change')       public change:      Subject<string> = new Subject<string>();
    @Input('placeholder')   public placeholder: string = '';
    
    @ViewChild(MatInput, {'static': true}) private input: MatInput;
    
    constructor() {};
    
    public active: boolean;

    public toggle() {
        this.value  = '';
        this.active = !this.active;
        this.change.next(this.value);
        setTimeout(() => this.input.focus(), 100);
    };

    public changes(value) {
        this.change.next(value);
    };

}