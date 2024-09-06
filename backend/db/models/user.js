'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, { foreignKey: 'userId' });
      User.hasMany(models.Review, { foreignKey: 'userId' });
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        notEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Username cannot be an email address.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      },
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60],
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 15],
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      withAllFields: {
        attributes: {}
      }
    },
  });

  User.addHook('beforeValidate', async (user, options) => {
    if (user.changed('username')) {
      const existingUser = await User.findOne({ where: { username: user.username } });
      if (existingUser) {
        throw new Error('Username already exists');
      }
    }
    if (user.changed('email')) {
      const existingUser = await User.findOne({ where: { email: user.email } });
      if (existingUser) {
        throw new Error('Email already exists');
      }
    }
    if (user.changed('phone')) {
      const existingUser = await User.findOne({ where: { phone: user.phone } });
      if (existingUser) {
        throw new Error('Phone number already exists');
      }
    }
  });

  return User;
};
