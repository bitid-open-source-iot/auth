import * as path from 'object-path';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filterBy',
	pure: false
})

export class FilterPipe implements PipeTransform {

	transform(array: any[], params: any, revert?: any[]): any[] {
		return array.filter(item => {
			let found = true;
			Object.keys(params).filter(key => (params[key] !== null && params[key] !== '')).map(key => {
				if (typeof(path.get(item, key)) == 'string') {
					if (!path.get(item, key)?.toLowerCase().includes(params[key]?.toLowerCase())) {
						found = false;
					};
				} else if (path.get(item, key) != params[key]) {
					found = false;
				};
			});
			if (found) {
				return item;
			};
		});
	}

}
