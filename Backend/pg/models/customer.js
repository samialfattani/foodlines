'use strict';
module.exports = (sequelize, DataTypes) => {
  var customer = sequelize.define('customer', {
    name: DataTypes.STRING,
    address: DataTypes.JSON,
    contacts: DataTypes.ARRAY(DataTypes.JSON)
  }, {});
  customer.associate = function(models) {
    // associations can be defined here
  };
  return customer;
};