'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  OrderItem.init({
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    costPerUnit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};
