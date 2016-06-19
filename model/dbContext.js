var mongoose = require('mongoose');
var redis = require('redis');

var logger = require('../common/logger.js')(module);

function initMongoDB() {

  var connectionString = process.env.MONGO_DATABASE_CONNECTION_STRING || 'mongodb://localhost/inventory';
  var mongoDbConfig = {server: { poolSize: 50 }};
  return new Promise(function(resolve, reject) {
    try {
      logger.info('Mongo ConnectionString:', connectionString);

      mongoose.connect(connectionString, mongoDbConfig);
      mongoose.connection.once('open',
        function() {
          logger.info('Mongo connected on:', connectionString);
          resolve();
        }
      );
      mongoose.connection.on('error',
       function(error) {
          logger.info('Mongo error:', error);
          reject(error);
        }
      );
    } catch (error) {
        logger.info('Top level Mongo error:', error);
      reject(error);
    }
  });
}

var redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

redisClient.on('connect', function() {
    console.log('REDIS CONNECTED');
});

module.exports.redisClient = redisClient;
module.exports.initMongoDB = initMongoDB;
