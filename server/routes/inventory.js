var express = require('express');
var jwt = require('express-jwt');

var router = express.Router();
var bodyParser = require('body-parser');

var getInventoryHandler = require('../../modules/inventory').getInventoryHandler;
var postInventoryHandler = require('../../modules/inventory').postInventoryHandler;
var putInventoryHandler = require('../../modules/inventory').putInventoryHandler;
var removeInventoryHandler = require('../../modules/inventory').removeInventoryHandler;

var jsonParser = bodyParser.json();

// todo: implement Auth0
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

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.get('/', getInventoryHandler);
router.get('/:id', getInventoryHandler);
router.post('/', jwtCheck, postInventoryHandler);
router.put('/:id', jwtCheck, putInventoryHandler);
router.delete('/:id', jwtCheck, removeInventoryHandler);

//router.get('/', getInventoryHandler);

module.exports = router;
