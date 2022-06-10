'use strict';



module.exports = (sequelize, DataTypes) => 
{
  var move = sequelize.define('move', {
		
		//this foriegn key must be done manully, sequelize can't make composite FK.
		visit_id: DataTypes.INTEGER,
		barcode: DataTypes.STRING, 

		type: {
			type: DataTypes.STRING(10),
			validate: {
				isIn: [['COUNT', 'SALE', 'RETURN']] }
		},
		expired_on: DataTypes.DATEONLY,
		count: {
			type:DataTypes.INTEGER,
			min:0,
			msg: "Don't enter any negative value" }
	}, 	
	{	});
	
	move.associate = function(models) 
	{
		console.log('move ass.......');
		// ALTER TABLE moves
		// ADD FOREIGN KEY (visit_id, barcode) REFERENCES lines(visit_id, barcode) 
		// on delete CASCADE;
		
	};
	
  return move;
};