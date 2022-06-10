const db = require('../models/');
const CRUD = require('./CRUD');

module.exports = 
{
  //Get a list of all users using model.findAll()
	index(req, res, next) 
	{
		let q = `Select * from users`;
		CRUD.select(q, req, res, next);
  },

  //Get an item by the unique ID using model.findById()
	show(req, res, next) 
	{
		let q = `Select * from users 
		WHERE lower(name) = lower('${req.params.usname}') `;
		CRUD.selectOne(q, req, res, next);
  },

  //Create a new item using model.create()
	insert(req, res, next) 
	{
		let doc = req.body;
		CRUD.insert(db.user, doc, req, res, next);
  },

  //Edit an existing item details using model.update()
  update(req, res, next) {
		let qry = {where: {name: req.params.usname} };
		let doc = req.body;
		CRUD.update(db.user, req.body, qry, req, res, next);
  },

  //Delete an existing item by the unique ID using model.destroy()
  delete(req, res, next) {
		let qry = {where: {name: req.params.usname} };
		CRUD.delete(db.user, qry, req, res, next);
	},

	//------------------------------
	showByEmail(req, res, next) 
	{
		let q = `
		Select * from users 
		WHERE lower(Email) = lower('${req.params.email}')`;
		CRUD.selectOne(q, req, res, next);
  },
	
	//------------------------------
	count(req, res, next) 
	{
		let q = `Select count(*) count from users`;
		CRUD.selectOne(q, req, res, next);
  },

	login(req, res, next) 
	{
		let SQL = `Select * from users 
		WHERE lower(name) = lower('${req.body.name}') `;

		db.sequelize.query( SQL )
		.spread( (results, metadata) => 
		{
			if(metadata.rowCount == 0 ){
				res.status(404); //Not Found
				res.json({
					"errmsg": 'user name is not registered',
				}) ;				
			}else{
				let usr = results[0];
				if(usr.name.toLowerCase() == req.body.name.toLowerCase() && usr.pw == req.body.pw){
					res.status(201); //201:Accepted
					res.send(usr);
				}else{
					res.status(401); //Unauthorized
					res.json( {
						"errmsg": 'Wrong Password'
					});}}
		})
		.catch(err => next(err) );
			

	},
};