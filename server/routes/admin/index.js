'use strict'

var express = require('express');

//var app = express();
var router = express.Router();

var tester = require('./test');

router.get('/', function(req, res) {
    res.status(200).send('Admin OK');
})

router.get('/sayHi', function(req, res) {
    var response = {
        message: tester.sayHi()
    }
    res.json(response);
})

router.get('/sayHi/:name', function(req, res) {
    var response = {
        message: tester.sayHi(req.params.name)
    }
    res.json(response);
})

router.get('/sayGoodbye/:name', function(req, res) {
    var response = {
        message: tester.sayGoodbye(req.params.name)
    }
    console.log(tester.sayGoodbye(req.params.name));

    res.json(response);
})

module.exports = router;