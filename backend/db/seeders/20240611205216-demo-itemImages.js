'use strict';
const { ItemImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

options.tableName = 'ItemImages';
options.validate = true;

const demoItemImages = [
  {
    itemId: 1,
    url: 'https://mf.b37mrtl.ru/rbthmedia/images/2020.02/article/5e3d65a085600a1c3076634a.jpg',
  },
  {
    itemId: 2,
    url: 'https://images.squarespace-cdn.com/content/v1/5351f4bee4b0807162678fff/1648061241718-NMVCHA901ODL1QGD4VFY/platedstuffedcabbage.jpg',
  },
  {
    itemId: 3,
    url: 'https://smellaque.com/wp-content/uploads/2020/11/Beef-Tongue-3.jpg',
  },
  {
    itemId: 4,
    url: 'https://www.cookinggodsway.com/wp-content/uploads/2010/12/sd-russian-black-bread.jpg',
  },
  {
    itemId: 5,
    url: 'https://sweetnessinseattleblog.com/wp-content/uploads/2020/11/mixed-berries.jpeg',
  },
  {
    itemId: 6,
    url: 'https://www.russianfoodusa.com/images/P/macrele.jpg',
  },
  {
    itemId: 7,
    url: 'https://silkroadrecipes.com/wp-content/uploads/2020/12/Lavash-square-500x375.jpg',
  },
  {
    itemId: 8,
    url: 'https://hips.hearstapps.com/hmg-prod/images/how-to-make-milk-kefir-1590092102.jpg',
  },
  {
    itemId: 9,
    url: 'https://thatswhatshehad.com/wp-content/uploads/2016/10/russian-cottage-cheese.jpg'
  },
  {
    itemId: 10,
    url: 'https://www.foodandwine.com/thmb/8bTxzoqzk7x31ZtH6EWI9SeWXNQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/basic-crepes-FT-RECIPE0920-34a127803e294b47acc8e290892ed98d.jpg'
  },
  {
    itemId: 11,
    url: 'https://mf.b37mrtl.ru/rbthmedia/images/2021.02/article/601bc1d215e9f909dd4462e9.jpg',
  },
  {
    itemId: 12,
    url: 'https://i.ytimg.com/vi/TBrWNMj-qgo/maxresdefault.jpg',
  },
  {
    itemId: 13,
    url: 'https://www.elcaminohealth.org/sites/default/files/styles/focal_point_scale_and_crop_1200x630/public/2020-03/health-benefits-of-honey-1100x355.jpg',
  },
  {
    itemId: 14,
    url: 'https://cdni.rbth.com/rbthmedia/images/web/en-rbth/images/2014-11/big/616cabbage.jpg',
  },
];


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await ItemImage.bulkCreate(demoItemImages, options);
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
