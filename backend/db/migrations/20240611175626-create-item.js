'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      onMenu: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2),
      },
      quantity: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,1)
      },
      measure: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numRatings: {
       type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      stars: {
        allowNull: true,
        type: Sequelize.INTEGER,
      defaultValue: 0,
      },
      quantityOnHand: {
        type: Sequelize.DECIMAL(10,1),
        allowNull: false,
      },
      costPerUnit: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      imageFilename: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items', options);
  }
};
