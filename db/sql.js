const Q = require('q');
const sql = require('mssql');

exports.connect = async () => {
	var deferred = Q.defer();

	try {
		const connection = await sql.connect(__settings.mssql);	
		deferred.resolve(connection);
	} catch (error) {
		deferred.reject(error.message);
	}

	return deferred.promise;
};