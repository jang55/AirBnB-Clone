'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {

    static associate(models) {
      // define association here
      Review.belongsTo(models.User, { foreignKey: "userId" });

      Review.belongsTo(models.Spot, { foreignKey: "spotId" });

      Review.hasMany(models.Image, { 
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: "Review"
        },
        as: "ReviewImages"
      });

      Review.hasMany(models.Image, { 
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: "Review"
        },
      });

    }
  }
  Review.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    review: {
      type: DataTypes.STRING(255),
      allowNull: false
    }, 
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
        isNumeric: true
      }
    }, 
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};