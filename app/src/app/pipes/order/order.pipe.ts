import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})

export class OrderPipe implements PipeTransform {

    transform(array: any[], key: string, reverse?: boolean): any[] {
        return array.sort((a, b) => {
            if (a[key] < b[key]) {
                if (reverse) {
                    return 1;
                } else {
                    return -1;
                }
            } else if (a[key] > b[key]) {
                if (reverse) {
                    return -1;
                } else {
                    return 1;
                }
            } else {
                return 0;
            };
        });
    };

}