'use strict'

var express = require('express');

var app = express();

// add necessary middleware (security, data parsing etc)

// get main routes
var admin = require('./routes/admin/');

app.use('/admin', admin);