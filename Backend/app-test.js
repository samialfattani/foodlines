/* jshint esversion:6 */


let db = require('./pg/models/index');

console.log('wating via apSequelize...');
console.log( `MYAPIKEY: ${process.env.MYAPIKEY}` ); 

db.sequelize.authenticate()
  .then(() => {
		console.log('Connection has been established successfully !');
		
		//reset Database with Mock Data
		if(process.argv[2] == 'resetdb')
			return require('./pg/mock-data')();
	})
	.then( () => {return db.user.findAll(
		{
			where : {name: 'admian'},
			include: {
				model : db.visit,
				include: { model: db.customer, attributes:['name']}
			}
		}
	);})
	.then( res => {
		//console.log(users.map( u => u.dataValues)[0].visits.map( v => v.dataValues) );		
		console.log( res );
		console.log(
			res.map(r => r.get() ) 
				 
		);		
		
	})
	.catch(err => {
    console.error('Unable to connect to the database:', err);
	})
	.finally(() =>{
		db.sequelize.close();
		console.log('Connector closed !!!');
	}); 
