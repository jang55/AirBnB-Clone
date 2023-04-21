'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    getImageable(options) {
      if(this.imageableType === "Spot") {
        return this.getSpot(options);
      } else if(this.imageableType === "Review") {
        return this.getReview(options);
      } else {
        return Promise.resolve(null);
      }
  }

    static associate(models) {
      // define association here
      Image.belongsTo(models.Review, { 
        foreignKey: "imageableId",
        constraints: false
      });

      Image.belongsTo(models.Spot, { 
        foreignKey: "imageableId",
        constraints: false,
      });
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    imageableType: {
      type: DataTypes.ENUM("Spot", "Review"),
      allowNull: false,
      
    }, 
    imageableId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
  }, {
    sequelize,
    modelName: 'Image',
    defaultScope: {
      attributes: {
        exclude: ["imageableType", "imageableId", "createdAt", "updatedAt"]
      }
    }
  });
  return Image;
};