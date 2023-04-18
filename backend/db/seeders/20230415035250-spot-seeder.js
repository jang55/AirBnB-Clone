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
        lng: -12424.2342,
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
      {
        ownerId: 3,
        address: "Tioga Rd Hwy 120 & Hwy 140 Yosemite National Park",
        city: "Sierra Nevada",
        state: "CA",
        country: "USA",
        lat: 240.344542,
        lng: -5454.23442,
        name: "Yosemite National Park",
        description: "This is a really short description",
        price: 25
      },
      {
        ownerId: 4,
        address: "8471 N Coast Highway",
        city: "Laguna Beach",
        state: "CA",
        country: "USA",
        lat: 1131220.343242,
        lng: -1424.23432,
        name: "Crystal Cove State Park",
        description: "This is a really short description",
        price: 55
      },
      {
        ownerId: 1,
        address: "47000 Highway 1 ",
        city: "Big Sur",
        state: "CA",
        country: "USA",
        lat: 220.34242,
        lng: 3454.2342,
        name: "Big Sur",
        description: "This is a really short description",
        price: 35
      },
      {
        ownerId: 2,
        address: "10 Refugio Beach Rd",
        city: "Goleta",
        state: "CA",
        country: "USA",
        lat: 24220.34242,
        lng: 124.2342,
        name: "El Capitan State Beach",
        description: "This is a really short description",
        price: 45
      },
      {
        ownerId: 3,
        address: "Highway 28, Tahoe State Park, N Lake Blvd",
        city: "Tahoe City",
        state: "CA",
        country: "USA",
        lat: 24220.34242,
        lng: -124.2342,
        name: "Tahoe State Recreation Area",
        description: "This is a really short description",
        price: 35
      },
      {
        ownerId: 4,
        address: "555 Pier Avenue",
        city: "Oceano",
        state: "CA",
        country: "USA",
        lat: 24220.34242,
        lng: -124.2342,
        name: "Pismo Beach",
        description: "This is a really short description",
        price: 35
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
