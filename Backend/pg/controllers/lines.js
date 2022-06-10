
const db = require('../models/');
const CRUD = require('./CRUD');

module.exports = 
{
  // --- api/users/:usname/visits/:id/lines
	index(req, res, next) 
	{
		let q = {
			where: { visit_id : req.params.id },
			include: { model: db.item, attributes: ['desc', 'unit_price'] }
		};
		CRUD.findAll(db.line, q, req, res, next);
  },

  //Create a new item using model.create()
	insert(req, res, next) 
	{
		let doc = req.body;
		CRUD.insert(db.line, doc, req, res, next);
  },

  //Edit an existing item details using model.update()
  update(req, res, next) {
		let qry = {
			where: {
				visit_id: req.params.id, 
				barcode: req.params.barcode} 
		};
		let doc = req.body;
		CRUD.update(db.line, req.body, qry, req, res, next);
  },

  //Edit an existing item details using model.upsert()
  upsert(req, res, next) {
		let qry = {
			where: {
				visit_id: req.params.id, 
				barcode: req.params.barcode} 
		};
		let doc = req.body;
		CRUD.upsert(db.line, req.body, qry, req, res, next);
  },

	//Delete an existing item by the unique ID using model.destroy()
  delete(req, res, next) {
		let qry = {
			where: {
				visit_id: req.params.id, 
				barcode: req.params.barcode} 
		};
		CRUD.delete(db.line, qry, req, res, next);
	},


};