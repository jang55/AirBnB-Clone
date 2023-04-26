'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {

    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: "userId" });

      Booking.belongsTo(models.Spot, { foreignKey: "spotId" });
    }
  }
  Booking.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    }, 
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
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