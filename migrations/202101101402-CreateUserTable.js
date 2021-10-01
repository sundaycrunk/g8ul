// this will somehow access psql
// and create a user table. similarly to how we did the leads table.
'use strict';
module.exports = {
  // an export key called up.
  // which is itself a function that takes a queryInterface.
  // possibly this is a thing that's inside the terminal. smth to do with
  // the brew psql config.
  // it will also take a Sequelize object, instance, or configuration.

  up: (queryInterface, Sequelize) => {
    // it will instantly return this.
    // at the queryInterface. referring to psql, createTable.
    // maybe this shit works with mysql etc too.
    // and it will create the users Table.
    return queryInterface.createTable('Users', {
      // and it will make these parameters/column definitions for the table.
      // id can't be null....
      // ...
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      // need to know when it was created and updated at.
      createdAt: {
        allowNull: false,
        // sequelize date object. builtin to sqlize.
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      username: {
        // can be null.
        allowNull: true,
        type: Sequelize.STRING
      },
      firstname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lastname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
      	allowNull: false,
      	type: Sequelize.STRING
      },
    })
  },
  // so there's a down key which is a function.
  // and this, when called, will take the same params, 
  // and down will use the queryInterface to drop the table called Users.
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
