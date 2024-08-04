'use strict';
const { Item } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

options.tableName = 'Items';
options.validate = true;

const demoItems = [
  {
    name: 'Pelmeni',
    description: 'Russian style ravioli filled with beef, pork and lamb',
    onMenu: true,
    price: 4,
    quantity: 100,
    measure: 'grams',
    quantityOnHand: 20,
    costPerUnit: 2.50,
  },
  {
    name: 'Golubtsi',
    description: 'Cabbage stuffed with meat filling and with tomato sauce',
    onMenu: true,
    price: 2,
    quantity: 1,
    measure: 'each',
    quantityOnHand: 50,
    costPerUnit: 1.25,
  },
  {
    name: 'Beef Tongue',
    description: 'Stewed beef tongue about 1.5 kilograms each',
    onMenu: true,
    price: 20,
    quantity: 1,
    measure: 'each',
    quantityOnHand: 8,
    costPerUnit: 2.50,
  },
  {
    name: 'Black Bread',
    description: 'Very dense and dark with caraway seeds',
    onMenu: true,
    price: 8,
    quantity: 1,
    measure: 'loaf',
    quantityOnHand: 20,
    costPerUnit: 3.75,
  },
  {
    name: 'Fresh Patagonian Berries',
    description: 'Patagonian grown mixed berries - seasonal',
    onMenu: true,
    price: 8,
    quantity: 500,
    measure: 'grams',
    quantityOnHand: 20,
    costPerUnit: 4.5,
  },
  {
    name: 'Smoked Mackerel',
    description: 'Hardwood cold-smoked Mackerel caught fresh - about 1 kilogram each',
    onMenu: true,
    price: 14,
    quantity: 1,
    measure: 'each',
    quantityOnHand: 20,
    costPerUnit: 8,
  },
  {
    name: 'Lavash Flatbread',
    description: 'Handmade and fresh',
    onMenu: true,
    price: 3,
    quantity: 4,
    measure: 'each',
    quantityOnHand: 20,
    costPerUnit: 1.25,
  },
  {
    name: 'Kefir',
    description: 'Homemade kefir - plain',
    onMenu: true,
    price: 4,
    quantity: 500,
    measure: 'milliliters',
    quantityOnHand: 12,
    costPerUnit: 2,
  },
  {
    name: 'Tvorog',
    description: 'Homemade soft farm cheese - great for filling crepes',
    onMenu: true,
    price: 4,
    quantity: 200,
    measure: 'grams',
    quantityOnHand: 50,
    costPerUnit: 2,
  },
  {
    name: 'Crepes - Plain',
    description: 'Homemade crepes without filling',
    onMenu: true,
    price: 5,
    quantity: 6,
    measure: 'each',
    quantityOnHand: 25,
    costPerUnit: 2.25,
  },
  {
    name: 'Crepes with Meat Filling',
    description: 'Homemade crepes with seasoned ground beef filling',
    onMenu: true,
    price: 9,
    quantity: 6,
    measure: 'each',
    quantityOnHand: 15,
    costPerUnit: 4.75,
  },
  {
    name: 'Beef Milanesa',
    description: 'Argentine traditional thin tenderized beef cutlets breaded and fried',
    onMenu: true,
    price: 2,
    quantity: 1,
    measure: 'each',
    quantityOnHand: 40,
    costPerUnit: 1,
  },
  {
    name: 'Fresh Patagonia Honey',
    description: 'Direct from Patagonian beekeeper',
    onMenu: true,
    price: 4,
    quantity: 100,
    measure: 'milliliters',
    quantityOnHand: 40,
    costPerUnit: 3,
  },
  {
    name: 'Fermented Cabbage',
    description: 'Similar to Saurkraut',
    onMenu: false,
    price: 2,
    quantity: 200,
    measure: 'grams',
    quantityOnHand: 40,
    costPerUnit: 1.25,
  },
];


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Item.bulkCreate(demoItems, options);
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
