'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    
    static associate(models) {
        Order.belongsTo(models.User, { foreignKey: 'userId' });
        Order.belongsTo(models.Route, { foreignKey: 'routeId' });
        Order.belongsToMany(models.Item, { 
          through: models.OrderItem,
          as: 'Items',
          foreignKey: 'orderId',
          otherKey: 'itemId'
        });
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
