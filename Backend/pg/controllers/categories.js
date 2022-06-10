const db = require('../models/');
const CRUD = require('./CRUD');

module.exports = 
{
  //Get a list of all categories using model.findAll()
	index(req, res, next) 
	{
		let q = `Select * from categories`;
		CRUD.select(q, req, res, next);
  },

  //Get an item by the unique ID using model.findById()
	showByType(req, res, next) 
	{
		let q = `Select * from categories 
		WHERE lower(type) = lower('${req.params.type}') `;
		CRUD.select(q, req, res, next);
  },

  //Create a new item using model.create()
	insert(req, res, next) 
	{
		let doc = req.body;
		CRUD.insert(db.category, doc, req, res, next);
  },

  //Delete an existing item by the unique ID using model.destroy()
  delete(req, res, next) {
		let qry = {where: {id: req.params.id} };
		CRUD.delete(db.category, qry, req, res, next);
	},

		
	//------------------------------
	count(req, res, next) 
	{
		let q = `Select count(*) count from categories`;
		CRUD.selectOne(q, req, res, next);
  },

	
};