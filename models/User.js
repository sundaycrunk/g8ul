/* jshint indent: 2 */

// this will be like a template to create a user account in psql db.
'use strict'
// i think it's referring to this module. User.js.
// it will get passed a sequelize config, and some specd datatypes.
// so looks like it wants to check whether it's a valid user.
// it will reference the datatypes passed & ensure that they are correct.
module.exports = (sequelize, DataTypes) => {
  // and we'll export a variable called User.
  var User = sequelize.define('User', {
    // which will be a sequelize instance,
    // conaining these keys.
    // the id will need to be type of UUID.
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      // don't allow it to be null.
      // if it's null, don't create a User.
      allowNull: false,
      // it will be the primary key.
      primaryKey: true
    },
    username: {
      // username needs to be a string. and it can be null.
      type: DataTypes.STRING,
      allowNull: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      // cannot be null.
      allowNull: false,
      // email has to be unique
      unique: true
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  })
  return User
}
