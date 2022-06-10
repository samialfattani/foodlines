import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login-form/login.service';
import { Visit } from './visit';
import { UtilService } from '../services/util.service';
import { User, Permission } from '../users/user';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../customers/customer';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit 
{

	public selectedVisit: Visit = new Visit();
	public filteredVisitsByDate ;
	public routedUser: string;
	public Permission = Permission;
	public customerList: Customer[];

  constructor(
		private rout: ActivatedRoute,
		private http: HttpClient, 
		public loginService: LoginService,
		public util: UtilService)
	{ 
		let today = new Date('2018-05-09');
		let yesterday = new Date( new Date(today).setDate(today.getDate() -1) );
		let justDate = new Date('2018-05-10');
		this.filteredVisitsByDate = [
			{title: "Today's Visits", 		date: today, visits: [], id:'visitsOfToday' }, 
			{title: "Yesterday's Visits",	date: yesterday, visits: [], id:'visitsOfYesterday' }, 
			{title: "Visits of", 				date: '*',   visits: [], id:'visitsOfSomeday' }
		];

	}

	ngOnInit()
	{  
		//read parameters
		this.rout.paramMap.subscribe( params => 
			{
				this.routedUser = params.get('name');
				this.bringData();	
			});			
	}

	bringData()	
	{		
		//${environment.baseURL}api/users/admin/visits/qry/bydate/:date
		//2018-04-08T17:47:43.510Z
		//2018-05-08T04:30:30.000Z
		for(let visitGroup of this.filteredVisitsByDate)
		{
			let dt = JSON.stringify(visitGroup.date).replace('"', '').replace('"', '');
			this.http.get<Visit[]>(`${environment.baseURL}api/users/${this.routedUser}/visits/qry/bydate/${dt}`)
			.subscribe(
				visits => visitGroup.visits = visits.map( v => new Visit(v) ),
				err => this.util.handleError(err)
			);
		}
		let qry = { 
			"model": "customer",
			"finder": { "attributes": ["id", "name"] }
		};
		this.http.post<Customer[]>(`${environment.baseURL}api/run/finder`, qry)
		.subscribe(
			cus => this.customerList	= cus.map( v => new Customer(v) ),
			err => this.util.handleError(err)
		);
	
	}//end bringData()

	onSubmit()
	{
		let vst = this.selectedVisit;		
		let frm1 = <HTMLFormElement> document.getElementById( 'frmVisit' );		
		
		
		if( this.isNewRecord() ){
			this.http.post<Visit>(`${environment.baseURL}api/users/${this.routedUser}/visits` , vst).subscribe( 
					data => {
						this.util.handleInserted('New Visit');
						this.selectedVisit = new Visit(); //reset Form						
						this.bringData();
						frm1.hidden = true;
					}, 
						err => this.util.handleError(err) 
				);
		}	else{
			this.http.put<any>(`${environment.baseURL}api/users/${this.routedUser}/visits/` + vst.id, vst)
				.subscribe( 
					data => {
						this.util.handleUpdated(data,  'This Visit');
						this.selectedVisit = new Visit(); //reset Form
						this.bringData();
						frm1.hidden = true;
					},
					err => this.util.handleError(err)  
			);
		}
	}//end onSubmit

	delete(vst)
	{
		this.http.delete<any>(`${environment.baseURL}api/users/${this.routedUser}/visits/` + vst.id)
			.subscribe( dbAnswer => {
				this.util.handleDeleted(dbAnswer);
				this.bringData();
			},
			err => this.util.handleError(err)
		);		
	}


	closeAddEditForm(){
		this.selectedVisit = new Visit(); //reset Form		
		let frm1 = <HTMLFormElement> document.getElementById( 'frmVisit' );		
		frm1.hidden = true;
	}

	toggleEdit(vst:Visit)
	{
		let frm = <HTMLFormElement> document.getElementById( 'frmVisit' );
		this.util.removeExtraElements();
		let row:HTMLTableRowElement = <HTMLTableRowElement> document.getElementById( vst.id+'' );
		
		let editCell = this.util.addExtraRowAfterThis(row).insertCell();
		editCell.colSpan = 42;

		frm.hidden = false;
		editCell.appendChild( frm );
		this.selectedVisit = vst;
	}

	toggleInsert(tableID: string)
	{
		let frm = <HTMLFormElement> document.getElementById( 'frmVisit' );
		this.util.removeExtraElements();

		let table = <HTMLTableElement> document.getElementById( tableID );
		let addCell = this.util.addExtraRowAfterThis( table.rows[table.rows.length-1] ).insertCell();
		addCell.colSpan = 42;
		
		frm.hidden = false;
		addCell.appendChild( frm );
		(<HTMLFormElement> frm.elements[0]).focus();
		
		//don't reset the form here, otherwise the last refernce will be affected.
		let dt = this.filteredVisitsByDate.filter( e => e.id == tableID)[0].date		
		this.selectedVisit = new Visit( {date : dt, user_name: this.routedUser} );
	}

	isNewRecord():boolean{
		return this.selectedVisit.id?false:true;
	}
	
}//END CLASS
