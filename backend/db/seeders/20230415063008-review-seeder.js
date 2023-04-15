'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const {Review} = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        review: "This was a fun place to camp",
        stars: 5,
        userId: 1,
        spotId: 1
      },
      {
        review: "The lake at this place is very clean",
        stars: 3,
        userId: 2,
        spotId: 2
      },
    ], {});
  },

  // async up (queryInterface, Sequelize) {
  //   await Review.create({
  //   review: "This was a fun place to camp",
  //   stars: 5,
  //   userId: 1,
  //   spotId: 1
  //     })
  // },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ["This was a fun place to camp", "The lake at this place is very clean"] }
    }, {});
  }
};




/************************************************/

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