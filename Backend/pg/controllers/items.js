const db = require('../models/');
const CRUD = require('./CRUD');

module.exports = 
{
  //Get a list of all items using model.findAll()
	index(req, res, next) 
	{
		let q = `Select * from items`;
		CRUD.select(q, req, res, next);
  },

  //Get an item by the unique ID using model.findById()
	show(req, res, next) 
	{
		let q = `Select * from items 
		WHERE barcode = '${req.params.barcode}' `;
		CRUD.selectOne(q, req, res, next);
  },

  //Create a new item using model.create()
	insert(req, res, next) 
	{
		let doc = req.body;
		CRUD.insert(db.item, doc, req, res, next);
  },

  //Edit an existing item details using model.update()
  update(req, res, next) {
		let qry = {where: {barcode: req.params.barcode} };
		let doc = req.body;
		CRUD.update(db.item, req.body, qry, req, res, next);
  },

  //Delete an existing item by the unique ID using model.destroy()
  delete(req, res, next) {
		let qry = {where: {barcode: req.params.barcode} };
		CRUD.delete(db.item, qry, req, res, next);
	},

	//------------------------------
	showByCategory(req, res, next) 
	{
		let q = `
		Select * from items 
		WHERE lower(category) = lower('${req.params.category}')`;
		CRUD.select(q, req, res, next);
  },
	
	//------------------------------
	count(req, res, next) 
	{
		let q = `Select count(*) count from items`;
		CRUD.selectOne(q, req, res, next);
  },
	
};