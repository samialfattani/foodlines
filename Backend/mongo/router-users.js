
/* jshint esversion:6 */
const express = require('express');
const router = express.Router({mergeParams:true});

//const db = mongojs('192.168.1.108:27017/testdb', ['users']);
const db = require('./dbconnection');
const CRUD = require('./CRUD');


/** this file is to rout all links /api/users/* 
 * GET 		/api/users
 * GET 		/api/users/:usname
 * POST 		/api/users/
 * PUT 		/api/users/:usname
 * DELETE 	/api/users/:usname
 * GET 		/api/users/qry/count
 * GET 		/api/users/qry/avg
**/

const visitsRouter = require('./router-visits');
router.use('/:usname/visits', visitsRouter); //Routing middleware

// READ ------ GET /api/users
router.get('/', function(req, res, next) 
{	
	let qry = {
		selection: {},
		projection: {visits: 0},
		sort:{ name: 1}
	};
	CRUD.read('users', qry, req, res, next);
});


// CREATE ------ POST /api/users/
router.post('/', function(req, res, next) 
{
	let usr = req.body;
	CRUD.insert('users', usr, req, res, next);
	
});


// READ ONE ------- GET /api/users/:usname
router.get('/:usname', (req, res, next)  =>
{
	let qry = {
		selection: { name: {$regex: new RegExp(`^${req.params.usname}$`, 'i')}  },
		projection: {visits: 0},
	};
	
	CRUD.readOne('users', qry, req, res, next);
});

// DELETE ------- /api/users/:usname
router.delete('/:usname', (req, res, next)  =>
{
	let query  = {name : req.params.usname};
	CRUD.delete('users', query, req, res, next);
});


// UPDATE ------- /api/users/:usname
router.put('/:usname', (req, res, next)  =>
{
	let usr = req.body;
	query  = {name : req.params.usname};
	CRUD.update('users', query, usr, req, res, next);
});

// PATCH ------- /api/users/:usname
router.patch('/:usname', (req, res, next)  =>
{
	let usr = req.body;
	query  = {name : req.params.usname};
	CRUD.patch('users', query, usr, req, res, next);
});

//========== others ==========

// ------ GET /api/users/qry/count
router.get('/qry/count', function(req, res, next) 
{	
		let query  = { };
		CRUD.count('users', query, req, res, next);
});

// LOGIN ------- POST /api/users/login
router.post('/login', (req, res, next)  =>
{
	
	let qry	= {name: {$regex: new RegExp(`^${req.body.name}$`, 'i')}   };
	db.users.findOne(qry, (err, usr) => 
	{
		if(err)
			next(err);

		if(usr == null){
			res.status(404); //Not Found
			res.json( {
				"errmsg": 'user name is not registered'
			}) ;
		}
		else if(usr.name.toLowerCase() == req.body.name.toLowerCase() && usr.pw == req.body.pw){
			res.status(201); //201:Accepted
			res.send(usr);
		}else{
			res.status(401); //Unauthorized
			res.json( {
				"errmsg": 'Wrong Password'
			}) ;
		}

	});	
	
});


module.exports = router;