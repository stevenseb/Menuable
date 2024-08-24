'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Check if the necessary tables exist
    const tables = await queryInterface.showAllTables();
    
    if (tables.includes('Reviews') && tables.includes('Users') && tables.includes('Items')) {
      // Add foreign key for User in Reviews table
      await queryInterface.addConstraint('Reviews', {
        fields: ['userId'],
        type: 'foreign key',
        name: 'fk_review_user',
        references: {
          table: options.schema ? { schema: options.schema, tableName: 'Users' } : 'Users',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      // Add foreign key for Item in Reviews table
      await queryInterface.addConstraint('Reviews', {
        fields: ['itemId'],
        type: 'foreign key',
        name: 'fk_review_item',
        references: {
          table: options.schema ? { schema: options.schema, tableName: 'Items' } : 'Items',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    } else {
      console.log('One or more required tables do not exist. Skipping constraint addition.');
    }
  },

  async down (queryInterface, Sequelize) {
    const tables = await queryInterface.showAllTables();
    
    if (tables.includes('Reviews')) {
      // Remove foreign key constraints
      await queryInterface.removeConstraint('Reviews', 'fk_review_user', options);
      await queryInterface.removeConstraint('Reviews', 'fk_review_item', options);
    }
  }
};
