'use strict';

let options = {};
options.tableName = 'OrderItems';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
} else {
  options.schema = '';
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  
    const tableOptions = options.schema ? { schema: options.schema, tableName: options.tableName } : { tableName: options.tableName };

    try {
      await queryInterface.changeColumn(tableOptions, 'itemId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Items',
          key: 'id',
        },
        onDelete: 'CASCADE'
      });
      await queryInterface.changeColumn(tableOptions, 'orderId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id',
        },
        onDelete: 'CASCADE'
      });
    } catch (error) {
      console.error('Error in UP migration:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    const tableOptions = options.schema ? { schema: options.schema, tableName: options.tableName } : { tableName: options.tableName };

    console.log('Running DOWN migration with tableOptions:', tableOptions);

    try {
      await queryInterface.changeColumn(tableOptions, 'itemId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      });
      await queryInterface.changeColumn(tableOptions, 'orderId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      });
    } catch (error) {
      console.error('Error in DOWN migration:', error);
    }
  }
};
