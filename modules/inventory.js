'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var logger = require('../common/logger.js')(module);

var app = express();

app.disable('x-powered-by');

var Inventory = require('../model/inventory');

var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol ? 'symbol' : typeof obj; };

var handleErrorForResponse = function handleErrorForResponse(errorCode, res, action) {
  return function (err) {
    res.status(errorCode).send(err);
  };
};

/* Get Handler */
function getInventoryHandler(req, res) {
    var findItem;
    var itemIdentifier;

    if (req.query.id) {
        findItem = Inventory.getInventoryItemById;
        itemIdentifier = req.query.id;
    } else if (req.params.id) {
        findItem = Inventory.getInventoryItemById;
        itemIdentifier = req.params.id;        
    } else if (req.query.sku) {
        findItem = Inventory.getInventoryItemBySku;
        itemIdentifier = req.query.sku;
     } else if (req.query.q) {
        findItem = Inventory.getInventoryItemBySearch;
        itemIdentifier = req.query.q;
    } else if (req.query.list) {
        findItem = Inventory.getInventoryItemsList;
        itemIdentifier = '';
    } else if (req.query.category) {
        findItem = Inventory.getInventoryItemByAttribute;
        itemIdentifier = { itemCategory: req.query.category };
    } else if (req.query.type) {
        findItem = Inventory.getInventoryItemByAttribute;
        itemIdentifier = { itemType: req.query.type };
    } else {
    //     return res.status(400).send(
    //     { message: 'You need to specify an id or sku as a query param.' }
    //   );
        findItem = Inventory.getInventoryItemsList;
        itemIdentifier = '';    
    }

    return findItem(itemIdentifier)
    .then(function(foundItem) {
        if (foundItem instanceof Array) {
            if (foundItem.length === 0) {
            res.status(400).json({ message: 'item not found' });
            } else if (foundItem.length === 1) {
            res.status(200).json(foundItem[0]);
            } else {
            res.status(200).json(foundItem);
            }
        }

    })
    .catch(handleErrorForResponse(500, res, 'findItem'));

};

/* Post handler */

function postInventoryHandler(req, res) {

    var inventoryData = req.body;
    return Inventory.checkExistingItemBySku(inventoryData)
    .then(function(existingItem) {
        logger.info(existingItem);
        if (existingItem instanceof Array) {
            if (existingItem.length > 0) {
            res.status(400).json({ message: 'item already exists' });
            } else {
                logger.info(inventoryData);
            Inventory.addInventoryItem(inventoryData)
            .then(function(addResponse) {
                logger.info(addResponse);
                if (addResponse instanceof Object && addResponse.sku) {
                    if (addResponse.sku === inventoryData.sku) {
                    res.status(200).json(addResponse);
                    } else {
                    res.status(400).json({ message: 'item was not added' });
                    }
                }
            })
            .catch(handleErrorForResponse(500, res, 'addItem'));
            }
        }
    })
    .catch(handleErrorForResponse(500, res, 'checkItem'));
}

/* Put Handler */

function putInventoryHandler(req, res) {

    var inventoryData = req.body;
    return Inventory.checkExistingItemBySku(inventoryData)
    .then(function(existingItem) {
        if (existingItem instanceof Array) {
            if (existingItem.length > 0 && existingItem[0].sku === inventoryData.sku && existingItem[0]._id.toString() !== inventoryData._id) {
                res.status(400).json({ message: 'Item sku already exists' });
            } else {
                Inventory.updateInventoryItem(inventoryData)
                .then(function(updateResponse) {
                    if (updateResponse instanceof Object && updateResponse.ok) {
                        res.status(200).json(inventoryData);
                    } else {
                        res.status(400).json({ message: 'Item was not updated' });
                    }

                })
                .catch(handleErrorForResponse(503, res, 'updateItem'));
                }
        }
    })
    .catch(handleErrorForResponse(500, res, 'checkItem'));
}

function removeInventoryHandler(req, res) {

    var inventoryData = req.params;
    return Inventory.removeInventoryItem(inventoryData)
    .then(function(removeResponse) {

        res.status(200).json({message: 'OK'});

    })
    .catch(handleErrorForResponse(500, res, 'removeItem'));
}

module.exports.getInventoryHandler = getInventoryHandler;
module.exports.postInventoryHandler = postInventoryHandler;
module.exports.putInventoryHandler = putInventoryHandler;
module.exports.removeInventoryHandler = removeInventoryHandler;
