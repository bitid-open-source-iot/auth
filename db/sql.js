const Q = require('q');
const sql = require('mssql');

exports.call = (args) => {
	var deferred = Q.defer();

	const request = new sql.Request();
	request.execute('ListApps', (err, result) => {
		// console.log(result)
	})
	
	return deferred.promise;
};

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

global.__settings = {
	mssql: {
        host: "localhost",
        port: 1433,
        username: "sa",
        password: "Hemsedal2015",
        database: "auth"
    }
}

this.connect();