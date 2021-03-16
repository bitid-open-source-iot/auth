import { MatInput } from '@angular/material/input';
import { Input, Output, Component, EventEmitter, ViewChild, ViewEncapsulation, OnInit, ElementRef } from '@angular/core';

@Component({
    selector: 'search',
    styleUrls: ['./search.component.scss'],
    templateUrl: './search.component.html',
    encapsulation: ViewEncapsulation.None
})

export class SearchComponent implements OnInit {

    @Input('value') public value: string = '';
    @Input('color') public color: string = '';
    @Output('change') public change: EventEmitter<string> = new EventEmitter<string>();
    @Input('placeholder') public placeholder: string = '';

    @ViewChild(MatInput, { 'static': true }) private input: MatInput;

    constructor(private el: ElementRef) {
        this.element = this.el.nativeElement;
    };

    public active: boolean;
    public element: HTMLElement;

    public reset() {
        this.value = '';
        this.active = false;
    };

    public toggle() {
        this.value = '';
        this.active = !this.active;
        this.change.emit(this.value);
        setTimeout(() => this.input.focus(), 100);
    };

    public changes(value) {
        this.change.emit(value);
    };

    ngOnInit(): void {
        if (this.value.length > 0) {
            this.active = true;
        };
    };

}