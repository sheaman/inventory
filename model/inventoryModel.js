var mongoose = require('mongoose');

var InventorySchema = mongoose.Schema(
  {
    itemCompany: {
    type: String,
    trim: true
    },
    itemType: {
      type: String,
      trim: true
    },
    itemCategory: {
      type: String,
      trim: true
    },
    itemName: {
      type: String,
      trim: true
    },itemShortDescription: {
      type: String,
      trim: true
    },
    itemLongDescription: {
      type: String,
      trim: true
    },
    keywords: {
      type: String,
      trim: true
    },
    sku: {
      type: String,
      required: [true, 'sku is required'],
      trim: true,
      unique: true
    },
    isActive: { type: Boolean, default: true },
    modifiedDate: {
      type: Date,
      default: new Date()
    }
  },
    { collection: process.env.MONGO_TESTING_INVENTORY_COLLECTION || 'Inventory' }
  );

module.exports = mongoose.model('Inventory', InventorySchema);
