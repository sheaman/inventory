var mongoose = require('mongoose');
var redis = require('redis');

function initMongoDB() {

  var connectionString = process.env.MONGO_DATABASE_CONNECTION_STRING || "mongodb://localhost/inventory";
  var mongoDbConfig = {server: { poolSize: 50 }};
  return new Promise(function(resolve, reject) {
    try {
      console.log('Mongo ConnectionString:', connectionString);

      mongoose.connect(connectionString, mongoDbConfig);
      mongoose.connection.once('open',
        function() {
          console.log('Mongo connected on:', connectionString);
          resolve();
        }
      );
      mongoose.connection.on('error',
       function(error) {
          console.log('Mongo error:', error);
          reject(error);
        }
      );
    } catch (error) {
        console.log('Top level Mongo error:', error);
      reject(error);
    }
  });
}

// var redisClient = {};

// function initCache() {
//   // todo add redis username/password for more security
//   var connectionString = process.env.REDIS_CONNECTION_STRING || 'redis://localhost:6379';

//   return new Promise(function(resolve, reject) {
//     try {
//       redisClient = Redis.createClient(connectionString);

//       redisClient.once('ready', function() {
//         console.log('Redis connected and ready to accept commands at', connectionString);
//         resolve();
//       });

//       redisClient.on('error', function(error) {
//         console.log('Redis error', error);
//         reject(error);
//       });
//     } catch (error) {
//         console.log('Redis error connecting', error);
//       reject(error);
//     }
//   });
// }

var redisClient = redis.createClient(process.env.REDIS_PORT,process.env.REDIS_HOST);

redisClient.on('connect', function() {
    console.log('REDIS CONNECTED');
});

module.exports.redisClient = redisClient;
module.exports.initMongoDB = initMongoDB;
