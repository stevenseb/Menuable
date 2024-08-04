'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    
    static associate(models) {
      Item.hasOne(models.ItemImage, {foreignKey: 'itemId'});
      Item.belongsToMany(models.Order, { through: 'OrderItems', foreignKey: 'itemId' });
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    onMenu: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL(10,1),
      allowNull: false,
    },
    measure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numRatings: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    avgStars: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    quantityOnHand: {
      type: DataTypes.DECIMAL(10,1),
      allowNull: false,
    },
    costPerUnit: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'Items',
  });
  return Item;
};