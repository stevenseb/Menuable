'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      itemId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    }, options);
  },

  async down (queryInterface, Sequelize) {
    // Drop the table
    await queryInterface.dropTable('Reviews');
  }
};
