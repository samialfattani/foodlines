
const db = require('../models/');
const CRUD = require('./CRUD');

module.exports = 
{
  // --- api/users/:usname/visits/
	index(req, res, next) 
	{
		let q = {
			where: { user_name : req.params.usname },
			include: { model: db.customer, attributes: ['name'] },
			order: [['date', 'DESC']]
		};
		CRUD.findAll(db.visit, q, req, res, next);
  },

	//Get an item by the unique ID using model.findById()
	show(req, res, next) 
	{
		// let q = `Select * from visits 
		// WHERE id = ${req.params.id} `;
		let q = {
			where: { id : req.params.id },
			include: { model: db.customer, attributes: ['name', 'address'] }
		};
		CRUD.findOne(db.visit, q, req, res, next);
  },

  //Create a new item using model.create()
	insert(req, res, next) 
	{
		let doc = req.body;
		CRUD.insert(db.visit, doc, req, res, next);
  },

  //Edit an existing item details using model.update()
  update(req, res, next) {
		let qry = {where: {id: req.params.id} };
		let doc = req.body;
		CRUD.update(db.visit, req.body, qry, req, res, next);
  },

  //Delete an existing item by the unique ID using model.destroy()
  delete(req, res, next) {
		let qry = {where: {id: req.params.id} };
		CRUD.delete(db.visit, qry, req, res, next);
	},

	//------------------------------
	count(req, res, next) 
	{
		let q = `Select count(*) count from visits`;
		CRUD.selectOne(q, req, res, next);
	},
	
  // GET --- api/users/:usname/visits/qry/bydate/:date
	showByDate(req, res, next) 
	{
		if (req.params.date == '*'){
			res.redirect(`/api/users/${req.params.usname}/visits`);
			return;
		}
			
		let dt =  Date.parse(req.params.date) ;
		let q = {
			where: { 
				user_name : req.params.usname,
				date: dt
			 },
			include: { model: db.customer, attributes: ['name'] }
		};
		CRUD.findAll(db.visit, q, req, res, next);
  },

	

};