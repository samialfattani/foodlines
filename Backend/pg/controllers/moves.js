
const db = require('../models/');
const CRUD = require('./CRUD');

module.exports = 
{
  // --- api/users/:usname/visits/:id/moves
	index(req, res, next) 
	{
		let q = {
			where: { visit_id : req.params.id },
			//include: { model: db.item, attributes: ['desc', 'unit_price'] }
		};
		CRUD.findAll(db.move, q, req, res, next);
	},
	
	showByBarcode(req, res, next) 
	{
		let q = {
			where: { 
				visit_id : req.params.id,
			  barcode : req.params.barcode,},
		};
		CRUD.findAll(db.move, q, req, res, next);
	},


  //Create a new item using model.create()
	insert(req, res, next) 
	{
		let doc = req.body;
		CRUD.insert(db.move, doc, req, res, next);
  },

  //Edit an existing item details using model.update()
  update(req, res, next) {
		let qry = {where: {id: req.params.mid} };
		let doc = req.body;
		CRUD.update(db.move, req.body, qry, req, res, next);
  },

  //Delete an existing item by the unique ID using model.destroy()
  delete(req, res, next) {
		let qry = {where: {id: req.params.mid} };
		CRUD.delete(db.move, qry, req, res, next);
	},

	//------------------------------
	count(req, res, next) 
	{
		let q = `Select count(*) count FROM moves WHERE visit_id = ${req.params.id}`;
		CRUD.selectOne(q, req, res, next);
	},

};