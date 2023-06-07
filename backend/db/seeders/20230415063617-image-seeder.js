"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const { Image } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Images";
    return queryInterface.bulkInsert(
      options,
      [
        {
          url: "https://i.imgur.com/0Py6Yx8.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 1,
        },
        {
          url: "https://i.imgur.com/7XBR50S.jpg",
          preview: false,
          imageableType: "Spot",
          imageableId: 1,
        },
        {
          url: "https://i.imgur.com/CQbzQ9Q.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 1,
        },
        {
          url: "https://i.imgur.com/i6M9j1a.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 1,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 1,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 1,
        },
        {
          url: "https://i.imgur.com/7XBR50S.jpg",
          preview: false,
          imageableType: "Spot",
          imageableId: 2,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 2,
        },
        {
          url: "https://i.imgur.com/7XBR50S.jpg",
          preview: false,
          imageableType: "Spot",
          imageableId: 2,
        },
        {
          url: "https://i.imgur.com/CQbzQ9Q.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 2,
        },
        {
          url: "https://i.imgur.com/i6M9j1a.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 2,
        },
        {
          url: "https://i.imgur.com/CQbzQ9Q.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 3,
        },
        {
          url: "https://i.imgur.com/CQbzQ9Q.jpg",
          preview: false,
          imageableType: "Spot",
          imageableId: 3,
        },
        {
          url: "https://i.imgur.com/CQbzQ9Q.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 3,
        },
        {
          url: "https://i.imgur.com/i6M9j1a.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 3,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 3,
        },
        {
          url: "https://i.imgur.com/7XBR50S.jpg",
          preview: false,
          imageableType: "Spot",
          imageableId: 3,
        },
        {
          url: "https://i.imgur.com/i6M9j1a.jpg",
          preview: false,
          imageableType: "Spot",
          imageableId: 4,
        },
        {
          url: "https://i.imgur.com/i6M9j1a.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 4,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 4,
        },
        {
          url: "https://i.imgur.com/7XBR50S.jpg",
          preview: false,
          imageableType: "Spot",
          imageableId: 4,
        },
        {
          url: "https://i.imgur.com/CQbzQ9Q.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 4,
        },
        {
          url: "https://i.imgur.com/i6M9j1a.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 4,
        },
        {
          url: "https://i.imgur.com/TO5sWAi.jpg",
          preview: false,
          imageableType: "Spot",
          imageableId: 5,
        },
        {
          url: "https://i.imgur.com/IRRcR4u.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 5,
        },
        {
          url: "https://i.imgur.com/7XBR50S.jpg",
          preview: false,
          imageableType: "Spot",
          imageableId: 5,
        },
        {
          url: "https://i.imgur.com/CQbzQ9Q.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 5,
        },
        {
          url: "https://i.imgur.com/i6M9j1a.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 5,
        },
        {
          url: "https://i.imgur.com/o4KFSDK.jpg",
          preview: false,
          imageableType: "Spot",
          imageableId: 6,
        },
        {
          url: "https://i.imgur.com/xmXJVCV.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 6,
        },
        {
          url: "https://i.imgur.com/7XBR50S.jpg",
          preview: false,
          imageableType: "Spot",
          imageableId: 6,
        },
        {
          url: "https://i.imgur.com/CQbzQ9Q.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 6,
        },
        {
          url: "https://i.imgur.com/i6M9j1a.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 6,
        },
        {
          url: "https://i.imgur.com/nYZPIxj.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 7,
        },
        {
          url: "https://i.imgur.com/7XBR50S.jpg",
          preview: false,
          imageableType: "Spot",
          imageableId: 7,
        },
        {
          url: "https://i.imgur.com/7XBR50S.jpg",
          preview: false,
          imageableType: "Spot",
          imageableId: 7,
        },
        {
          url: "https://i.imgur.com/CQbzQ9Q.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 7,
        },
        {
          url: "https://i.imgur.com/PJGTPty.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 7,
        },
        {
          url: "https://i.imgur.com/kYZ0YWk.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 8,
        },
        {
          url: "https://i.imgur.com/i6M9j1a.jpg",
          preview: false,
          imageableType: "Spot",
          imageableId: 8,
        },
        {
          url: "https://i.imgur.com/7XBR50S.jpg",
          preview: false,
          imageableType: "Spot",
          imageableId: 8,
        },
        {
          url: "https://i.imgur.com/PJGTPty.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 8,
        },
        {
          url: "https://i.imgur.com/nYZPIxj.jpg",
          preview: true,
          imageableType: "Spot",
          imageableId: 8,
        }, //16
        /******************************/
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: false,
          imageableType: "Review",
          imageableId: 1,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Review",
          imageableId: 1,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: false,
          imageableType: "Review",
          imageableId: 2,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Review",
          imageableId: 2,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: false,
          imageableType: "Review",
          imageableId: 3,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Review",
          imageableId: 3,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: false,
          imageableType: "Review",
          imageableId: 4,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Review",
          imageableId: 4,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: false,
          imageableType: "Review",
          imageableId: 5,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Review",
          imageableId: 5,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: false,
          imageableType: "Review",
          imageableId: 6,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Review",
          imageableId: 6,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: false,
          imageableType: "Review",
          imageableId: 7,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Review",
          imageableId: 7,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: false,
          imageableType: "Review",
          imageableId: 8,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Review",
          imageableId: 8,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: false,
          imageableType: "Review",
          imageableId: 9,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Review",
          imageableId: 9,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: false,
          imageableType: "Review",
          imageableId: 10,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Review",
          imageableId: 10,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: false,
          imageableType: "Review",
          imageableId: 11,
        },
        {
          url: "https://i.imgur.com/k5Yx2S6.jpg",
          preview: true,
          imageableType: "Review",
          imageableId: 11,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Images";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        preview: { [Op.in]: [true, false] },
      },
      {}
    );
  },
};
