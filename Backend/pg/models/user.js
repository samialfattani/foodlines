
'use strict';

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
		name: {		
			type: DataTypes.STRING,
			primaryKey: true,
			validate:{
				is: {
					args: ["^[a-z][a-z0-9\-]{2,}[a-z0-9]$",'i'],
					msg: "Username Must be 4 litters or more, and starts with a litter"}
			}
		},
		email: DataTypes.STRING,
		pw: DataTypes.STRING,
		daily_target: DataTypes.REAL,
		monthly_target: DataTypes.REAL,
		permissions:DataTypes.ARRAY(DataTypes.INTEGER),
		active: DataTypes.BOOLEAN
	}, 
	{});

  user.associate = function (models){
    //user.hasMany(models.visit);
	};
	
  return user;
};