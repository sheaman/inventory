'use strict'

var express = require('express');

var router = express.Router();

//INVENTORY OPTIONS

var inventoryGet = require('./inventory-get');
var inventoryPost = require('./inventory-post');
var inventoryDelete = require('./inventory-delete');
var inventoryPut = require('./inventory-put');

/*
GET
/inventory/
/inventory/:partid/
/inventory/:searchTerm
*/

router.get('/', inventoryGet);

/*
POST
/inventory/
*/

router.get('/', inventoryPost);

/*
PUT
/inventory/:partid
*/

router.get('/', inventoryPut);

/*
DELETE
/inventory/:partid
*/

router.get('/', inventoryDelete);
