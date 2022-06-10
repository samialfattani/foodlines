/* jshint esversion:6 */

const express = require('express');
const router = express.Router();

//const db = mongojs('192.168.1.108:27017/testdb', ['users']);
const db = require('./dbconnection');

const CRUD = {};

// === ReadOne ===
CRUD.readOne = (collection, qry, req, res, next) =>
{
	db[collection].findOne(qry.selection, qry.projection , (err, doc) => 
	{
		if(err)
			next(err);
		else
			res.send(doc);
	});
}

// === readAll ===
CRUD.read = (collection, qry, req, res, next) =>
{	
	db[collection]
		.find(qry.selection, qry.projection)
		.sort(qry.sort, (err, docs) => 
		{
			if(err)
				next(err);
			else{
				if(docs.length == 0 )
					res.status(204).send(docs); //204 - No Content
				else
					res.send(docs);
			}
	});

};

// === insert ===
CRUD.insert = (collection, doc,req, res, next) =>
{
	
	if(doc == null ){
		res.status(406); //Not Acceptable	
		res.json({
			"errmsg": "Bad data, empty data is submitted"
		});
	}else{
		db[collection].save(doc, (err, savedDoc) => {
				
				if(err)
					next(err);
				else{
					res.status(201); //Created
					res.send(savedDoc);
				}
		});
	}
};

// === DELETE ===
CRUD.delete = (collection, query, req, res, next) =>
{
	db[collection].remove(query , (err, result) => 
	{
		if(err)
			next(err);
		else
		{
			if(result.nDeleted == 0)
				res.status(400).send({ errmsg: `didn't Deleted, most propubly because of giving wrong id`});	 //bad request
			else
				res.send(result);
		}
	});
};

// === UPDATE ===
CRUD.update = (collection, query, doc, req, res, next) =>
{
	
	delete doc._id;

	db[collection].update(query , doc, (err, result) => 
	{
		if(err)
			next(err);
		else{
			if(result.nModified == 0)
				res.status(400).send({ errmsg: `didn't modifed, most propubly because of giving wrong id`});	 //bad request
			else
				res.send(result);
		}
	});

};

// === PATCH ===
CRUD.patch = (collection, query, patch, req, res, next) =>
{
	console.log(patch);

	db[collection].findAndModify({
		query: query,
		update: { $set: patch },
		new: true
	}, (err, doc, lastErrorObject) => {
		if(err)
			next(err);
		else
			res.send(doc);
	});
	
}

//***************************** */

// === COUNT ===
CRUD.count = (collection, query, req, res, next) =>
{
	db[collection]
		.find(query)
		.count( (err, count) => 
		{

			if(err)
				next(err);
			else
				res.send(  {count: count}  );		
		});
};


module.exports = CRUD;