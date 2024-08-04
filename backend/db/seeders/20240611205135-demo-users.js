'use strict';
const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const demoUsers = [
  {
    firstName: 'Bob',
    lastName: 'Evans',
    email: 'bob@evans.com',
    username: 'Breakfast',
    hashedPassword: bcrypt.hashSync('greeneggs$521'),
    phone: '505-555-1234',
    address: '1234 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Michelle',
    lastName: 'Jordan',
    email: 'Mike@airjordan.com',
    username: 'Airforce1',
    hashedPassword: bcrypt.hashSync('getsomeair@345'),
    phone: '505-555-1235',
    address: '1235 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Mr',
    lastName: 'Bean',
    email: 'bean@funny.com',
    username: 'FrankNbeans',
    hashedPassword: bcrypt.hashSync('crazy1in##490'),
    phone: '505-555-1236',
    address: '1236 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'John',
    lastName: 'Dough',
    email: 'dough@gmail.com',
    username: 'Jdough',
    hashedPassword: bcrypt.hashSync('password123'),
    phone: '505-555-1237',
    address: '1237 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Dave',
    lastName: 'Matthews',
    email: 'music@band.com',
    username: 'dmatt',
    hashedPassword: bcrypt.hashSync('guessmypassword'),
    phone: '505-555-1238',
    address: '1238 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@gmail.com',
    username: 'AJAJ',
    hashedPassword: bcrypt.hashSync('password321'),
    phone: '505-555-1239',
    address: '1239 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Emily',
    lastName: 'Smith',
    email: 'emily@smith.com',
    username: 'Esmith',
    hashedPassword: bcrypt.hashSync('smith123'),
    phone: '505-555-1244',
    address: '1244 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'mbrown@yahoo.com',
    username: 'Mbrown',
    hashedPassword: bcrypt.hashSync('brownie456'),
    phone: '505-555-1245',
    address: '1245 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Jessica',
    lastName: 'Davis',
    email: 'jdavis@gmail.com',
    username: 'JessD',
    hashedPassword: bcrypt.hashSync('jd123'),
    phone: '505-555-1246',
    address: '1246 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Jess',
    lastName: 'Davis',
    email: 'davis@gmail.com',
    username: 'JessWorld',
    hashedPassword: bcrypt.hashSync('jd456'),
    phone: '505-555-1247',
    address: '1247 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Christopher',
    lastName: 'Wilson',
    email: 'chris.wilson@hotmail.com',
    username: 'ChrisW',
    hashedPassword: bcrypt.hashSync('wilson789'),
    phone: '505-555-1248',
    address: '1248 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Samantha',
    lastName: 'Martinez',
    email: 'smartinez@gmail.com',
    username: 'SamM',
    hashedPassword: bcrypt.hashSync('sammy321'),
    phone: '505-555-1249',
    address: '1249 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Daniel',
    lastName: 'Taylor',
    email: 'dtaylor@yahoo.com',
    username: 'DannyT',
    hashedPassword: bcrypt.hashSync('taylor456'),
    phone: '505-555-1254',
    address: '1254 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Sarah',
    lastName: 'Moore',
    email: 'sarah.moore@gmail.com',
    username: 'Smoore',
    hashedPassword: bcrypt.hashSync('moore789'),
    phone: '505-555-1255',
    address: '1255 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Sam',
    lastName: 'Moore',
    email: 'sam.moore@gmail.com',
    username: 'Boogie',
    hashedPassword: bcrypt.hashSync('boogie789'),
    phone: '505-555-1256',
    address: '1256 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Matt',
    lastName: 'Johnson',
    email: 'me@hotmail.com',
    username: 'MattL',
    hashedPassword: bcrypt.hashSync('leematt'),
    phone: '505-555-1257',
    address: '1257 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Matthew',
    lastName: 'Lee',
    email: 'mlee@hotmail.com',
    username: 'Mattz',
    hashedPassword: bcrypt.hashSync('leematz'),
    phone: '505-555-1258',
    address: '1258 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Lauren',
    lastName: 'Garcia',
    email: 'lauren.garcia@yahoo.com',
    username: 'Lgarcia',
    hashedPassword: bcrypt.hashSync('garcia123'),
    phone: '505-555-1259',
    address: '1259 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Sara',
    lastName: 'Garcia',
    email: 'sara.garcia@yahoo.com',
    username: 'Sgarcia',
    hashedPassword: bcrypt.hashSync('garcia789'),
    phone: '505-555-1264',
    address: '1264 Main St, Denver, CO, 80123'
  },
  {
    firstName: 'Demo',
    lastName: 'lition',
    email: 'demo@demo.com',
    username: 'demo',
    hashedPassword: bcrypt.hashSync('demo'),
    phone: '505-555-1265',
    address: '1265 Main St, Denver, CO, 80123'
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await User.bulkCreate(demoUsers, { validate: true });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', {
      username: {
        [Op.in]: demoUsers.map(user => user.username)
      }
    }, options);
  },
};
