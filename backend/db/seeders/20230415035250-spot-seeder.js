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
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh venenatis cras sed felis eget. Ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi. Sem et tortor consequat id porta. Netus et malesuada fames ac turpis egestas. Varius sit amet mattis vulputate enim nulla aliquet. Ut consequat semper viverra nam libero justo laoreet sit. Justo laoreet sit amet cursus sit amet dictum. Duis at tellus at urna condimentum mattis pellentesque id nibh. Imperdiet nulla malesuada pellentesque elit eget. Viverra adipiscing at in tellus integer feugiat. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eget nunc lobortis mattis aliquam. Velit sed ullamcorper morbi tincidunt ornare. Dictum sit amet justo donec enim diam vulputate ut pharetra. Nunc mattis enim ut tellus. Enim lobortis scelerisque fermentum dui faucibus. Dolor sed viverra ipsum nunc aliquet bibendum. Ut sem nulla pharetra diam sit amet nisl. Bibendum neque egestas congue quisque. Erat imperdiet sed euismod nisi porta lorem mollis. Orci sagittis eu volutpat odio facilisis mauris sit amet massa. Integer enim neque volutpat ac tincidunt. Enim nulla aliquet porttitor lacus luctus. At erat pellentesque adipiscing commodo elit. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Aenean sed adipiscing diam donec adipiscing tristique.`,
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
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh venenatis cras sed felis eget. Ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi. Sem et tortor consequat id porta. Netus et malesuada fames ac turpis egestas. Varius sit amet mattis vulputate enim nulla aliquet. Ut consequat semper viverra nam libero justo laoreet sit. Justo laoreet sit amet cursus sit amet dictum. Duis at tellus at urna condimentum mattis pellentesque id nibh. Imperdiet nulla malesuada pellentesque elit eget. Viverra adipiscing at in tellus integer feugiat. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eget nunc lobortis mattis aliquam. Velit sed ullamcorper morbi tincidunt ornare. Dictum sit amet justo donec enim diam vulputate ut pharetra. Nunc mattis enim ut tellus. Enim lobortis scelerisque fermentum dui faucibus. Dolor sed viverra ipsum nunc aliquet bibendum. Ut sem nulla pharetra diam sit amet nisl. Bibendum neque egestas congue quisque. Erat imperdiet sed euismod nisi porta lorem mollis. Orci sagittis eu volutpat odio facilisis mauris sit amet massa. Integer enim neque volutpat ac tincidunt. Enim nulla aliquet porttitor lacus luctus. At erat pellentesque adipiscing commodo elit. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Aenean sed adipiscing diam donec adipiscing tristique.`,
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
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh venenatis cras sed felis eget. Ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi. Sem et tortor consequat id porta. Netus et malesuada fames ac turpis egestas. Varius sit amet mattis vulputate enim nulla aliquet. Ut consequat semper viverra nam libero justo laoreet sit. Justo laoreet sit amet cursus sit amet dictum. Duis at tellus at urna condimentum mattis pellentesque id nibh. Imperdiet nulla malesuada pellentesque elit eget. Viverra adipiscing at in tellus integer feugiat. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eget nunc lobortis mattis aliquam. Velit sed ullamcorper morbi tincidunt ornare. Dictum sit amet justo donec enim diam vulputate ut pharetra. Nunc mattis enim ut tellus. Enim lobortis scelerisque fermentum dui faucibus. Dolor sed viverra ipsum nunc aliquet bibendum. Ut sem nulla pharetra diam sit amet nisl. Bibendum neque egestas congue quisque. Erat imperdiet sed euismod nisi porta lorem mollis. Orci sagittis eu volutpat odio facilisis mauris sit amet massa. Integer enim neque volutpat ac tincidunt. Enim nulla aliquet porttitor lacus luctus. At erat pellentesque adipiscing commodo elit. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Aenean sed adipiscing diam donec adipiscing tristique.`,
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
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh venenatis cras sed felis eget. Ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi. Sem et tortor consequat id porta. Netus et malesuada fames ac turpis egestas. Varius sit amet mattis vulputate enim nulla aliquet. Ut consequat semper viverra nam libero justo laoreet sit. Justo laoreet sit amet cursus sit amet dictum. Duis at tellus at urna condimentum mattis pellentesque id nibh. Imperdiet nulla malesuada pellentesque elit eget. Viverra adipiscing at in tellus integer feugiat. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eget nunc lobortis mattis aliquam. Velit sed ullamcorper morbi tincidunt ornare. Dictum sit amet justo donec enim diam vulputate ut pharetra. Nunc mattis enim ut tellus. Enim lobortis scelerisque fermentum dui faucibus. Dolor sed viverra ipsum nunc aliquet bibendum. Ut sem nulla pharetra diam sit amet nisl. Bibendum neque egestas congue quisque. Erat imperdiet sed euismod nisi porta lorem mollis. Orci sagittis eu volutpat odio facilisis mauris sit amet massa. Integer enim neque volutpat ac tincidunt. Enim nulla aliquet porttitor lacus luctus. At erat pellentesque adipiscing commodo elit. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Aenean sed adipiscing diam donec adipiscing tristique.`,
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
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh venenatis cras sed felis eget. Ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi. Sem et tortor consequat id porta. Netus et malesuada fames ac turpis egestas. Varius sit amet mattis vulputate enim nulla aliquet. Ut consequat semper viverra nam libero justo laoreet sit. Justo laoreet sit amet cursus sit amet dictum. Duis at tellus at urna condimentum mattis pellentesque id nibh. Imperdiet nulla malesuada pellentesque elit eget. Viverra adipiscing at in tellus integer feugiat. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eget nunc lobortis mattis aliquam. Velit sed ullamcorper morbi tincidunt ornare. Dictum sit amet justo donec enim diam vulputate ut pharetra. Nunc mattis enim ut tellus. Enim lobortis scelerisque fermentum dui faucibus. Dolor sed viverra ipsum nunc aliquet bibendum. Ut sem nulla pharetra diam sit amet nisl. Bibendum neque egestas congue quisque. Erat imperdiet sed euismod nisi porta lorem mollis. Orci sagittis eu volutpat odio facilisis mauris sit amet massa. Integer enim neque volutpat ac tincidunt. Enim nulla aliquet porttitor lacus luctus. At erat pellentesque adipiscing commodo elit. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Aenean sed adipiscing diam donec adipiscing tristique.`,
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
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh venenatis cras sed felis eget. Ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi. Sem et tortor consequat id porta. Netus et malesuada fames ac turpis egestas. Varius sit amet mattis vulputate enim nulla aliquet. Ut consequat semper viverra nam libero justo laoreet sit. Justo laoreet sit amet cursus sit amet dictum. Duis at tellus at urna condimentum mattis pellentesque id nibh. Imperdiet nulla malesuada pellentesque elit eget. Viverra adipiscing at in tellus integer feugiat. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eget nunc lobortis mattis aliquam. Velit sed ullamcorper morbi tincidunt ornare. Dictum sit amet justo donec enim diam vulputate ut pharetra. Nunc mattis enim ut tellus. Enim lobortis scelerisque fermentum dui faucibus. Dolor sed viverra ipsum nunc aliquet bibendum. Ut sem nulla pharetra diam sit amet nisl. Bibendum neque egestas congue quisque. Erat imperdiet sed euismod nisi porta lorem mollis. Orci sagittis eu volutpat odio facilisis mauris sit amet massa. Integer enim neque volutpat ac tincidunt. Enim nulla aliquet porttitor lacus luctus. At erat pellentesque adipiscing commodo elit. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Aenean sed adipiscing diam donec adipiscing tristique.`,
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
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh venenatis cras sed felis eget. Ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi. Sem et tortor consequat id porta. Netus et malesuada fames ac turpis egestas. Varius sit amet mattis vulputate enim nulla aliquet. Ut consequat semper viverra nam libero justo laoreet sit. Justo laoreet sit amet cursus sit amet dictum. Duis at tellus at urna condimentum mattis pellentesque id nibh. Imperdiet nulla malesuada pellentesque elit eget. Viverra adipiscing at in tellus integer feugiat. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eget nunc lobortis mattis aliquam. Velit sed ullamcorper morbi tincidunt ornare. Dictum sit amet justo donec enim diam vulputate ut pharetra. Nunc mattis enim ut tellus. Enim lobortis scelerisque fermentum dui faucibus. Dolor sed viverra ipsum nunc aliquet bibendum. Ut sem nulla pharetra diam sit amet nisl. Bibendum neque egestas congue quisque. Erat imperdiet sed euismod nisi porta lorem mollis. Orci sagittis eu volutpat odio facilisis mauris sit amet massa. Integer enim neque volutpat ac tincidunt. Enim nulla aliquet porttitor lacus luctus. At erat pellentesque adipiscing commodo elit. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Aenean sed adipiscing diam donec adipiscing tristique.`,
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
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh venenatis cras sed felis eget. Ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquam eleifend mi. Sem et tortor consequat id porta. Netus et malesuada fames ac turpis egestas. Varius sit amet mattis vulputate enim nulla aliquet. Ut consequat semper viverra nam libero justo laoreet sit. Justo laoreet sit amet cursus sit amet dictum. Duis at tellus at urna condimentum mattis pellentesque id nibh. Imperdiet nulla malesuada pellentesque elit eget. Viverra adipiscing at in tellus integer feugiat. Et odio pellentesque diam volutpat commodo sed egestas egestas. Eget nunc lobortis mattis aliquam. Velit sed ullamcorper morbi tincidunt ornare. Dictum sit amet justo donec enim diam vulputate ut pharetra. Nunc mattis enim ut tellus. Enim lobortis scelerisque fermentum dui faucibus. Dolor sed viverra ipsum nunc aliquet bibendum. Ut sem nulla pharetra diam sit amet nisl. Bibendum neque egestas congue quisque. Erat imperdiet sed euismod nisi porta lorem mollis. Orci sagittis eu volutpat odio facilisis mauris sit amet massa. Integer enim neque volutpat ac tincidunt. Enim nulla aliquet porttitor lacus luctus. At erat pellentesque adipiscing commodo elit. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Aenean sed adipiscing diam donec adipiscing tristique.`,
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
