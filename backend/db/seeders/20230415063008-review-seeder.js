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
    review: "Love the lake", 
    stars: 4,
    userId: 1,
    spotId: 2
  },
  {
    review: "Cool", 
    stars: 3,
    userId: 1,
    spotId: 3
  },
  {
    review: "Bathroom stinks", 
    stars: 2,
    userId: 1,
    spotId: 4
  },
  {
    review: "Worst place I been too", 
    stars: 1,
    userId: 1,
    spotId: 5                                   //5
  },
  {
    review: "Would return again", 
    stars: 5,
    userId: 1,
    spotId: 6
  },
  {
    review: "Had a lot of fun!", 
    stars: 5,
    userId: 1,
    spotId: 7
  },
  {
    review: "This was a fun place to camp", 
    stars: 3,
    userId: 1,
    spotId: 8
  },
  {
    review: "Neightbors to loud and nobody to them to quiet down at night", 
    stars: 2,
    userId: 2,
    spotId: 1
  },
  {
    review: "This was a fun place to camp", 
    stars: 5,
    userId: 2,
    spotId: 2                                   //10
  },
  {
    review: "Family loved it", 
    stars: 4,
    userId: 2,
    spotId: 3
  },
  {
    review: "Trash all over the place", 
    stars: 1,
    userId: 2,
    spotId: 4
  },
  {
    review: "i would go again", 
    stars: 3,
    userId: 2,
    spotId: 5
  },
  {
    review: "AMAZING", 
    stars: 4,
    userId: 2,
    spotId: 6
  },
  {
    review: "BEST PLACE TO CAMP", 
    stars: 5,
    userId: 2,
    spotId: 7                                   //15
  },
  {
    review: "its alright", 
    stars: 3,
    userId: 2,
    spotId: 8
  },
  {
    review: "What a blast", 
    stars: 4,
    userId: 3,
    spotId: 1
  },
  {
    review: "Family loved this place", 
    stars: 4,
    userId: 3,
    spotId: 2
  },
  {
    review: "Kids loved it", 
    stars: 5,
    userId: 3,
    spotId: 3
  },
  {
    review: "FIVE STARS", 
    stars: 5,
    userId: 3,
    spotId: 4                                   //20
  },
  {
    review: "Could be better", 
    stars: 2,
    userId: 3,
    spotId: 5
  },
  {
    review: "This was a fun place to camp", 
    stars: 5,
    userId: 3,
    spotId: 6
  },
  {
    review: "Water is really dirty", 
    stars: 1,
    userId: 3,
    spotId: 7
  },
  {
    review: "Would return every year", 
    stars: 5,
    userId: 3,
    spotId: 8
  },
  {
    review: "This place was WOW", 
    stars: 4,
    userId: 4,
    spotId: 1                                   //25
  },
  {
    review: "Rude Employees", 
    stars: 2,
    userId: 4,
    spotId: 2
  },
  {
    review: "Not much to say, but fun", 
    stars: 3,
    userId: 4,
    spotId: 3
  },
  {
    review: "FUN", 
    stars: 4,
    userId: 4,
    spotId: 4
  },
  {
    review: "This was a fun place to camp", 
    stars: 5,
    userId: 4,
    spotId: 5
  },
  {
    review: "GREAT", 
    stars: 4,
    userId: 4,
    spotId: 6                                   //30
  },
  {
    review: "This was a fun place to camp", 
    stars: 5,
    userId: 4,
    spotId: 7
  },
  {
    review: "This was a fun place to camp", 
    stars: 5,
    userId: 4,
    spotId: 8
  },
  {
    review: "I give it three stars", 
    stars: 3,
    userId: 5,
    spotId: 1
  },
  {
    review: "TWO STARS, only because idk", 
    stars: 2,
    userId: 5,
    spotId: 2
  },
  {
    review: "FUN FUN FUN", 
    stars: 5,
    userId: 5,
    spotId: 3                                   //35
  },
  {
    review: "Would like to come back again", 
    stars: 3,
    userId: 5,
    spotId: 4
  },
  {
    review: "AMAZING place for the family", 
    stars: 5,
    userId: 5,
    spotId: 5
  },
  {
    review: "Great place for the kids", 
    stars: 4,
    userId: 5,
    spotId: 6
  },
  {
    review: "Not kid friendly", 
    stars: 1,
    userId: 5,
    spotId: 7
  },
  {
    review: "I highly recommend this place to ANYONE", 
    stars: 5,
    userId: 5,
    spotId: 8                                   //40
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
      spotId: { [Op.in]: ["1", "2", "3", "4", "5", "6", "7", "8"] }
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