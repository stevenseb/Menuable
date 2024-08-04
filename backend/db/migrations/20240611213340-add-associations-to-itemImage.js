'use strict';

let options = { tableName: 'ItemImages' };

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
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
    } catch (error) {
      console.error('Error in UP migration:', error);
    }
  },

  async down(queryInterface, Sequelize) {

    const tableOptions = options.schema ? { schema: options.schema, tableName: options.tableName } : { tableName: options.tableName };

    try {
      await queryInterface.changeColumn(tableOptions, 'itemId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      });
    } catch (error) {
      console.error('Error in DOWN migration:', error);
    }
  }
};
