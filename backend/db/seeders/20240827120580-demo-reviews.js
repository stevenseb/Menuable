'use strict';
const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

options.tableName = 'Reviews';
options.validate = true;

const demoReviews = [
    {
      itemId: 1,
      userId: 1,
      rating: 4,
      content: 'This is a great dish!',
    },
    {
      itemId: 4,
      userId: 1,
      rating: 4,
      content: 'One of my favorites!',
    },
    {
        itemId: 5,
        userId: 1,
        rating: 5,
        content: 'Great as always!',
      },
      {
        itemId: 6,
        userId: 1,
        rating: 5,
        content: 'So delicious!',
      },
      {
        itemId: 8,
        userId: 4,
        rating: 5,
        content: 'This is a great dish!',
      },
      {
        itemId: 9,
        userId: 4,
        rating: 4,
        content: 'This is a great dish!',
      },
      {
        itemId: 1,
        userId: 3,
        rating: 4,
        content: 'Definitely worth trying!',
      },
      {
        itemId: 1,
        userId: 7,
        rating: 5,
        content: 'You have to try this!',
      },
      {
        itemId: 10,
        userId: 5,
        rating: 5,
        content: 'Great as always!',
      },
      {
        itemId: 12,
        userId: 8,
        rating: 4,
        content: 'So delicious!',
      },
      {
        itemId: 8,
        userId: 9,
        rating: 5,
        content: 'This is a great dish!',
      },
      {
        itemId: 9,
        userId: 4,
        rating: 4,
        content: 'The best!',
      },
      {
        itemId: 11,
        userId: 3,
        rating: 4,
        content: 'Definitely worth trying!',
      },
      {
        itemId: 12,
        userId: 7,
        rating: 5,
        content: 'You have to try this!',
      },
      {
        itemId: 5,
        userId: 1,
        rating: 5,
        content: 'Great as always!',
      },
      {
        itemId: 6,
        userId: 1,
        rating: 5,
        content: 'So delicious!',
      },
      {
        itemId: 8,
        userId: 4,
        rating: 5,
        content: 'This is a great dish!',
      },
      {
        itemId: 9,
        userId: 4,
        rating: 4,
        content: 'This is a great dish!',
      },
      {
        itemId: 14,
        userId: 12,
        rating: 4,
        content: 'Definitely worth trying!',
      },
      {
        itemId: 13,
        userId: 10,
        rating: 5,
        content: 'You have to try this!',
      },
      {
        itemId: 14,
        userId: 1,
        rating: 5,
        content: 'Great as always!',
      },
      {
        itemId: 13,
        userId: 1,
        rating: 5,
        content: 'So delicious!',
      },
      {
        itemId: 11,
        userId: 4,
        rating: 5,
        content: 'This is a great dish!',
      },
      {
        itemId: 16,
        userId: 4,
        rating: 4,
        content: 'This is a great dish!',
      },
      {
        itemId: 16,
        userId: 3,
        rating: 4,
        content: 'Definitely worth trying!',
      },
      {
        itemId: 12,
        userId: 7,
        rating: 5,
        content: 'You have to try this!',
      },
      {
        itemId: 15,
        userId: 1,
        rating: 5,
        content: 'Great as always!',
      },
      {
        itemId: 16,
        userId: 1,
        rating: 5,
        content: 'So delicious!',
      },
      {
        itemId: 18,
        userId: 4,
        rating: 5,
        content: 'This is a great dish!',
      },
      {
        itemId: 19,
        userId: 4,
        rating: 4,
        content: 'This is a great dish!',
      },
      {
        itemId: 20,
        userId: 3,
        rating: 4,
        content: 'Definitely worth trying!',
      },
      {
        itemId: 11,
        userId: 7,
        rating: 5,
        content: 'You have to try this!',
      },
      {
        itemId: 15,
        userId: 1,
        rating: 5,
        content: 'Great as always!',
      },
      {
        itemId: 16,
        userId: 1,
        rating: 5,
        content: 'So delicious!',
      },
      {
        itemId: 20,
        userId: 4,
        rating: 5,
        content: 'This is a great dish!',
      },
      {
        itemId: 21,
        userId: 4,
        rating: 4,
        content: 'This is a great dish!',
      },
      {
        itemId: 18,
        userId: 3,
        rating: 4,
        content: 'Definitely worth trying!',
      },
      {
        itemId: 19,
        userId: 7,
        rating: 5,
        content: 'You have to try this!',
      },
];


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Review.bulkCreate(demoReviews, options);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
    }, {});
  },
};
