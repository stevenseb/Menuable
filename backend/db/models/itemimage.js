'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemImage extends Model {
  
    static associate(models) {
      ItemImage.belongsTo(models.Item, {foreignKey: 'itemId'})
    }
  }
  ItemImage.init({
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ItemImage',
    tableName: 'ItemImages',
  });
  return ItemImage;
};
