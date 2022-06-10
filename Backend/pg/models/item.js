'use strict';

module.exports = (sequelize, DataTypes) => {
  var item = sequelize.define('item', {
		barcode: {		
			type: DataTypes.STRING,
			primaryKey: true,
			isNumeric: true,
		},
		desc: DataTypes.STRING,
		unit_price: {
			type: DataTypes.STRING,
			min:0
		},
		category: DataTypes.STRING
	}, {});

  item.associate = function(models) {
    // associations can be defined here
	};
	
  return item;
};