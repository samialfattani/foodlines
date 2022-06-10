
/* jshint esversion:6 */
const express = require('express');
const router = express.Router();

const db = require('./dbconnection');

db.on('error', function (err) {
	console.log('database error', err);
});

db.on('connect', function () {
	console.log('database connected !!');
});



/** this file is to SETUP the whole database including:
 * 1. define indexes.
 * 2. define constraints
 * 3. define functions
 * and any other work need to be done to setup the database.
 * this should be called only once in your App life.
 * 
 * GET	/api/setupdb
**/
let result = [];	

function handleResult(err, doc, res, next)
{
	if(err)
		next(err);
	else
	{
		result.push(doc);
		
		//won't send until result is completed by all threads.
		if(result.length == 4)
			res.send(result);
	}
}

// READ ------ GET /api/run/setupdb
router.get('/setupdb', function(req, res, next) 
{
	result = [];

	db.users.createIndex( { "name": 1 }, { unique: true } , 
		(err, doc) => handleResult(err, doc, res, next) 
	);

	db.customers.createIndex( { "name": 1 }, { unique: true } , 
		(err, doc) => handleResult(err, doc, res, next)
	);

	db.categories.createIndex( { "type":1, "name":1 }, { unique: true } , 
		(err, doc) => handleResult(err, doc, res, next)
	);

	db.items.createIndex( { "barcode":1 }, { unique: true } , 
		(err, doc) => handleResult(err, doc, res, next)
	);
	

});

// READ ------ POST /api/run/
router.post('/', (req, res, next) =>
{
	let qry = req.body;
	db.runCommand(qry, (err, doc) =>{
			if(err)
				next(err);
			else
				res.send(doc);
	});

});

module.exports = router;