
/* jshint esversion:6 */
const express = require('express');
const router = express.Router();
const db = require('./dbconnection');
const CRUD = require('./CRUD');

/** this file is to rout all links /api/items/* 
 * GET 		/api/items
 * GET 		/api/items/:id
 * POST 	/api/items/
 * PUT 		/api/items/:id
 * DELETE /api/items/:id
 * GET 		/api/items/qry/count
 * GET 		/api/items/category/:category
****/

// READ ------ GET /api/items
router.get('/', function(req, res, next) 
{	
	let qry = {};
	let sort = { category: 1};
	CRUD.read('items', qry, req, res, sort);
});

// CREATE ------ POST /api/items/
router.post('/', function(req, res, next) 
{
	let itm = req.body;
	CRUD.insert('items',itm, req, res, next);	
});


// READ ONE ------- GET /api/items/:barcode
router.get('/:barcode', (req, res, next)  =>
{
	let qry = {
		selection: {barcode : parseInt(req.params.barcode) },
		projection: {},
		sort:{}
	};
	
	CRUD.readOne('items', qry, req, res, next);
});

// DELETE ------- /api/items/:usname
router.delete('/:barcode', (req, res, next)  =>
{
	let query  = {barcode : parseInt(req.params.barcode)};
	CRUD.delete('items', query, req, res, next);
});


// UPDATE ------- /api/items/:usname
router.put('/:barcode', (req, res, next)  =>
{
	let itm = req.body;
	
	let query  = {barcode : parseInt(req.params.barcode)};
	CRUD.update('items', query, itm, req, res, next);
});

//========== others

// ------ GET /api/items/qry/count
router.get('/qry/count', function(req, res, next) {	

	let query  = { };
	CRUD.count('items', query, req, res, next);
});

// READ - CATEGORY ------ GET /api/items/category/:category
router.get('/category/:category', function(req, res, next) 
{	
	let qry = {
		selection: {  category: {$regex: new RegExp(`^${req.params.category}$`, 'i')}  },
		projection: {},
		sort:{ name: 1}
	};
	CRUD.read('items', qry, req, res, next);

});


module.exports = router;