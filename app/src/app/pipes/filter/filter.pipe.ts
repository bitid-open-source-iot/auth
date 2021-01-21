import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filterBy',
	pure: false
})

export class FilterPipe implements PipeTransform {

	transform(array: any[], params: any, revert?: any[]): any[] {
		const filters = Object.keys(params).filter(key => (params[key] !== null && params[key] !== '' && params[key].length != 0));
		if (filters.length > 0) {
			return array.filter(item => {
				let found = false;
				filters.map(key => {
					if (item.hasOwnProperty(key)) {
						if (typeof(item[key]) == 'string') {
							if (typeof(params[key]) == 'string') {
								found = (item[key].trim().toLowerCase().indexOf(params[key].trim().toLowerCase()) > -1);
							} else if (Array.isArray(params[key])) {
								found = (params[key].filter(o => item[key].trim().toLowerCase().indexOf(o) > -1).length > 0);
							} else if (typeof(params[key]) == 'number') {
								found = (item[key].trim().toLowerCase().indexOf(params[key]) > -1);
							}
						} else if (Array.isArray(item[key])) {
							if (typeof(params[key]) == 'string') {
								found = (item[key].includes(params[key].trim().toLowerCase()) > -1);
							} else if (Array.isArray(params[key])) {
								found = (params[key].filter(o => item[key].includes(o)).length > 0);
							} else if (typeof(params[key]) == 'number') {
								found = (item[key].includes(params[key]) > -1);
							}
						} else if (typeof(item[key]) == 'number') {
							if (typeof(params[key]) == 'string') {
								found = (item[key].toString().trim().toLowerCase().indexOf(params[key].trim().toLowerCase()) > -1);
							} else if (Array.isArray(params[key])) {
								found = (params[key].includes(item[key]).length > -1);
							} else if (typeof(params[key]) == 'number') {
								found = (item[key] == params[key]);
							}
						}
					}
				});
				if (found) {
					return item;
				}
			});
		} else {
			if (Array.isArray(revert)) {
				return revert;
			} else {
				return array;
			}
		}
	}

}
