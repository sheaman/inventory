'use strict'

var express = require('express');

var router = express.Router();

router.use('/', function(req, res) {
    res.json({'message' : 'Inventory get'});
});

module.exports = router;