
/* jshint esversion:6 */
const express = require('express');
const router = express.Router();

const db = require('./models/');
const run = require('./run');

/** this file is to SETUP the whole database including:
 * 1. define indexes.
 * 2. define constraints
 * 3. define functions
 * and any other work need to be done to setup the database.
 * this should be called only once in your App life.
 * 
 * GET	/api/setupdb
**/
let result = [];	

// READ ------ GET /api/run/*
router.get('/run/reset-db', run.resetDB);
router.get('/run/fakedata', run.fakeData);
router.post('/run/sql', run.runSQL );
router.post('/run/finder', run.runFinder );

// ------- ITEMS ------------

// --- /api/items/*
const items = require('./controllers/items');
router.get('/items/', items.index );
router.get('/items/:barcode', items.show );
router.post('/items/', items.insert );
router.put('/items/:barcode', items.update );
router.delete('/items/:barcode', items.delete );
router.get('/items/category/:category', items.showByCategory );
router.get('/items/qry/count', items.count );

// ------- USERS ------------

// --- /api/items/*
const users = require('./controllers/users');
router.get('/users/', users.index );
router.get('/users/:usname', users.show );
router.post('/users/', users.insert );
router.put('/users/:usname', users.update );
router.delete('/users/:usname', users.delete );
router.get('/users/qry/count', users.count );
router.get('/users/qry/email/:email', users.showByEmail );
router.post('/users/qry/login', users.login );

// ------- CATEGORIES ------------

// --- /api/categories/*
const categories = require('./controllers/categories');
router.get('/categories/', categories.index );
router.get('/categories/type/:type', categories.showByType );
router.post('/categories/', categories.insert );
router.delete('/categories/:id', categories.delete );
router.get('/categories/qry/count', categories.count );


// ------- CUSTOMERS`	 ------------

// --- /api/customers/*
const customers = require('./controllers/customers');
router.get('/customers/', customers.index );
router.get('/customers/:id', customers.show );
router.post('/customers/', customers.insert );
router.put('/customers/:id', customers.update );
router.delete('/customers/:id', customers.delete );
router.get('/customers/qry/count', customers.count );

// --- /api/users/:usname/visits/*
const visits = require('./controllers/visits');
router.get('/users/:usname/visits/', visits.index );
router.get('/users/:usname/visits/:id', visits.show );
router.post('/users/:usname/visits/', visits.insert );
router.put('/users/:usname/visits/:id', visits.update );
router.delete('/users/:usname/visits/:id', visits.delete );
router.get('/users/:usname/visits/qry/count', visits.count );
router.get('/users/:usname/visits/qry/bydate/:date', visits.showByDate );

// --- /api/users/:usname/visits/:id/lines/*
const lines = require('./controllers/lines');
router.get('/users/:usname/visits/:id/lines', lines.index );
router.post('/users/:usname/visits/:id/lines/', lines.insert );
router.put('/users/:usname/visits/:id/lines/:barcode', lines.update );
router.patch('/users/:usname/visits/:id/lines/:barcode', lines.upsert );
router.delete('/users/:usname/visits/:id/lines/:barcode', lines.delete );


// --- /api/users/:usname/visits/:id/moves/*
const moves = require('./controllers/moves');
router.get('/users/:usname/visits/:id/moves', moves.index );
router.post('/users/:usname/visits/:id/moves', moves.insert );
router.put('/users/:usname/visits/:id/moves/:mid', moves.update );
router.delete('/users/:usname/visits/:id/moves/:mid', moves.delete );
router.get('/users/:usname/visits/:id/moves/qry/count', moves.count );
router.get('/users/:usname/visits/:id/moves/qry/bybarcode/:barcode', moves.showByBarcode );

module.exports = router;