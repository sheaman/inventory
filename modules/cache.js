'use strict'

var express = require('express');
//var cache = require('../model/dbContext').cacheClient;

var redis = require('redis');
var cache = require('../model/dbContext').redisClient;

var app = express();

app.disable('x-powered-by');

app.use('/', function(req, res, next) {
    var pageCache;

    console.log(req.query);

    var cacheKey = 'cache:inventory';
    for(var key in req.query) {
        cacheKey+= ':' + req.query[key];
    }
    console.log('cache 1 get', cacheKey)

    if(req.query.id || req.query.q || req.query.sku) {
        console.log('Trying',cache.get(cacheKey));

        pageCache = cache.get(cacheKey, function(err, reply) {
            if(err) {
                console.log(err)
            } else {
                if(typeof reply === 'string' && reply.length > 0) {
                    res.setHeader('X-CACHE', 'HIT');
                    res.json(JSON.parse(reply));
                } else {
                res.setHeader('X-CACHE', 'MISS');
                next();
                }
            }
        });

    } else {
        next();
    }

});

module.exports = app;