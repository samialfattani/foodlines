

//https://www.google.com.sa/maps/@21.6102211,39.1595697,14z?hl=ar

export class GoogleMapLocation {
	public lat:number=0;
	public lng:number=0;
	
	constructor(o?:any){
		if(o){
		this.lat = o.lat;
		this.lng = o.lng;}
	}

	getGoogleMapURL(){
		return `https://maps.google.com/?q=${this.lat},${this.lng}`;
	}
}

export class Contact
{
	public name:string = ''; 
	public lst:string[] = [];
	
	constructor(o?:any)
	{
		if(o){
			this.name = o.name;
			this.lst = o.lst;	}
	}
}

export class Customer
{
	public id:number=0;
	public name:string='';
	public address:GoogleMapLocation = new GoogleMapLocation();
	public contacts: Contact[] = [];
	public createdAt:Date;
	public updatedAt:Date;

	constructor(o?: any){
		if(o){
			this.id = o.id;
			this.name = o.name;
			this.address = o.address; 
			this.contacts = o.contact;
			this.createdAt = o.createdAt;
			this.updatedAt = o.updatedAt;}
	}

}

