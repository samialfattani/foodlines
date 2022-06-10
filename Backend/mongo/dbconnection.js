
/* jshint esversion:6 */


const mongojs = require('mongojs');

//const db = mongojs('192.168.1.108:27017/testdb', ['users']);
const db = mongojs('mongodb://sami:123456@ds213688.mlab.com:13688/samidb', []);

db.on('error', function (err) {
	console.log('database error', err);
});

db.on('connect', function () {
	console.log('database connected !!');
});

module.exports = db;

