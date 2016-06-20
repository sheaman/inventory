'use strict'

var InventoryModel = require('../model/inventoryModel');
var dbContext = require('../model/dbContext');
var cache = require('../model/dbContext').redisClient;

var logger = require('../common/logger.js')(module);

//private functions
var getInventoryItem = function(searchParams) {
    return InventoryModel.find(searchParams, function(err, items) {
      logger.info('search params here', searchParams);
        if (err) {
          logger.error(err);
        } else {
          var cacheKey = 'cache:inventory';
          for (var key in searchParams) {
            cacheKey += ':' + searchParams[key];
          }

          logger.info('cache set', cacheKey);
          logger.info('caching this...', items.toString());
          cache.setex(cacheKey, 300, JSON.stringify(items));
          return items;
        }
    });
};

var getInventoryItemByTerm = function(searchTerm) {
  var re = new RegExp(searchTerm, 'i');

  // jscs:disable disallowQuotedKeysInObjects
  return InventoryModel.find().or([{ 'itemName': { $regex: re }}, { 'keywords': { $regex: re }}, { 'itemCategory': { $regex: re }}, { 'itemShortDescription': { $regex: re }}]).sort('itemName').exec(function(err, items) {
      if (err) {
        logger.error(err);
      } else {
          return items;
      }
  });
};

var getInventoryItemByAttribute = function(searchParams) {
  if (!searchParams) {
  return new Promise((resolve, reject) => reject('No item found'));
  }

  return getInventoryItem(searchParams);
}

//public functions
var getInventoryItemById = function(id) {
  if (!id) {
    return new Promise((resolve, reject) => reject('No id provided'));
  }

  var searchParameters = { _id: id };
  return getInventoryItemByAttribute(searchParameters);
}

var getInventoryItemBySku = function(sku) {
  if (!sku) {
    return new Promise((resolve, reject) => reject('No sku provided'));
  }

  var searchParameters = { sku: sku };
  return getInventoryItemByAttribute(searchParameters);
}

var getInventoryItemBySearch = function(q) {
  if (!q) {
    return new Promise((resolve, reject) => reject('No search term provided'));
  }

  return getInventoryItemByTerm(q);
}

var getInventoryItemsByPage = function(page, num, offset) {
  var page = page || 1;
  var num = num || 1;
  var offset = offset || 15;

  var searchParameters = { sku: true };
  return getInventoryItemByAttribute(searchParameters);

}

var getInventoryItemsList = function() {
  var searchParameters = {};
  return getInventoryItemByAttribute(searchParameters);

}

var checkExistingItemBySku = function(data) {

  data.sku = data.sku || '';
  return new Promise(function(resolve, reject) {
    InventoryModel.find({ sku: data.sku }, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }

    });
  });

}

var checkExistingItemById = function(data) {

  data._id = data._id || '';
  logger.info(data._id);

  return new Promise(function(resolve, reject) {
    InventoryModel.find({ _id: data._id }, function(err, data) {
      if (err) {
        reject(err);
      } else {
        logger.info('by id data', data);
        resolve(data);
      }

    });
  });

}

var addInventoryItem = function(data) {
  var newItem = new InventoryModel(data);
  return new Promise(function(resolve, reject) {
    newItem.save(function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }

    });
  });

}

var updateInventoryItem = function(data) {
  return new Promise(function(resolve, reject) {
    InventoryModel.update({ _id: data._id}, data, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }

    });
  });

}

var removeInventoryItem = function(data) {
  return new Promise(function(resolve, reject) {
    InventoryModel.remove({ _id: data.id}, function(err, res) {
      if (err) {
        reject(err);
      } else {

        var cacheKey = 'cache:inventory:' + data.id;
        cache.expire(cacheKey, 1);
        var cacheKeyList = 'cache:inventory';
        cache.expire(cacheKeyList, 1);
        resolve(res);
      }

    });
  });

}

//export public functions
module.exports.getInventoryItemById = getInventoryItemById;
module.exports.getInventoryItemBySku = getInventoryItemBySku;
module.exports.getInventoryItemsList = getInventoryItemsList;
module.exports.getInventoryItemBySearch = getInventoryItemBySearch;
module.exports.getInventoryItemByAttribute = getInventoryItemByAttribute;
module.exports.checkExistingItemBySku = checkExistingItemBySku;
module.exports.checkExistingItemById = checkExistingItemById;
module.exports.addInventoryItem = addInventoryItem;
module.exports.removeInventoryItem = removeInventoryItem;
module.exports.updateInventoryItem = updateInventoryItem;
