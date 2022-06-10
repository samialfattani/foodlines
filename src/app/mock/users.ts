
import { User, Permission } from '../users/user';



let adminRole = User.getAllPermissions();

let salesManRole = [
		Permission.CAN_READ_HIS_PROFILE,
		Permission.CAN_UPDATE_HIS_PROFILE,
		Permission.CAN_DELETE_HIS_PROFIEL,
		]
		//salesManRole = Array.from(salesManRole);

export const USERS: User[] = [
	new User({ name: '1', pw:'1', email:'a1@hotmail.com', permissions: adminRole }) ,
	new User({ name: 'admin', pw:'admin', email:'admin@hotmail.com', permissions: adminRole }) ,
	new User({ name: 'sami', pw:'123', permissions: adminRole  }) ,
  new User({ name: 'Narco', pw:'123', permissions: salesManRole }) ,
  new User({ name: 'Bombasto', pw:'123', permissions: salesManRole }) ,
  new User({ name: 'Celeritas', pw:'123', permissions: salesManRole }) ,
  new User({ name: 'Magneta', pw:'123', permissions: salesManRole }) ,
  new User({ name: 'RubberMan', pw:'123', permissions: salesManRole }) ,
  new User({ name: 'Dynama', pw:'123', permissions: salesManRole }) ,
  new User({ name: 'Dr IQ', pw:'123', permissions: salesManRole }) ,
  new User({ name: 'Magma', pw:'123', permissions: salesManRole }) ,
  new User({ name: 'Tornado', pw:'123', permissions: salesManRole }) 
];

/*
export const USERS: User[] = [
		new User('', '', '', adminRole),
		new User('1', '1','a1@hotmail.com', adminRole),
		new User('admin', 'admin', 'koko@shamel.com', adminRole),
		new User('sami', '123', 'koko@shamel.com', adminRole),
		new User('2', '2', 'koko@shamel.com', salesManRole),
		new User('Narco', '123', 'koko@shamel.com', salesManRole),
		new User('Bombasto', '123', 'koko@shamel.com', salesManRole),
		new User('Celeritas', '123', 'koko@shamel.com', salesManRole),
		new User('Magneta', '123', 'koko@shamel.com', salesManRole),
		new User('RubberMan', '123', 'koko@shamel.com', salesManRole),
		new User('Dynama', '123', 'koko@shamel.com', salesManRole),
		new User('DrIQ', '123', 'koko@shamel.com', salesManRole),
		new User('Magma', '123', 'koko@shamel.com', salesManRole),
		new User('Tornado', '123', 'koko@shamel.com', salesManRole),
];

*/
