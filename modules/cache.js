'use strict'

var express = require('express');

var logger = require('../common/logger.js')(module);

var redis = require('redis');
var cache = require('../model/dbContext').redisClient;

var app = express();

app.disable('x-powered-by');

app.use('/', function(req, res, next) {
    var pageCache;

    logger.info(req.query);

    var cacheKey = 'cache:inventory';
    for (var key in req.query) {
        cacheKey += ':' + req.query[key];
    }

    logger.info('cache get', cacheKey)

    if (req.query.id || req.query.q || req.query.sku) {

        pageCache = cache.get(cacheKey, function(err, reply) {
            if (err) {
                logger.error(err)
            } else {
                if (typeof reply === 'string' && reply.length > 0) {
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
