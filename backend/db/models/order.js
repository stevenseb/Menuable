'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    
    static associate(models) {
      Order.belongsToMany(models.Item, { through: 'OrderItems', foreignKey: 'orderId' });
      Order.belongsTo(models.User, {foreignKey: 'userId'});
      Order.belongsTo(models.Route, {foreignKey: 'routeId'});
    }
  }
  Order.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders'
  });
  return Order;
};
