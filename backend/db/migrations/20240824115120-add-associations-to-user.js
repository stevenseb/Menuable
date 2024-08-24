'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if the necessary tables exist
    const tables = await queryInterface.showAllTables();
    
    if (tables.includes('Users') && tables.includes('Orders') && tables.includes('Reviews')) {
      // Add foreign key for User in Orders table
      await queryInterface.addConstraint('Orders', {
        fields: ['userId'],
        type: 'foreign key',
        name: 'fk_order_user',
        references: {
          table: options.schema ? { schema: options.schema, tableName: 'Users' } : 'Users',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

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
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = await queryInterface.showAllTables();
    
    if (tables.includes('Orders')) {
      // Remove foreign key constraint from Orders table
      await queryInterface.removeConstraint('Orders', 'fk_order_user', options);
    }

    if (tables.includes('Reviews')) {
      // Remove foreign key constraint from Reviews table
      await queryInterface.removeConstraint('Reviews', 'fk_review_user', options);
    }
  }
};
