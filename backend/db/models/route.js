'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {

    static associate(models) {
      Route.hasMany(models.Order, { foreignKey: 'routeId' });
    }
  }
  Route.init({
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalSales: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    totalCost: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Route',
    tableName: 'Routes'
  });
  return Route;
};
