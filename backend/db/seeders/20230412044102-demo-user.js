'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: "Demo",
        lastName: "User",
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: "Jack",
        lastName: "Frost",
        email: 'jfrost@user.io',
        username: 'JackUser',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: "Mike",
        lastName: "Jones",
        email: 'mjones@user.io',
        username: 'WhoMikeJones',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: "John",
        lastName: "Doe",
        email: 'jdoe@user.io',
        username: 'thisIsMyUserName',
        hashedPassword: bcrypt.hashSync('password3456346636')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'thisIsMyUserName'] }
    }, {});
  }
};