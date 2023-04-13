'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        len: [1, 45],
        isAlpha: true
      }
    }, 
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        len: [1, 45],
        isAlpha: true
      }
    }, 
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 20],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    }, 
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 45],
        isEmail: true
      }
    }, 
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }, 
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      checkPassword(email) {
          // using an email or any unique identifier for the current user like a username
          return {
              where: { email },
              attributes: { // will return only the hashedPassword attribute
                  include: [ "hashedPassword" ]
              }
          }
      }
  }
  });
  return User;
};