const Q = require('q');
const sql = require('mssql');

exports.connect = async () => {
	var deferred = Q.defer();

	try {
		const connection = await sql.connect(['mssql://', __settings.mssql.username, ':', __settings.mssql.password, '@', __settings.mssql.host, ':', __settings.mssql.port, '/', __settings.mssql.database].join(''));	
		deferred.resolve(connection);
	} catch (error) {
		deferred.reject(error.message);
	}

	return deferred.promise;
};