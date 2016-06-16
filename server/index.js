'use strict'

var express = require('express');

var app = express();

// add necessary middleware (security, data parsing etc)

// get main routes
var admin = require('./routes/admin/');

app.use('/admin', admin);

app.use('/', function(req, res) {
    res.json({'message' : 'Admin OK'});
})

app.use('/status', function(req, res) {
    res.json({'message' : 'Admin OK'});
})

app.listen(3000);

module.exports = app;