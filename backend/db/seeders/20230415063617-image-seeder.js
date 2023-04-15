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
        imageableType: "Spots",
        imageableId: 1
      },
      {
        url: "www.IGuessThisIsAnImage.com",
        preview: false,
        imageableType: "Reviews",
        imageableId: 2
      },
    ], {});
  },

  // async up (queryInterface, Sequelize) {
  //   await Image.create({
  //     url: "www.thisimage.com",
  //     preview: true,
  //     imageableType: "Spot",
  //     imageableId: 1
  //   },)
  // },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Images';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ["www.thisimage.com", "www.IGuessThisIsAnImage.com"] }
    }, {});
  }
};





















/******************************************************* */



// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };