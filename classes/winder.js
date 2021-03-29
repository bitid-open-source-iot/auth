const caps = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

let capital = (ori) => Object.keys(ori).reduce((res, key) => {
	let val = ori[key];
	let newVal = (typeof val === 'object') ? capital(val) : val;
	res[capitalize(key)] = newVal;
	return res;
}, {});

var lowerlize = (key) => {
	return key.charAt(0).toLowerCase() + key.slice(1)
}

var capitalize = (key) => {
	return key.charAt(0).toUpperCase() + key.slice(1)
}

var capitalize = (key) => {
	return key.charAt(0).toUpperCase() + key.slice(1)
}

let wined = (obj) => Object.keys(obj).reduce((res, key) => {
	if (typeof(obj[key]) === 'object') {
		Object.keys(wined(obj[key])).map(sub => {
			res[key + sub] = obj[key][sub];
		})
	} else {
		res[key] = obj[key];
	}
	return res;
}, {});

class Winder {

    constructor() {}

    wined() {
        const tmp = wined(capital(this));
        const result = {};
        Object.keys(tmp).map(key => {
            result[lowerlize(key)] = tmp[key];
        })
        return result;
    }

	unwined() {
		if (condition) {
			
		} else {
			
		}
	}

}

module.exports = Winder;