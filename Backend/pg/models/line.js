'use strict';

module.exports = (sequelize, DataTypes) => 
{
  var line = sequelize.define('line', {

		visit_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},

		barcode: {
			type: DataTypes.STRING,
			primaryKey: true,
		},

		unit_price: {
			type: DataTypes.REAL,
			min: 0,
			msg: "Don't enter any negative value", },

	}, 	{});
	
	line.associate = function(models) 
	{
		console.log('line ass.......');
		line.belongsTo(models.visit, { foreignKey: 'visit_id', onDelete: 'CASCADE'});
		line.belongsTo(models.item, { foreignKey: 'barcode'});
		
		models.visit.hasMany( line, { foreignKey: 'visit_id', onDelete: 'CASCADE'}	 );

		
	};
	
  return line;
};