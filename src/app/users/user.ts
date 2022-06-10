import { Visit } from "../visits/visit";

export enum Permission{
		CAN_READ_ALL_USERS =1,
		CAN_INSERT_ANY_USER =2,
		CAN_UPDATE_ANY_USER =3,
		CAN_UPDATE_PERMISSIONS_ANY_USER =5,
		CAN_DELETE_ANY_USER =4,
		
		CAN_READ_HIS_PROFILE=11,
		CAN_UPDATE_HIS_PROFILE=12,
		CAN_DELETE_HIS_PROFIEL=13,
		
		CAN_READ_ALL_CUSTOMERS=21,
		CAN_INSERT_CUSTOMER=22,
		CAN_UPDATE_CUSTOMER=23,
		CAN_DELETE_CUSTOMER=24,

		CAN_READ_ALL_ITEMS=31,
		CAN_INSERT_ITEM=32,
		CAN_UPDATE_ITEM=33,
		CAN_DELETE_ITEM=34,

		
		CAN_READ_ALL_VISITS=41,		
		CAN_DELETE_ALL_VISITS=46,
		
		CAN_READ_HIS_VISITS=45,
		CAN_INSERT_HIS_VISITS=42,
		CAN_UPDATE_HIS_VISITS=43,
		CAN_DELETE_HIS_VISITS=44,
		

		SETTING_ADMINISTRATION=99,
		SQL=100
	}

export class User 
{
	public name:string;
	public email:string;
	public pw:string;
	public daily_target:number;
	public monthly_target: number;
	private _permissions:Set<number>;
	
	constructor(o:any)
	{	
		this.name = o.name;
		this.email = o.email;
		this.pw = o.pw;
		this._permissions = new Set(o.permissions);
		this.daily_target = o.daily_target;
		this.monthly_target = o.monthly_target;
	}

	get permissions():number[]{
		return Array.from(this._permissions);
	}
	set permissions(o: number[]){
		this._permissions = new Set(o);
	}
	addPermission(p:Permission){
		this._permissions.add(p);
	}
	deletePermission(p:Permission){
		this._permissions.delete(p);
	}

	getNotPermissions(){
		return User.getAllPermissions().filter( e => {
			return this.permissions.indexOf(e) < 0 ;
		});
	}
	
	isHasPermission(p):boolean {
		return this.permissions.indexOf(p) >= 0;
	}

	getPermissionsAsText():string
	{
		return this.permissions
							 .sort( (a,b) => a-b )
							 .map(p => Permission[p].toLowerCase())
							 .join(', ');
	}
	
	
	static getAllPermissions():number[]
	{
		const keys = Object.keys(Permission).filter(k => typeof Permission[k] === "number"); // ["A", "B"]
		const values = keys.map(k => parseInt(Permission[k]) ); // [0, 1]
		return values;
	}

	static getSimpleRole():number[]
	{
		const values = [
			Permission.CAN_READ_HIS_PROFILE,
			Permission.CAN_UPDATE_HIS_PROFILE,
			Permission.CAN_DELETE_HIS_PROFIEL
		]
		return values;
	}

}//end class User 
