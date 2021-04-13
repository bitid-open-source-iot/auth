const objectpath = require('object-path');

module.exports = (item, filter) => {
	var result = {};
	Object.keys(filter).map(key => {
		result[key] = objectpath.get(item, key);
	});
	if (typeof(result.bitid) == 'undefined' || result.bitid == null) {
		result.bitid = {auth: {}};
	};
	if (typeof(result.server) == 'undefined' || result.server == null) {
		result.server = {};
		if (typeof(result['server.date']) != 'undefined' && result['server.date'] != null) {
			result.server.date = result['server.date'];
			delete result['server.date'];
		};
	};
	if (typeof(result['bitid.auth.users']) != 'undefined' && result['bitid.auth.users'] != null) {
		result.bitid.auth.users = result['bitid.auth.users'];
		delete result['bitid.auth.users'];
	};
	if (typeof(result['bitid.auth.organizationOnly']) != 'undefined' && result['bitid.auth.organizationOnly'] != null) {
		result.bitid.auth.organizationOnly = result['bitid.auth.organizationOnly'];
		delete result['bitid.auth.organizationOnly'];
	};
	return result;
};