'use strict';

let options = {};
options.tableName = 'Orders';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
} else {
  options.schema = '';
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    try {
      await queryInterface.changeColumn(options, 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE'
      });
      await queryInterface.changeColumn(options, 'routeId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Routes',
          key: 'id',
        },
        onDelete: 'CASCADE'
      });
    } catch (error) {
      console.error('Error in UP migration:', error);
    }
  },

  async down (queryInterface, Sequelize) {

    try {
      await queryInterface.changeColumn(options, 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      });
      await queryInterface.changeColumn(options, 'routeId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      });
    } catch (error) {
      console.error('Error in DOWN migration:', error);
    }
  }
};
