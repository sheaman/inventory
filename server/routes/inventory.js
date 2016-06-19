var express = require('express');

var router = express.Router();
var bodyParser = require('body-parser');

var getInventoryHandler = require('../../modules/inventory').getInventoryHandler;
var postInventoryHandler = require('../../modules/inventory').postInventoryHandler;
var putInventoryHandler = require('../../modules/inventory').putInventoryHandler;

var jsonParser = bodyParser.json();

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/', getInventoryHandler);
router.get('/:id', getInventoryHandler);
router.post('/', postInventoryHandler);
router.put('/:id', putInventoryHandler);

//router.get('/', getInventoryHandler);

module.exports = router;
