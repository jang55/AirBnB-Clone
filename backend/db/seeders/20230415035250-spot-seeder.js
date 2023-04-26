'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,                                     //1
        address: "123 thatWay Ln",
        city: "SomePlace",
        state: "CA",
        country: "USA",
        lat: 10.34242,
        lng: -104.2342,
        name: "Amazing camping spot",
        description: "This is a really short description",
        price: 1000000
      },
      {
        ownerId: 2,                                     //2
        address: "123 upthatway Rd",
        city: "SomeOtherPlace",
        state: "CA",
        country: "USA",
        lat: 40.34242,
        lng: -124.2342,
        name: "Cool camping spot",
        description: "This is a really short description",
        price: 1
      },
      {
        ownerId: 3,                                     //3
        address: "Tioga Rd Hwy 120 & Hwy 140 Yosemite National Park",
        city: "Sierra Nevada",
        state: "CA",
        country: "USA",
        lat: 40.344542,
        lng: -54.23442,
        name: "Yosemite National Park",
        description: "This is a really short description",
        price: 25
      },
      {
        ownerId: 4,                                     //4
        address: "8471 N Coast Highway",
        city: "Laguna Beach",
        state: "CA",
        country: "USA",
        lat: 20.343242,
        lng: -124.23432,
        name: "Crystal Cove State Park",
        description: "This is a really short description",
        price: 55
      },
      {
        ownerId: 1,                                     //5
        address: "47000 Highway 1 ",
        city: "Big Sur",
        state: "CA",
        country: "USA",
        lat: 70.34242,
        lng: 154.2342,
        name: "Big Sur",
        description: "This is a really short description",
        price: 35
      },
      {
        ownerId: 2,                                     //6
        address: "10 Refugio Beach Rd",
        city: "Goleta",
        state: "CA",
        country: "USA",
        lat: 80.34242,
        lng: 124.2342,
        name: "El Capitan State Beach",
        description: "This is a really short description",
        price: 45
      },
      {
        ownerId: 3,                                     //7
        address: "Highway 28, Tahoe State Park, N Lake Blvd",
        city: "Tahoe City",
        state: "CA",
        country: "USA",
        lat: 50.34242,
        lng: -124.2342,
        name: "Tahoe State Recreation Area",
        description: "This is a really short description",
        price: 35
      },
      {
        ownerId: 4,                                     //8
        address: "555 Pier Avenue",
        city: "Oceano",
        state: "CA",
        country: "USA",
        lat: 60.34242,
        lng: -124.2342,
        name: "Pismo Beach",
        description: "This is a really short description",
        price: 35
      },
    ], {});
  },


  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      city: { [Op.in]: ["SomePlace", "SomeOtherPlace", "Oceano", "Tahoe City", "Goleta", "Big Sur", "Laguna Beach", "Sierra Nevada"] }
    }, {});
  }
};
