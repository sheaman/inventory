'use strict'

var express = require('express');

var router = express.Router();

router.use('/', function(req, res) {
    res.json({'message' : 'Inventory delete'});
});

module.exports = router;