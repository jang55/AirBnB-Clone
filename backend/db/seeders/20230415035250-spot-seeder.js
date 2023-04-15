'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// const {Spot} = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 thatWay Ln",
        city: "SomePlace",
        state: "CA",
        country: "USA",
        lat: 1000.34242,
        lng: -12424.234242,
        name: "Amazing camping spot",
        description: "This is a really short description",
        price: 1000000
      },
      {
        ownerId: 2,
        address: "123 upthatway Rd",
        city: "SomeOtherPlace",
        state: "CA",
        country: "USA",
        lat: 24220.34242,
        lng: -124.2342,
        name: "Cool camping spot",
        description: "This is a really short description",
        price: 1
      },
    ], {});
  },

  // async up (queryInterface, Sequelize) {
  //   await Spot.create({
  //       ownerId: 1,
  //       address: "123 thatWay Ln",
  //       city: "SomePlace",
  //       state: "CA",
  //       country: "USA",
  //       lat: 1000.34242,
  //       lng: -12424.234242,
  //       name: "Amazing camping spot",
  //       description: "This is a really short description",
  //       price: 1000000,
        
  //     })
  // },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      city: { [Op.in]: ["SomePlace", "SomeOtherPlace"] }
    }, {});
  }
};
