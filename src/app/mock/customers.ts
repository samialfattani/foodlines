import { Customer, GoogleMapLocation, Contact } from "../customers/customer";


export const CUSTOMERS: Customer[] = 
[
	new Customer({name:'Danoup', address:new GoogleMapLocation({lat:21.6102211, lng:39.1595697}), 
	contact:[
		new Contact( { name:'Mr. Ahmed', lst:['Ahmed@danoup.com','0564599127'] } ), 
		new Contact( { name:'Mr. Sami', lst:['Dalal@danoup.com','0509465187'] }),
		new Contact( { name:'Mr. Dalal', lst:['Dalal-2@danoup.com','+966509465187'] } ) 
	]}),

	new Customer({name:'Banda', address:new GoogleMapLocation({lat:21.45, lng:31.555}), 
		contact:[
			new Contact( { name:'kamil', lst:['kamil@danoup.com','0564599185'] } ), 
			new Contact( { name:'saleem almana', lst:['saleem@gmail.com','05632711654'] })
		]
	}),

	new Customer({name:'Abusori', address:new GoogleMapLocation({lat:21.45, lng:31.555}), 
		contact:[
			new Contact( { name:'Rabih ali', lst:['Rabih@gmail.com','0564592357'] })
		]
	}),

	new Customer({name:'Marko', address:new GoogleMapLocation({lat:21.45, lng:31.555}), 
		contact:[
			new Contact( { name:'Rakan abu Rami', lst:['Ahmed@gmail.com','0564994427'] }), 
			new Contact( { name:'Kumar Saleem', lst:['0561234564'] })
		]
	}),

	new Customer({name:'Saber', address:new GoogleMapLocation({lat:21.45, lng:31.555}), 
		contact:[
			new Contact( { name:'Mohammed Hammad', lst:['056222127'] })
		]
	})
];

	// new Customer(1, 'Danoup', new GoogleMapLocation(21.6102211, 39.1595697), 
	// 					[new Contact( 'Mr. Ahmed', ['Ahmed@danoup.com','0564599127'] ), 
	// 					 new Contact( 'Mr. Sami', ['Dalal@danoup.com','0509465187'] ) ,
	// 					 new Contact( 'Mr. Dalal', ['Dalal-2@danoup.com','+966509465187'] ) ]),
	// new Customer(2, 'Banda', new GoogleMapLocation(21.45, 31.555), 
	// 					[new Contact( 'kamil', ['kamil@danoup.com','0564599185'] ), 
	// 					 new Contact( 'saleem almana', ['saleem@gmail.com','05632711654'] ) ]),
	// new Customer(3, 'Abusori', new GoogleMapLocation(21.45, 31.555), 
	// 					[new Contact( 'Rabih ali', ['Rabih@gmail.com','0564592357'] ) ]),
	// new Customer(4, 'Marko', new GoogleMapLocation(21.45, 31.555), 
	// 					[new Contact( 'Rakan abu Rami', ['Ahmed@gmail.com','0564994427']), 
	// 					 new Contact( 'Kumar Saleem', ['0561234564'] ) ]),
	// new Customer(5, 'Saber', new GoogleMapLocation(21.45, 31.555), 
	// 					[new Contact( 'Mohammed Hammad', ['056222127'] ) ])
