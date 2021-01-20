import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBy'
})

export class FilterPipe implements PipeTransform {

    transform(array: any[], key: string, value: string): any[] {
        if (typeof(value) != "undefined" && value != "" && value !== null) {
            return array.filter(row => {
                if (row[key].toLocaleLowerCase().trim().indexOf(value.toLocaleLowerCase().trim()) > -1) {
                    return row;
                };
            });
        } else {
            return array;
        };
    };

}