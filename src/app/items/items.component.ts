import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Item } from './item';
import { ItmesService } from './itmes.service';
import { UtilService } from '../services/util.service';
import { LoginService } from '../login-form/login.service';
import { Permission } from '../users/user'
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
	styles: [],
	providers: [ItmesService]
})
export class ItemsComponent implements OnInit 
{

	items:Item[];
	categories:string[] = [];
	selectedItem: Item = new Item();
	Permission = Permission;
	
	constructor(
		public itemService:ItmesService, 
		public util: UtilService,
		private loginService:LoginService,
		private toast: ToastrService)
	{ 
		this.bringData();
		this.getAllCategories();
	}

  ngOnInit() { }

	bringData()
	{
		this.itemService.getItems().subscribe( 
			data => this.items = data.map(it => new Item(it)),
			err => this.util.handleError(err)
		);
	}

	onSubmit(frm: NgForm)
	{
		let c = this.selectedItem;		
		
		if( this.isNewRecord() ){
			this.itemService.insertItem(c).subscribe( 
					data => {
						this.util.handleInserted(data.desc);
						this.selectedItem = new Item(); //reset Form
						this.bringData();
					}, 
						err => this.util.handleError(err) 
				);
		}	else{
			this.itemService.updateItem(c).subscribe( 
					data => {
						this.util.handleUpdated(data,  c.desc);
						this.selectedItem = new Item(); //reset Form
						this.bringData();
					},
						err => this.util.handleError(err)
			);
		}
	}//end onSubmit

	delete(itm){
		this.itemService.deleteItem(itm)
			.subscribe( dbAnswer => {
				this.util.handleDeleted(dbAnswer);
				this.bringData();
				//this.toast.warning(`${itm.name} has been Deleted` , 'Deleted');
			},
				err => this.util.handleError(err)
		);		
	}

	itemsOfCat(c)
	{
		if(this.items == null)
			return null;

		return this.items.filter ( it => it.category ==  c);
	}

	itemsOfCat_count(c){
		if(this.items == null)
			return null;
		return this.items.filter ( it => it.category ==  c).length;
	}


	getAllCategories(){
		this.itemService.getAllCategories()
			.subscribe( data => {
				this.categories = data.map(cat => cat.name);
			},
				err => this.util.handleError(err)
		);
	}

	closeAddEditForm(){
		this.selectedItem = new Item(); //reset Form
		let frm = <HTMLFormElement> document.getElementById( 'frmItem' );
		frm.hidden = true;
	}

	toggleEdit(itm:Item)
	{
		let frm = document.getElementById( 'frmItem' );
		this.util.removeExtraElements();
		let row:HTMLTableRowElement = <HTMLTableRowElement> document.getElementById( itm.barcode+'' );
		
		let editCell = this.util.addExtraRowAfterThis(row).insertCell();
		editCell.colSpan = 42;

		frm.hidden = false;
		editCell.appendChild( frm );
		this.selectedItem = itm;
	}

	toggleInsert(cat: string)
	{
		let frm = <HTMLFormElement> document.getElementById( 'frmItem' );
		this.util.removeExtraElements();

		let table = <HTMLTableElement> document.getElementById( cat );
		let addCell = this.util.addExtraRowAfterThis( table.rows[table.rows.length-1] ).insertCell();
		addCell.colSpan = 42;

		frm.hidden = false;

		addCell.appendChild( frm );
		(<HTMLFormElement> frm.elements[0]).focus();
		
		this.selectedItem = new Item( {category : cat} );
	}

	isNewRecord():boolean{
		return this.selectedItem.createdAt?false:true;
	}

}//end class
