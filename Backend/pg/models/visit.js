'use strict';
module.exports = (sequelize, DataTypes) => {
  var visit = sequelize.define('visit', {
		customer_id: {
			type : DataTypes.INTEGER,
			unique: "daily_visit",
			allowNull: false, 
		},
		user_name: {
			type : DataTypes.STRING,
			unique: "daily_visit",
			allowNull: false, 
		},
		date: {
			type : DataTypes.DATEONLY,
			unique: "daily_visit",
			allowNull: false, 
		},
		track: DataTypes.STRING ,
		total_sales: DataTypes.REAL,
		collected_money: DataTypes.REAL,
		summary: DataTypes.STRING,		
		nextVisit: DataTypes.DATEONLY,
	}, 	{});
	
	visit.associate = function(models) {
		visit.belongsTo(models.user, { foreignKey: 'user_name'});
		models.user.hasMany( visit, { foreignKey: 'user_name'}	 );
		
		visit.belongsTo(models.customer, { foreignKey: 'customer_id'});
		models.customer.hasMany( visit, { foreignKey: 'customer_id'}	 );
	};
	
  return visit;
};