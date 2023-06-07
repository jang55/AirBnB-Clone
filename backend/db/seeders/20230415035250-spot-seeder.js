"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1, //1
          address: "123 thatWay Ln",
          city: "El Derado",
          state: "CA",
          country: "USA",
          lat: 10.34242,
          lng: -104.2342,
          name: "Mountain View",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna id. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Aenean et tortor at risus. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Leo in vitae turpis massa sed elementum tempus egestas. Sed turpis tincidunt id aliquet risus. Adipiscing tristique risus nec feugiat in fermentum posuere. Donec adipiscing tristique risus nec feugiat in fermentum posuere. A cras semper auctor neque.
        Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Ut enim blandit volutpat maecenas volutpat. Adipiscing enim eu turpis egestas. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Rhoncus est pellentesque elit ullamcorper dignissim cras. Sed risus pretium quam vulputate dignissim suspendisse. Massa vitae tortor condimentum lacinia. Malesuada bibendum arcu vitae elementum. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Lorem donec massa sapien faucibus et molestie ac.`,
          price: 100,
        },
        {
          ownerId: 2, //2
          address: "123 upthatway Rd",
          city: "Redding",
          state: "CA",
          country: "USA",
          lat: 40.34242,
          lng: -124.2342,
          name: "Cool Lake",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna id. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Aenean et tortor at risus. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Leo in vitae turpis massa sed elementum tempus egestas. Sed turpis tincidunt id aliquet risus. Adipiscing tristique risus nec feugiat in fermentum posuere. Donec adipiscing tristique risus nec feugiat in fermentum posuere. A cras semper auctor neque.
          Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Ut enim blandit volutpat maecenas volutpat. Adipiscing enim eu turpis egestas. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Rhoncus est pellentesque elit ullamcorper dignissim cras. Sed risus pretium quam vulputate dignissim suspendisse. Massa vitae tortor condimentum lacinia. Malesuada bibendum arcu vitae elementum. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Lorem donec massa sapien faucibus et molestie ac.`,
          price: 75,
        },
        {
          ownerId: 3, //3
          address: "Tioga Rd Hwy 120 & Hwy 140 Yosemite National Park",
          city: "Sierra Nevada",
          state: "CA",
          country: "USA",
          lat: 40.344542,
          lng: -54.23442,
          name: "Yosemite National Park",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna id. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Aenean et tortor at risus. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Leo in vitae turpis massa sed elementum tempus egestas. Sed turpis tincidunt id aliquet risus. Adipiscing tristique risus nec feugiat in fermentum posuere. Donec adipiscing tristique risus nec feugiat in fermentum posuere. A cras semper auctor neque.
        Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Ut enim blandit volutpat maecenas volutpat. Adipiscing enim eu turpis egestas. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Rhoncus est pellentesque elit ullamcorper dignissim cras. Sed risus pretium quam vulputate dignissim suspendisse. Massa vitae tortor condimentum lacinia. Malesuada bibendum arcu vitae elementum. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Lorem donec massa sapien faucibus et molestie ac.`,
          price: 25,
        },
        {
          ownerId: 4, //4
          address: "8471 N Coast Highway",
          city: "Laguna Beach",
          state: "CA",
          country: "USA",
          lat: 20.343242,
          lng: -124.23432,
          name: "Crystal Cove State Park",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna id. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Aenean et tortor at risus. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Leo in vitae turpis massa sed elementum tempus egestas. Sed turpis tincidunt id aliquet risus. Adipiscing tristique risus nec feugiat in fermentum posuere. Donec adipiscing tristique risus nec feugiat in fermentum posuere. A cras semper auctor neque.
        Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Ut enim blandit volutpat maecenas volutpat. Adipiscing enim eu turpis egestas. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Rhoncus est pellentesque elit ullamcorper dignissim cras. Sed risus pretium quam vulputate dignissim suspendisse. Massa vitae tortor condimentum lacinia. Malesuada bibendum arcu vitae elementum. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Lorem donec massa sapien faucibus et molestie ac.`,
          price: 55,
        },
        {
          ownerId: 1, //5
          address: "47000 Highway 1 ",
          city: "Big Sur",
          state: "CA",
          country: "USA",
          lat: 70.34242,
          lng: 154.2342,
          name: "Big Sur",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna id. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Aenean et tortor at risus. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Leo in vitae turpis massa sed elementum tempus egestas. Sed turpis tincidunt id aliquet risus. Adipiscing tristique risus nec feugiat in fermentum posuere. Donec adipiscing tristique risus nec feugiat in fermentum posuere. A cras semper auctor neque.
        Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Ut enim blandit volutpat maecenas volutpat. Adipiscing enim eu turpis egestas. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Rhoncus est pellentesque elit ullamcorper dignissim cras. Sed risus pretium quam vulputate dignissim suspendisse. Massa vitae tortor condimentum lacinia. Malesuada bibendum arcu vitae elementum. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Lorem donec massa sapien faucibus et molestie ac.`,
          price: 35,
        },
        {
          ownerId: 2, //6
          address: "10 Refugio Beach Rd",
          city: "Goleta",
          state: "CA",
          country: "USA",
          lat: 80.34242,
          lng: 124.2342,
          name: "El Capitan State Beach",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna id. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Aenean et tortor at risus. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Leo in vitae turpis massa sed elementum tempus egestas. Sed turpis tincidunt id aliquet risus. Adipiscing tristique risus nec feugiat in fermentum posuere. Donec adipiscing tristique risus nec feugiat in fermentum posuere. A cras semper auctor neque.
        Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Ut enim blandit volutpat maecenas volutpat. Adipiscing enim eu turpis egestas. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Rhoncus est pellentesque elit ullamcorper dignissim cras. Sed risus pretium quam vulputate dignissim suspendisse. Massa vitae tortor condimentum lacinia. Malesuada bibendum arcu vitae elementum. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Lorem donec massa sapien faucibus et molestie ac.`,
          price: 45,
        },
        {
          ownerId: 3, //7
          address: "Highway 28, Tahoe State Park, N Lake Blvd",
          city: "Tahoe City",
          state: "CA",
          country: "USA",
          lat: 50.34242,
          lng: -124.2342,
          name: "Tahoe State Recreation Area",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna id. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Aenean et tortor at risus. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Leo in vitae turpis massa sed elementum tempus egestas. Sed turpis tincidunt id aliquet risus. Adipiscing tristique risus nec feugiat in fermentum posuere. Donec adipiscing tristique risus nec feugiat in fermentum posuere. A cras semper auctor neque.
        Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Ut enim blandit volutpat maecenas volutpat. Adipiscing enim eu turpis egestas. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Rhoncus est pellentesque elit ullamcorper dignissim cras. Sed risus pretium quam vulputate dignissim suspendisse. Massa vitae tortor condimentum lacinia. Malesuada bibendum arcu vitae elementum. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Lorem donec massa sapien faucibus et molestie ac.`,
          price: 35,
        },
        {
          ownerId: 4, //8
          address: "555 Pier Avenue",
          city: "Oceano",
          state: "CA",
          country: "USA",
          lat: 60.34242,
          lng: -124.2342,
          name: "Pismo Beach",
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi morbi tempus iaculis urna id. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Aenean et tortor at risus. Eleifend donec pretium vulputate sapien nec sagittis aliquam. Leo in vitae turpis massa sed elementum tempus egestas. Sed turpis tincidunt id aliquet risus. Adipiscing tristique risus nec feugiat in fermentum posuere. Donec adipiscing tristique risus nec feugiat in fermentum posuere. A cras semper auctor neque.
        Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Ut enim blandit volutpat maecenas volutpat. Adipiscing enim eu turpis egestas. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Rhoncus est pellentesque elit ullamcorper dignissim cras. Sed risus pretium quam vulputate dignissim suspendisse. Massa vitae tortor condimentum lacinia. Malesuada bibendum arcu vitae elementum. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu. Lorem donec massa sapien faucibus et molestie ac.`,
          price: 35,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        city: {
          [Op.in]: [
            "SomePlace",
            "SomeOtherPlace",
            "Oceano",
            "Tahoe City",
            "Goleta",
            "Big Sur",
            "Laguna Beach",
            "Sierra Nevada",
          ],
        },
      },
      {}
    );
  },
};
