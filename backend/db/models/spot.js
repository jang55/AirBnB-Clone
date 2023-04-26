'use strict';
const {
  Model, where
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {

    static associate(models) {

      Spot.belongsTo(models.User, { foreignKey: "ownerId", as: "Owner" });

    //1 to many relationship to review and booking
      Spot.hasMany(models.Review, {foreignKey: "spotId"});
      Spot.hasMany(models.Booking, {foreignKey: "spotId"});

    //many to many relationship for users and bookings
      Spot.belongsToMany(models.User, { through: models.Booking, foreignKey: "spotId" });
      Spot.belongsToMany(models.User, { through: models.Review, foreignKey: "spotId" });

    //alias with previewImage in images
      Spot.hasMany(models.Image, { 
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: "Spot"
        },
        as: "previewImage"
      });

      Spot.hasMany(models.Image, { 
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: "Spot"
        },
        as: "ReviewImagess"
      });

      Spot.hasMany(models.Image, { 
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: "Spot"
        },
        as: "spotImages"
      });
    
      Spot.hasMany(models.Image, { 
        foreignKey: "imageableId",
        constraints: false,
        scope: {
          imageableType: "Spot"
        },
      });

    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    address: {
      type: DataTypes.STRING(100),
      allowNull: false
    }, 
    city: {
      type: DataTypes.STRING(45),
      allowNull: false
    }, 
    state: {
      type: DataTypes.STRING(45),
      allowNull: false
    }, 
    country: {
      type: DataTypes.STRING(45),
      allowNull: false
    }, 
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    }, 
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false
    }, 
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }, 
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};