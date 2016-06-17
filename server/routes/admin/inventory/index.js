'use strict'

var express = require('express');

//var app = express();
var router = express.Router();

var invGet = require('./inventory-get');
var invPost = require('./inventory-post');
var invPut = require('./inventory-put');
var invDelete = require('./inventory-delete');

router.get('/', invGet);

router.post('/', invPost);

router.put('/', invPut);

router.delete('/', invDelete);

/*
GET
/inventory/
/inventory/:partid/
/inventory/:searchTerm
*/

//router.get('/', inventoryGet);

/*
POST
/inventory/
*/

//router.get('/', inventoryPost);

/*
PUT
/inventory/:partid
*/

//router.get('/', inventoryPut);

/*
DELETE
/inventory/:partid
*/


router.get('/', function(req, res) {
    res.status(200).send('Admin - Inventory OK');
})

module.exports = router;