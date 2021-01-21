import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'orderBy',
	pure: false
})

export class OrderPipe implements PipeTransform {

	transform(array: any[], key: string, reverse?: boolean): any[] {
		if (!reverse) {
			return array.sort((a, b) => {
				if (a[key] < b[key]) {
					return -1;
				} else if (a[key] > b[key]) {
					return 1;
				} else {
					return 0;
				}
			});
		} else {
			return array.sort((a, b) => {
				if (a[key] < b[key]) {
					return 1;
				} else if (a[key] > b[key]) {
					return -1;
				} else {
					return 0;
				}
			});
		}
	}

}
