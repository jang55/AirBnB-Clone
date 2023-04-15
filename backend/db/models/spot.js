'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
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