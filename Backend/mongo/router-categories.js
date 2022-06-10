
/* jshint esversion:6 */
const express = require('express');
const router = express.Router();
const db = require('./dbconnection');
const CRUD = require('./CRUD');


/** this file is to rout all links /api/categories/* 
 * GET 		/api/categories
 * GET 		/api/categories/type/:type
 * POST 		/api/categories/
 * DELETE 	/api/categories/:_id
****/


// READ ------ GET /api/categories
router.get('/', function(req, res, next) {	
	
	let qry = {};
	let sort = {type:1, name:1};
	CRUD.read('categories', qry, req, res, sort, next);
				
});

// READ - BY TYPE ------ GET /api/categories/type/:type
router.get('/type/:type', function(req, res, next) 
{	
	let qry = { 
		type: {$regex: new RegExp(`^${req.params.type}$`, 'i')}  
	};
	let sort = {type:1, name:1};
	CRUD.read('categories', qry, req, res, sort, next);
});

// CREATE ------ POST /api/categories/
router.post('/', function(req, res, next) 
{
	let cat = req.body; //json formatt.
	CRUD.insert('categories',cat, req, res, next);	

});


// DELETE ------- /api/categories/:_id
router.delete('/:_id', (req, res, next)  =>
{
	let query  = {_id : db.ObjectId(req.params._id) };
	CRUD.delete('categories', query, req, res, next);
});


//========== others



module.exports = router;