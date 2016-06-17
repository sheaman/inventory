'use strict'

var express = require('express');
var app = express();
var jwt = require('express-jwt');

var jwtCheck = jwt({
  secret: new Buffer('rIGWxg3bz820gW0UkYMr6H13VVLKiFDWqrA2Sz5KKuKcEbKln8ZqniKGPC96wSEu', 'base64'),
  audience: 'DPBBn3j0ZZV3Qw7ZWCirH72lw9qpPyGt'
});

// add necessary middleware (security, data parsing etc)

// get main routes
var admin = require('./routes/admin/');

app.use('/admin', jwtCheck , admin);

app.use('/', function(req, res) {
    res.json({'message' : 'Admin OK'});
})

app.use('/status', function(req, res) {
    res.json({'message' : 'Admin OK'});
})

app.listen(3000);

module.exports = app;