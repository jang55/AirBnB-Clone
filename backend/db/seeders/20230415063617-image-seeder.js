'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const {Image} = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Images';
    return queryInterface.bulkInsert(options, [
      {
        url: "www.thisimage.com",
        preview: true,
        imageableType: "Spot",
        imageableId: 1
      },
      {
        url: "www.fthisimage.com",
        preview: false,
        imageableType: "Spot",
        imageableId: 1
      },
      {
        url: "www.fthisimage.com",
        preview: false,
        imageableType: "Spot",
        imageableId: 2
      },
      {
        url: "www.thisimage.com",
        preview: true,
        imageableType: "Spot",
        imageableId: 2
      },
      {
        url: "www.fthisimage.com",
        preview: false,
        imageableType: "Spot",
        imageableId: 3
      },
      {
        url: "www.thisimage.com",
        preview: true,
        imageableType: "Spot",
        imageableId: 3
      },
      {
        url: "www.fthisimage.com",
        preview: false,
        imageableType: "Spot",
        imageableId: 4
      },
      {
        url: "www.thisimage.com",
        preview: true,
        imageableType: "Spot",
        imageableId: 4
      },
      {
        url: "www.fthisimage.com",
        preview: false,
        imageableType: "Spot",
        imageableId: 5
      },
      {
        url: "www.thisimage.com",
        preview: true,
        imageableType: "Spot",
        imageableId: 5
      },
      {
        url: "www.fthisimage.com",
        preview: false,
        imageableType: "Spot",
        imageableId: 6
      },
      {
        url: "www.thisimage.com",
        preview: true,
        imageableType: "Spot",
        imageableId: 6
      },
      {
        url: "www.fthisimage.com",
        preview: false,
        imageableType: "Spot",
        imageableId: 7
      },
      {
        url: "www.thisimage.com",
        preview: true,
        imageableType: "Spot",
        imageableId: 7
      },
      {
        url: "www.fthisimage.com",
        preview: false,
        imageableType: "Spot",
        imageableId: 8
      },
      {
        url: "www.thisimage.com",
        preview: true,
        imageableType: "Spot",
        imageableId: 8
      },                                    //16
      /******************************/
      {
        url: "www.fIGuessThisIsAnImage.com",
        preview: false,
        imageableType: "Review",
        imageableId: 1
      },
      {
        url: "www.IGuessThisIsAnImage.com",
        preview: true,
        imageableType: "Review",
        imageableId: 1
      },
      {
        url: "www.fImage.com",
        preview: false,
        imageableType: "Review",
        imageableId: 2
      },
      {
        url: "www.Image.com",
        preview: true,
        imageableType: "Review",
        imageableId: 2
      },
      {
        url: "www.fanotherimage.com",
        preview: false,
        imageableType: "Review",
        imageableId: 3
      },
      {
        url: "www.anotherimage.com",
        preview: true,
        imageableType: "Review",
        imageableId: 3
      },
      {
        url: "www.furl.com",
        preview: false,
        imageableType: "Review",
        imageableId: 4
      },
      {
        url: "www.url.com",
        preview: true,
        imageableType: "Review",
        imageableId: 4
      },
      {
        url: "www.fanotherurl.com",
        preview: false,
        imageableType: "Review",
        imageableId: 5
      },
      {
        url: "www.anotherurl.com",
        preview: true,
        imageableType: "Review",
        imageableId: 5
      },
      {
        url: "www.f12345IMAGES.com",
        preview: false,
        imageableType: "Review",
        imageableId: 6
      },
      {
        url: "www.12345IMAGES.com",
        preview: true,
        imageableType: "Review",
        imageableId: 6
      },
      {
        url: "www.frunningoutofnames.com",
        preview: false,
        imageableType: "Review",
        imageableId: 7
      },
      {
        url: "www.runningoutofnames.com",
        preview: true,
        imageableType: "Review",
        imageableId: 7
      },
      {
        url: "www.ftiny.com",
        preview: false,
        imageableType: "Review",
        imageableId: 8
      },
      {
        url: "www.tiny.com",
        preview: true,
        imageableType: "Review",
        imageableId: 8
      },
      {
        url: "www.ftinyimage.com",
        preview: false,
        imageableType: "Review",
        imageableId: 9
      },
      {
        url: "www.tinyimage.com",
        preview: true,
        imageableType: "Review",
        imageableId: 9
      },
      {
        url: "www.fmyimage.com",
        preview: false,
        imageableType: "Review",
        imageableId: 10
      },
      {
        url: "www.myimage.com",
        preview: true,
        imageableType: "Review",
        imageableId: 10
      },
      {
        url: "www.fFINALimage.com",
        preview: false,
        imageableType: "Review",
        imageableId: 11
      },
      {
        url: "www.FINALimage.com",
        preview: true,
        imageableType: "Review",
        imageableId: 11
      },
    ], {});
  },


  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Images';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ["www.thisimage.com", "www.IGuessThisIsAnImage.com"] }
    }, {});
  }
};


