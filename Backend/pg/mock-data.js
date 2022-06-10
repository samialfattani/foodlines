
/* jshint esversion:6 */

let db = require('./models/index');

let now = new Date().toUTCString();

module.exports = () => 
{

	return db.sequelize.sync({force:true})
	.then( () => {
		console.log('-------- All tables are created ! --------------');
	})
	.then( () => {return insertCustomers();} )
	.then( () => {console.log('\n---- Customers created ! ----\n');} )
	.then( () => {return insertItems();} )
	.then( () => {console.log('\n---- Items created ! ----\n');} )
	.then( () => {return insertCategories();} )
	.then( () => {console.log('\n---- Categories created ! ----\n');} )
	.then( () => {return insertUsers();} )
	.then( () => {console.log('\n---- Users created ! ----\n');} )
	.then( () => {return insertVisits	();} )
	.then( () => {console.log('\n---- Vists created ! ----\n');} )
	.then( () => {return insertLines	();} )
	.then( () => {console.log('\n---- Lines created ! ----\n');} )
	.then( () => {return insertMoves	();} )
	.then( () => {console.log('\n---- Moves created ! ----\n');} )
	
	.catch( err => console.log(err) );
};

insertUsers = () => 
{
	return db.user.bulkCreate([
			{ name: '1', pw:'1', email:'a1@hotmail.com', daily_target:500, monthly_target: 10000, permissions: [11, 12, 13] },
			{ name: 'admin', pw:'admin', email:'admin@hotmail.com', daily_target:500, monthly_target: 10000, 
			permissions: [11,12,13,1,2,3,5,4,21,22,23,24,31,32,33,34,99,41,45,42,43,44,100]  },
			{ name: 'sami', pw:'123', daily_target:500, monthly_target: 10000, permissions: [11, 12, 13]   },
			{ name: 'Amin', pw:'1', daily_target:500, monthly_target: 10000, permissions: [1, 2, 3]   },
			{ name: 'Meme', pw:'1', daily_target:500, monthly_target: 10000, permissions: [1, 2, 3]   },
		]);
};

insertCustomers = () => 
{
		return db.customer.bulkCreate(
		[ 
			{
				name:'Danoup',  
				address: {lat:21.45, lng:31.555} ,			
				createdAt: now, updatedAt: now,
				contacts:[
					{ name:'Mr. Ahmed', lst:['Ahmed@danoup.com','0564599127'] }, 
					{ name:'Mr. Sami', lst:['Dalal@danoup.com','0509465187'] },
					{ name:'Mr. Dalal', lst:['Dalal-2@danoup.com','+966509465187'] }
				]
			},
			
			{name:'Banda', address:{lat:21.45, lng:31.555}, 
			 createdAt: now, updatedAt: now,
			 contacts: [
					{ name:'kamil', lst:['kamil@danoup.com','0564599185'] }, 
					{ name:'saleem almana', lst:['saleem@gmail.com','05632711654'] },
				]				
			},
		
			{name:'Abusori', address:{lat:21.45, lng:31.555}, 
			 createdAt: now, updatedAt: now,
				contacts:[
					{ name:'Rabih ali', lst:['Rabih@gmail.com','0564592357'] }
				], 				
			},
		
			{name:'Marko', address:{lat:21.45, lng:31.555}, 
			 createdAt: now, updatedAt: now,
				contacts:[
					{ name:'Rakan abu Rami', lst:['Ahmed@gmail.com','0564994427'] }, 
					{ name:'Kumar Saleem', lst:['0561234564'] }
				], 
			},
		
			{name:'Saber', address:{lat:21.45, lng:31.555}, 
			 createdAt: now, updatedAt: now,
				contacts:[
					{ name:'Mohammed Hammad', lst:['056222127'] }
				], 
			},
			
		]);
};

insertItems = () => 
{
	return db.item.bulkCreate(
		[ 
			{barcode:'9911', desc:'فور سوداني 12 جم', unit_price:5, category: "TAM_TAM"},
			{barcode:'9912', desc:'مشكل 20 جم', unit_price:5, category: "TAM_TAM"},

			{barcode:'9921', desc:'جبنة 40 جم', unit_price:5, category:  "BLONZY_CHIPS"},
			{barcode:'9922', desc:'كاتشب 40 جم', unit_price:5, category: "BLONZY_CHIPS"},
			{barcode:'9923', desc: 'ملح وخل 40 جم', unit_price:5, category: "BLONZY_CHIPS"},

			{barcode:'9931', desc:'دوار شمس 25 جم', unit_price:5, category: "BLONZY_OTHER"},
			{barcode:'9932', desc:'سوبر 18 جم', unit_price:5, category: "BLONZY_OTHER"},
			{barcode:'9933', desc:'مكسرات مشكل سوبر', unit_price:5, category: "BLONZY_OTHER"},
		]);
};

insertCategories = () => 
{
	return db.category.bulkCreate(
		[ 
			{type:"item", name:"TAM_TAM"},
			{type:"item", name:"BLONZY_CHIPS"},
			{type:"item", name:"BLONZY_OTHER"},
			{type:"nationality", name:"saudi", desc:'Kingdom of Saudi Arabia'},			
		]);
	
};

insertVisits = () => 
{
	return db.visit.bulkCreate(
		[ 
			{customer_id: 1, user_name:"admin", total_sales:100, date:new Date(2018,4,8) },
			{customer_id: 1, user_name:"admin", total_sales:210, date:new Date(2018,4,9)},
			{customer_id: 1, user_name:"admin", total_sales:110, date:new Date(2018,4,11)},
			{customer_id: 2, user_name:"admin", total_sales:160, date:new Date(2018,4,8)},
			{customer_id: 2, user_name:"admin", total_sales:220, date:new Date(2018,4,9)},
			{customer_id: 2, user_name:"admin", total_sales:330, date:new Date(2018,4,11)},
			{customer_id: 3, user_name:"sami", total_sales:220, date:new Date(2018,4,9)},
			{customer_id: 2, user_name:"sami", total_sales:330, date:new Date(2018,4,9)},
			{customer_id: 4, user_name:"sami", total_sales:330, date:new Date(2018,4,9)},
			
		]);
	
};

insertLines = () => 
{
	return db.line.bulkCreate(
		[ 
			{visit_id: 1, barcode:'9911', unit_price:4.2},
			{visit_id: 1, barcode:'9912', unit_price:4.3},
			{visit_id: 1, barcode:'9921', unit_price:4.4},
			{visit_id: 1, barcode:'9932', unit_price:4.5},

			{visit_id: 2, barcode:'9911', unit_price:4.2},
			{visit_id: 2, barcode:'9912', unit_price:4 },
			{visit_id: 2, barcode:'9921', unit_price:4},

			{visit_id: 9, barcode:'9911', unit_price:4},
		]);
};

insertMoves = () => 
{
	return db.move.bulkCreate(
		[ 
			{visit_id: 1, barcode:'9911', type: 'SALE', expired_on:new Date(2020,4,18), count:10},
			{visit_id: 1, barcode:'9911', type: 'SALE', expired_on:new Date(2022,4,18), count:10},
			{visit_id: 1, barcode:'9912', type: 'SALE', expired_on:new Date(2020,4,18), count:10},
			{visit_id: 1, barcode:'9921', type: 'SALE', expired_on:new Date(2020,4,18), count:10},

			{visit_id: 2, barcode:'9911', type: 'COUNT', expired_on:new Date(2020,4,18), count:4},
			{visit_id: 2, barcode:'9911', type: 'COUNT', expired_on:new Date(2022,4,18), count:7},
			{visit_id: 2, barcode:'9911', type: 'SALE', expired_on:new Date(2019,4,18), count:9},
			{visit_id: 2, barcode:'9911', type: 'SALE', expired_on:new Date(2020,4,18), count:9},
			{visit_id: 2, barcode:'9912', type: 'COUNT',  count:2},
			{visit_id: 2, barcode:'9921', type: 'COUNT',  count:2},

			{visit_id: 3, barcode:'9911', type: 'SALE', expired_on:new Date(2020,4,18), count:10},
			{visit_id: 3, barcode:'9911', type: 'SALE', expired_on:new Date(2022,4,18), count:10},
			{visit_id: 3, barcode:'9911', type: 'COUNT', count:7},
		]);
};
