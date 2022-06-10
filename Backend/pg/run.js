db = require('./models/index');

module.exports = 
{

	resetDB(req, res, next) 
	{
		res.send('Database is reset!');
	},

	fakeData(req, res, next) 
	{
		res.send('Fake data  is created!');
	},

	runSQL(req, res, next)
	{
		SQL = req.body.query;
		db.sequelize.query( SQL ).spread( (results, metadata) => 
		{
			//console.log(metadata);
			//console.log(results);
			res.send( metadata );
		}).catch(err =>{
			next(err);
		});	
	},

	runFinder(req, res, next)
	{
		let Model = db[req.body.model];
		let finder = req.body.finder;

		// try {
		// 	JSON.parse( finder );
		// 	//convert model into real modle
			
		// }catch (e) {
		// 	res.send({errmsg: "not JSON", err: e});
		// 	return;
		// }
		convert(finder);
		Model.findAll(finder)
		.then( result => res.send(result) )
		.catch( err => next(err) );
	},
	
};

function convert(options)
{
	Object.keys(options).map (f => {

		if( options[f] instanceof Object)
			convert(options[f]);

		if( f == 'model' )
			options[f] = db[ options[f] ]; //model: 'customer' ==> model: db['customer']
		
	});
}
