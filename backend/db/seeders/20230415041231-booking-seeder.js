'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const {Booking} = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      // {
      //   startDate: "2023/05/11",
      //   endDate: "2023/06/02",
      //   userId: 1,
      //   spotId: 1
      // },
      {
        startDate: "2024/01/03",
        endDate: "2024/02/07",
        userId: 2,
        spotId: 2
      },
    ], {});
  },

  // async up (queryInterface, Sequelize) {
  //   await Booking.create({
  //           startDate: "2023/05/11",
  //           endDate: "2023/06/02",
  //           userId: 1,
  //           spotId: 1
  //     })
  // },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ["2023/05/11", "2024/01/03"] }
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

