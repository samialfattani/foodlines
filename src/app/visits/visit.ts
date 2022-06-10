import { Customer } from "../customers/customer";
import { Item } from "../items/item";

export enum MoveType{
   COUNT = 'COUNT',
   SALE = 'SALE',
   RETURN = 'RETURN'
}

export class Move{
	 public id:number = 0;
   public type: MoveType = MoveType.COUNT;
   public barcode: string = '';
   public expired_on:Date = new Date();
	 public count:number = 0;
	 public visit_id:number = 0;

   constructor(o?:any){
      if(o){
				this.id = o.id;
        this.type = o.type;
        this.barcode = o.barcode;
        this.expired_on = o.expired_on;
				this.count = o.count; 
				this.visit_id = o.visit_id}
   }
}

export class Line{
	public visit_id:number = 0;
	public barcode: string = '';
	public unit_price:number = 0;
	public item:Item = new Item();

	constructor(o?:any){
		 if(o){
			this.visit_id = o.visit_id
			this.barcode = o.barcode;
			this.unit_price = o.unit_price;
			this.item = new Item(o.item)	}
	}
}


export class Visit
{
	public id:number;
	public customer_id:string = '';
	public user_name:string = '';
  public date:Date = new Date();
  public track:string = '';
  public moves: Move[];
  public total_sales: number;   
	public summary:string = '';
	public nextVisit:Date = new Date();
	public customer: Customer = new Customer();
	
	constructor(o?:any)
	{
      if(o){
				 this.id = o.id;
				 this.user_name = o.user_name;
         this.customer_id = o.customer_id;
         this.date = o.date;
         this.track = o.track;
         this.moves = o.moves;
         this.total_sales = o.total_sales;
         this.summary = o.summary;
				 this.nextVisit = o.nextVisit;
				 this.customer = o.customer}
	}


}//end class User 
