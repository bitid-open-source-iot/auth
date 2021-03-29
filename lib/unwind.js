const objectpath = require('object-path');

module.exports = (obj) => {
	var result = {};
	Object.keys(obj).map(key => {
		let segments = key.split(/(?=[A-Z])/);
		if (segments[segments.length - 1].includes('Id') && segments.length > 1) {
			let idField = segments[segments.length - 2] + segments[segments.length - 1];
			segments.splice(-2, 2);
			segments.push(idField);
		}
		if (segments.length == 1) {
			result[segments[0]] = obj[key];
		} else if (segments.length > 1) {
			let saved = [];
			for (let a = 0; a < segments.length; a++) {
				let segment = segments[a].charAt(0).toLowerCase() + segments[a].slice(1);
				saved.push(segment);
				if (a + 1 == segments.length) {
					objectpath.set(result, saved.join('.'), obj[key]);
				} else {
					let found = objectpath.get(result, saved.join('.'));
					if (typeof(found) == 'undefined' || found == null) {
						objectpath.set(result, saved.join('.'), {});
					}
				}
			}
		}
	});
	return result;
};