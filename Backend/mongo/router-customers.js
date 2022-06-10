
/* jshint esversion:6 */
const express = require('express');
const router = express.Router();

//const db = mongojs('192.168.1.108:27017/testdb', ['customers']);
const db = require('./dbconnection');
const CRUD = require('./CRUD');


/** this file is to rout all links /api/customers/* 
 * GET 		/api/customers
 * GET 		/api/customers/:id
 * POST 		/api/customers/
 * PUT 		/api/customers/:id
 * DELETE 	/api/customers/:id
 * GET 		/api/customers/qry/count
 * GET 		/api/customers/qry/avg
**/


// READ ------ GET /api/customers
router.get('/', function(req, res, next) 
{	
	let qry = {
		selection: { },
		projection: {},
		sort:{ name: 1}
	};
	CRUD.read('customers', qry, req, res, next);
});


// CREATE ------ POST /api/customers/
router.post('/', function(req, res, next) 
{
	let usr = req.body;
	CRUD.insert('customers', usr, req, res, next);
	
});


// READ ONE ------- GET /api/customers/:cusname
router.get('/:cusname', (req, res, next)  =>
{
	let qry = {
		selection: {name : req.params.cusname},
		projection: {},
		sort:{ name: 1}
	};
	CRUD.readOne('customers', qry, req, res, next);
});

// DELETE ------- /api/customers/:_id
router.delete('/:_id', (req, res, next)  =>
{
	let query  = {_id : db.ObjectId(req.params._id)  };
	CRUD.delete('customers', query, req, res, next);
});


// UPDATE ------- /api/customers/:_id
router.put('/:_id', (req, res, next)  =>
{
	let usr = req.body;
	let query  = { _id : db.ObjectId(req.params._id) };
	CRUD.update('customers', query, usr, req, res, next);
});

//========== others ==========

// ------ GET /api/customers/qry/count
router.get('/qry/count', function(req, res, next) 
{	
		let query  = { };
		CRUD.count('customers', query, req, res, next);
});



module.exports = router;