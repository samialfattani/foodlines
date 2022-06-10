
/* jshint esversion:6 */
const express = require('express');
const router = express.Router();

mockErr = {
	"name": "MongoError",
	"message": "E11000 duplicate key error index: samidb.customers.$name_1 dup key: { : \"ss\" }",
	"driver": true,
	"index": 0,
	"code": 11000,
	"errmsg": "E11000 duplicate key error index: samidb.customers.$name_1 dup key: { : \"ss\" }"
}

// READ ------ GET /api/test
router.get('/', (req, res, next) =>
{	
	//res.status(422);
	next(mockErr);
});

module.exports = router;