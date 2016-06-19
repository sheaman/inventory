'use strict'

var InventoryModel = require('../model/inventoryModel.js');

function seedInventory() {

    var item1 = new InventoryModel ({
    itemName: 'Acme 5-in-1 Blender/Juicer',
    itemType: 'Blender',
    itemCategory: 'Kitchenware',
    itemCompany: 'ACME',
    itemShortDescription: 'World Famous Blender from ACME Corp',
    itemLongDescription: 'This blender comes with 5 speeds and makes great smoothies',
    sku: 'acme-blender',
    isActive: true,
    keywords: 'kitchen, hardware, smoothies, juice'
    });
    item1.save(function (err) {if (err) console.log ('Error on save!')});

    var item2 = new InventoryModel ({
    itemName: 'Luxe All-Purpose Sectional Sofa and Cooler',    
    itemType: 'Sofa',
    itemCategory: 'Furniture',
    itemCompany: 'Luxe',
    itemShortDescription: 'Suede section couch with built-in cooler',
    itemLongDescription: 'This couch can be positioned in any way for your best comfort.  It includes a built-in cooler, so you can stay cool while watching a Monster Truck rally.',
    sku: 'luxe-sofa-w-cooler',
    isActive: true,
    keywords: 'sofa, couch, sectional, furniture, cooler'
    });
    item2.save(function (err) {if (err) console.log ('Error on save!')});

    var item3 = new InventoryModel ({
    itemName: 'mcToasty 4 Bagel Toaster',        
    itemType: 'Toaster',
    itemCategory: 'Kitchenware',
    itemCompany: 'mcToasty',
    itemShortDescription: 'Stainless steel 4 Bagel Toaster with cream cheese applicator',
    itemLongDescription: 'With this cutting edge 4 slice bagel toaster you can also automatically apply your cream cheese.',
    sku: 'mctoasty-4-bagel-plus-cc',
    isActive: true,
    keywords: 'toaster, bagel, cream cheese'
    });
    item3.save(function (err) {if (err) console.log ('Error on save!')});

}

function clearInventory() {

	InventoryModel.remove({}, function(err) {
		if (err) {
		console.log('clear error', err);
		}
	});

}


module.exports.seedInventory = seedInventory;
module.exports.clearInventory = clearInventory;