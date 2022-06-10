
export class Item
{
	public barcode:string;
	public desc:string='';
	public unit_price:number;
	public category:string = '';
	public createdAt:Date;
	public updatedAt:Date;
	

	constructor(o?:any){
		if(o){
			this.barcode = o.barcode;
			this.desc = o.desc;
			this.unit_price = o.unit_price;
			this.category = o.category;
			this.createdAt = o.createdAt;
			this.updatedAt = o.updatedAt;}
	}

}
