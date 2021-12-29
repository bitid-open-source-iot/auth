import * as path from 'object-path';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'describe'
})

export class DescribePipe implements PipeTransform {

    transform(array: any[], idKey: string, idValue: string, describeKey: string) {
        let result = '';
        for (let i = 0; i < array.length; i++) {
            if (path.get(array[i], idKey) == idValue) {
                result = path.get(array[i], describeKey);
                break;
            };
        };
        return result;
    }

}
