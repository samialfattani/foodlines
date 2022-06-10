const db = require('../models/');
const CRUD = require('./CRUD');

module.exports = 
{
  //Get a list of all customers using model.findAll()
	index(req, res, next) 
	{
		let q = `Select * from customers`;
		CRUD.select(q, req, res, next);
  },

  //Get an item by the unique ID using model.findById()
	show(req, res, next) 
	{
		let q = `Select * from customers 
		WHERE id = ${req.params.id} `;
		CRUD.selectOne(q, req, res, next);
  },

  //Create a new item using model.create()
	insert(req, res, next) 
	{
		let doc = req.body;
		CRUD.insert(db.customer, doc, req, res, next);
  },

  //Edit an existing item details using model.update()
  update(req, res, next) {
		let qry = {where: {id: req.params.id} };
		let doc = req.body;
		delete doc.id;
		CRUD.update(db.customer, req.body, qry, req, res, next);
  },

  //Delete an existing item by the unique ID using model.destroy()
  delete(req, res, next) {
		let qry = {where: {id: req.params.id} };
		CRUD.delete(db.customer, qry, req, res, next);
	},

	//------------------------------
	count(req, res, next) 
	{
		let q = `Select count(*) count from customers`;
		CRUD.selectOne(q, req, res, next);
  },

};