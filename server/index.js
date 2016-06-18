'use strict'

var express = require('express');
var app = express();
var jwt = require('express-jwt');
var helmet = require('helmet');

var dbContext = require('../model/dbContext');

// add necessary middleware (security, data parsing etc)

app.disable('x-powered-by');
app.use(helmet())

var jwtCheck = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID,
  credentialsRequired: false,
  fail: function (req, res) {
      console.log(req);
      if (!req.headers.authorization){
        res.send(401, 'missing authorization header');
      }
      res.send(401);
    }
});

// get main routes
var admin = require('./routes/admin/');
var inventory = require('./test');
var cache = require('../modules/cache');

app.use('/admin', admin);

app.use('/inventory', cache, inventory);

app.use('/status', function(req, res) {
    res.json({'message' : 'OK'});
})

Promise.all([
  dbContext.initMongoDB()
]).then(function() {
  var listener = app.listen(process.env.EXPRESS_PORT || 3000);
  console.log('Listening now')
}).catch(function(err) {
    console.log('Server Error', err);
  process.exit(1);
});

module.exports = app;