/* jshint esversion:6 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 

const apiRouter = require('./pg/api-router');
const testRouter = require('./router-test');

const path = require('path');
const morgan = require('morgan');


//------ Specify Frontend folder ------------

let p = path.join(__dirname, path.normalize('../dist') );
app.use( express.static( p ) );

//--------- MIDDLEWARE ----------

app.use(bodyParser.json()); //parsing middleware
app.use(bodyParser.urlencoded( {extended: true} ) ); //parsing middleware

//allow acees from other servers.
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// use combined preset, see https://github.com/expressjs/morgan#combined
//app.use(morgan('combined'));

app.use('/api', apiRouter);

//Err handler middleware
app.use((err, req, res, next) => { 
	res.status(422);
	res.send(err);
	console.log('---------------\n', err);
	//next();
}); 

let db = require('./pg/models/index');

console.log('wating via Sequelize...');
db.sequelize.authenticate()
  .then(() => {
		console.log('Connection has been established successfully !');
		
		//reset Database with Mock Data
		if(process.argv[2] == 'resetdb')
			require('./pg/mock-data')();
	})
  .catch(err => {
    console.error('Unable to connect to the database:', err);
 });


//========================================
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

app.set('port', process.env.PORT || 3200);

app.listen(app.get('port'), () => {
  console.log("Magic happens on port", app.get('port'));
});

app.get('/api', (req, res) => {
	res.send('Hellow World!!\n');
});
