'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const {Booking} = require("../models");

const data = [    
    {
      startDate: new Date("2023-05-20"),
      endDate: new Date("2023-05-22"),
      // startDate: new Date("2023", "05", "22"),
      // endDate: new Date("2023", "05", "24"),
      userId: 1,
      spotId: 1
    },
    {
      startDate: new Date("2023-06-22"),
      endDate: new Date("2023-06-24"),
      userId: 2,
      spotId: 2
    },
    {
      startDate: new Date("2023-08-02"),
      endDate: new Date("2023-08-04"),
      userId: 3,
      spotId: 2
    },
    {
      startDate: new Date("2023-07-22"),
      endDate: new Date("2023-07-24"),
      userId: 2,
      spotId: 1
    },
    {
      startDate: new Date("2023-04-22"),
      endDate: new Date("2023-04-24"),
      userId: 3,
      spotId: 5
    },
    {
      startDate: new Date("2024-01-12"),
      endDate: new Date("2024-01-14"),
      userId: 4,
      spotId: 8
    },
    {
      startDate: new Date("2023-07-04"),
      endDate: new Date("2023-07-07"),
      userId: 1,
      spotId: 7
    },
    {
      startDate: new Date("2023-06-18"),
      endDate: new Date("2023-06-20"),
      userId: 4,
      spotId: 5
    }
]


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, data, {});
  },

  // async up (queryInterface, Sequelize) {
  //   for(let i = 0; i < data.length; i++) {
  //     let dataObj = data[i];
  //     await Booking.create(dataObj)
  //   }
  // },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: [
        new Date("2023-05-20"),
        new Date("2023-06-22"),
        new Date("2023-08-02"),
        new Date("2023-07-22"),
        new Date("2023-04-22"),
        new Date("2024-01-12"),
        new Date("2023-07-04"),
        new Date("2023-06-18")
      ] }
    }, {truncate: true, restartIdentity: true});
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

