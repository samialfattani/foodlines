'use strict';
module.exports = (sequelize, DataTypes) => {
  var category = sequelize.define('category', {
    type: {
			type: DataTypes.STRING,
			unique: "cat"
		},
    name: {
			type: DataTypes.STRING,
			unique: "cat"
		},
    desc: DataTypes.STRING
	}, 
	{});
  category.associate = function(models) {
		//associations can be defined here
  };
  return category;
};