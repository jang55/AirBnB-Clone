'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: "userId" });

      Booking.belongsTo(models.Spot, { foreignKey: "spotId" });
    }
  }
  Booking.init({
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      // get: function() { // or use get(){ }
      //   return this.getDataValue('startDate')
      //     .toLocaleString('en-GB', { timeZone: 'UTC' });
      // }
    }, 
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      // get: function() { // or use get(){ }
      //   return this.getDataValue('endDate')
      //     .toLocaleString('en-GB', { timeZone: 'UTC' });
      // }
    }, 
    userId: {
      type: DataTypes.INTEGER,
    }, 
    spotId: {
      type: DataTypes.INTEGER,
    }, 
  }, {
    sequelize,
    modelName: 'Booking',
    scopes: {
      notOwner(spotId) {
        return {
          where: {
            spotId: spotId
          },
          attributes: ["spotId", "startDate", "endDate"]
        }
      },
      owner(spotId) {
        const { User } = require("../models")
        return {
          where: {
            spotId: spotId
          },
          include: {
            model: User,
            attributes: ["id", "firstName", "lastName"],
          },
          attributes: {
            include: ["id"]
          }
        }
      }
    }
  });
  return Booking;
};