var ejs= require('ejs');
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port

var pool      =    mysql.createPool({
	connectionLimit : 500, //important
	host     : 'twittertest.cf3yndxmarmx.us-west-2.rds.amazonaws.com',
    user     : 'root',
    password : 'qwerty123',
    database : 'test',
    port	 : 3306,
	debug    :  false
});




function fetchData(callback,sqlQuery){

	console.log("\nSQL Query::"+sqlQuery);

	pool.getConnection(function(err,connection){
		
	    connection.removeListener('error', function (err) {
	        cleanup()
	        reject(err)
	      });
	    
		if (err) {
			connection.release();
			//res.json({"code" : 100, "status" : "Error in connection database"});
			return;
		}   

		console.log('connected as id ' + connection.threadId);

		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
				console.log("ERROR: " + err.message);
			}
			else 
			{	// return err or result
				console.log("DB Results:"+rows);
				callback(err, rows);
			}
		});

		connection.release();

	});
}	

exports.fetchData=fetchData;