import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CustomerService } from './customers.service';
import { UtilService } from '../services/util.service';
import { Customer, Contact, GoogleMapLocation } from './customer';
import { LoginService } from '../login-form/login.service';
import { Permission } from '../users/user';
import { NgForm, FormGroup, FormControl, FormArray, AbstractControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: []
})
export class CustomersComponent implements OnInit
{

	public customers:Customer[];
	public Permission = Permission;

	public customerForm:FormGroup;
	selectedCustomer: Customer = new Customer();
	private frm: HTMLFormElement;

	constructor(public customerService:CustomerService,
							private util:UtilService,
							public loginService:LoginService,
							private toast: ToastrService,
							private fb: FormBuilder)
	{ 
	}

	ngOnInit() 
	{
		this.frm = <HTMLFormElement> document.getElementById( 'frmCustomer' );
		this.resetForm();
		this.bringData();
	}
	
	bringData()
	{
		this.customerService.getCustomers()
		.subscribe( 
			data => {
				this.customers = data;
				this.customers.map(c => new Customer(c));
				this.customers.map(c => c.address = new GoogleMapLocation(c.address));
				this.customers.map(c => c.contacts = c.contacts.map( cn => cn = new Contact(cn) ) );
			},
			err => this.util.handleError(err)
		);
	}

	onSubmit(frm: FormGroup)
	{
		let c = this.selectedCustomer;
		//console.log(this.selectedCustomer);
		
		if(c.id == 0){
			this.customerService.insertCustomer(c)
					.subscribe( data => {
						this.toast.success(`${data.name} has been inserted successfully ` , 'Inserted !');
						this.resetForm();
						this.bringData();
					}, 
					err => this.util.handleError(err) 
				);
		}	else{
			this.customerService.updateCustomer(c).subscribe( 
					data => {
						this.util.handleUpdated(data, c.name);
						this.resetForm();
						this.bringData();
					},
					err => this.util.handleError(err)
			);
		}
	}//end onSubmit
	
	
	toggleEdit(csmr: Customer)
	{
		this.util.removeExtraElements();
		let row:HTMLTableRowElement = <HTMLTableRowElement> document.getElementById( csmr.id+'' );
		
		let editCell = this.util.addExtraRowAfterThis(row).insertCell();
		editCell.colSpan = 42;

		this.frm.hidden = false;
		editCell.appendChild( this.frm );
		
		this.resetForm();
	}

	toggleInsert()
	{
		
		this.util.removeExtraElements();

		let table = <HTMLTableElement> document.getElementById( 'tblCustomers' );
		let addCell = this.util.addExtraRowAfterThis( table.rows[table.rows.length-1] ).insertCell();
		addCell.colSpan = 42;

		this.frm.hidden = false;

		addCell.appendChild( this.frm );
		(<HTMLFormElement> this.frm.elements[0]).focus();
		
		this.resetForm();

	}

	closeAddEditForm(){
		this.selectedCustomer = new Customer(); //reset Form
		this.frm.hidden = true;
	}


	deleteCustomer(csmr: Customer)
	{
		this.customerService.deleteCustomer(csmr)
			.subscribe( data => {
				this.util.handleDeleted(data);
			},
				err => this.util.handleError(err)
		);
	}

	addContactToSelectedCustomer(){
		this.selectedCustomer.contacts.push(new Contact());
	}
	addPhoneNumber(cusCont:Contact){
		cusCont.lst.push('');
		console.log(this.selectedCustomer);
	}

	trackByFn(index, item) {
		return index;
 }

 resetForm(){
	let clean = new Customer() ;
	let c1 = new Contact(); c1.lst.push('');
	clean.contacts.push(c1);
	this.selectedCustomer = clean;
 }

}//end class


