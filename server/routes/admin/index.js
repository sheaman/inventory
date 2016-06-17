'use strict'

var express = require('express');

//var app = express();
var router = express.Router();

var inventory = require('./inventory');

router.use('/inventory', inventory);

router.get('/', function(req, res) {
    res.status(200).send('Admin OK');
})

module.exports = router;