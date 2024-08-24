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
    
    if (tables.includes('Items') && tables.includes('Orders') && tables.includes('Reviews')) {
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

      // Create the OrderItems junction table for the many-to-many relationship
      await queryInterface.createTable('OrderItems', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        orderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: options.schema ? { schema: options.schema, tableName: 'Orders' } : 'Orders',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        itemId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: options.schema ? { schema: options.schema, tableName: 'Items' } : 'Items',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, options);
    }
  },

  async down(queryInterface, Sequelize) {
    const tables = await queryInterface.showAllTables();
    
    if (tables.includes('Reviews')) {
      // Remove foreign key constraint from Reviews table
      await queryInterface.removeConstraint('Reviews', 'fk_review_item', options);
    }

    if (tables.includes('OrderItems')) {
      // Drop the OrderItems table
      await queryInterface.dropTable('OrderItems', options);
    }
  }
};
