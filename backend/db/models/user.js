'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
      User.hasMany(models.Spot, { 
        foreignKey: "ownerId",
        onDelete: "CASCADE",
        hooks: true
      });

      User.hasMany(models.Review, {foreignKey: "userId"});
      User.hasMany(models.Booking, {foreignKey: "userId"});
      
      User.belongsToMany(models.Spot, { through: models.Booking, foreignKey: "userId", otherKey: "spotId" });
      
      User.belongsToMany(models.Spot, { through: models.Review, foreignKey: "userId", otherKey: "spotId" });

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