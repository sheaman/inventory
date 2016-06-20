'use strict'

var express = require('express');
var jwt = require('express-jwt');
var helmet = require('helmet');

var logger = require('../common/logger.js')(module);

var app = express();

var dbContext = require('../model/dbContext');


//disable x-powered-by 
app.disable('x-powered-by');

//add basic helmet protections
app.use(helmet())

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
  next();
});

// add Auth0 credentials and handler middleware
var jwtCheck = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID,
  credentialsRequired: true,
  fail: function (req, res) {
      logger.error(req);
      if (!req.headers.authorization){
        res.send(401, 'missing authorization header');
      }
      res.send(401);
    }
});

// load routes
var admin = require('./routes/admin/');
var inventory = require('./routes/inventory');
var dev = require('./test');

// load redis cache module
var cache = require('../modules/cache');

// handle top level routes

app.use('/status', function(req, res) {
    res.json({'message' : 'OK'});
});

//app.use('/admin', admin);

app.use('/inventory', cache, inventory);
app.use('/dev', dev);


// init Mongo and run server
Promise.all([
  dbContext.initMongoDB()
]).then(function() {
  var listener = app.listen(process.env.EXPRESS_PORT || 3000);
  logger.info('Listening now')
}).catch(function(err) {
    logger.error('Server Error', err);
  process.exit(1);
});

module.exports = app;
