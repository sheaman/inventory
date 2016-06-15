'use strict'

var express = require('express');

var router = express.Router();

//require necessary modules to handle features here.

router.get('/', function(req, res) {
	console.log('main route');
	res.send('Main Route');
});

/*
GET
/inventory/
/inventory/:partid/
/inventory/:searchTerm

*/

/*
POST
/inventory/

*/

/*
PUT
/inventory/:partid

*/

/*
DELETE
/inventory/:partid

*/

