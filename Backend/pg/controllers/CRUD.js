/* jshint esversion:6 */

const express = require('express');
const router = express.Router();

const sequelize = require('../models/index').sequelize;


const CRUD = {};

CRUD.findAll = (Model, qry, req, res, next) =>
{	
	//console.log(Model);
	Model.findAll( qry )
		.then( (results) => 
		{
			results  = results.map( r => r.get() ); //get row data only
			res.send( results );
		})
		.catch(err => { next(err); });
};

CRUD.findOne = (Model, qry, req, res, next) =>
{	
	//console.log(Model);
	Model.findOne( qry )
		.then( (result) => 
		{
			res.send( result );
		})
		.catch(err => { next(err); });
};


// === SQL Select ===
CRUD.select = (SQL, req, res, next) =>
{	
	SQL = SQL.replace('\n', ' ').replace('\t', ' ');
	sequelize.query( SQL ).spread( (results, metadata) => 
	{
		res.send( results );
	}).catch( err => next(err) );
};

// === ReadOne by SQL Select ===
CRUD.selectOne = (SQL, req, res, next) =>
{
	SQL = SQL.replace('\n', ' ').replace('\t', ' ');
	sequelize.query( SQL ).spread( (results, metadata) => 
	{
		res.send(results[0]);
	}) 
	.catch(err => next(err) );	
};


// === insert ===
CRUD.insert = (Model, doc,req, res, next) =>
{
	Model.create(doc)
		.then( (doc) => res.send(doc) ) 
		.catch(err => next(err) );	
};

// === UPDATE ===
CRUD.update = (Model, doc, qryObj, req, res, next) =>
{	
	Model.update(doc, qryObj)
		.then( (r) => res.send({isUpdated: r[0], updatedObj:doc}) ) 
		.catch(err => next(err) );	
};

// === UPDATE OR INSERT ( UpSert ) ===
CRUD.upsert = (Model, doc, qryObj, req, res, next) =>
{	
	Model.upsert(doc, qryObj)
		.then( (doc) => res.send({updatedObj: doc}) ) 
		.catch(err => next(err) );	
};


// === DELETE ===
CRUD.delete = (Model, qryObj, req, res, next) =>
{
	Model.destroy( qryObj )
		.then( (d) => res.send( {deleted: d} ) ) 
		.catch(err => next(err) );	
};

// === PATCH ===
CRUD.patch = (collection, query, patch, req, res, next) =>
{
};

//***************************** */

module.exports = CRUD;