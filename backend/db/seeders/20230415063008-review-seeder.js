'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const {Review} = require("../models");

const data = [
  {
    review: "This was a fun place to camp",
    stars: 5,
    userId: 1,
    spotId: 1
  },
  {
    review: "decent",
    stars: 3,
    userId: 2,
    spotId: 1
  },
  {
    review: "an alright place",
    stars: 2,
    userId: 3,
    spotId: 1
  },
  {
    review: "This was a fun place to camp",
    stars: 2,
    userId: 3,
    spotId: 1
  },
  {
    review: "The lake at this place is very clean",
    stars: 5,
    userId: 4,
    spotId: 5
  },
  {
    review: "The lake at this place is very clean",
    stars: 3,
    userId: 2,
    spotId: 8
  },
  {
    review: "The lake at this place is very clean",
    stars: 5,
    userId: 4,
    spotId: 7
  },
  {
    review: "The lake at this place is very clean",
    stars: 5,
    userId: 1,
    spotId: 4
  },
  {
    review: "The lake at this place is very clean",
    stars: 2,
    userId: 2,
    spotId: 3
  },
  {
    review: "The lake at this place is very clean",
    stars: 5,
    userId: 3,
    spotId: 5
  },
  {
    review: "The lake at this place is very clean",
    stars: 3,
    userId: 4,
    spotId: 2
  },
]

module.exports = {
  // up: async (queryInterface, Sequelize) => {
  //   options.tableName = 'Reviews';
  //   return queryInterface.bulkInsert(options, [
  //     {
  //       review: "This was a fun place to camp",
  //       stars: 5,
  //       userId: 1,
  //       spotId: 1
  //     },
  //     {
  //       review: "The lake at this place is very clean",
  //       stars: 3,
  //       userId: 2,
  //       spotId: 2
  //     },
  //   ], {});
  // },

  async up (queryInterface, Sequelize) {
    for(let i = 0; i < data.length; i++) {
      let dataObj = data[i];
      await Review.create(dataObj)
    }
  },
 
  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ["This was a fun place to camp", "The lake at this place is very clean"] }
    }, {truncate: true, restartIdentity: true});
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