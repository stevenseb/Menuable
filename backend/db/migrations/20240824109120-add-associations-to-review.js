'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add foreign key constraints
    await queryInterface.addConstraint('Reviews', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_review_user',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }, options);

    await queryInterface.addConstraint('Reviews', {
      fields: ['itemId'],
      type: 'foreign key',
      name: 'fk_review_item',
      references: {
        table: 'Items',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }, options);
  },

  async down (queryInterface, Sequelize) {
    // Remove foreign key constraints
    await queryInterface.removeConstraint('Reviews', 'fk_review_user', options);
    await queryInterface.removeConstraint('Reviews', 'fk_review_item', options);
  }
};
