import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-form/login.service';
import { Permission } from '../users/user';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { UtilService } from '../services/util.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.css']
})
export class SqlComponent implements OnInit 
{
	public Permission = Permission;
	public metaData;
	public jsonAsHTML;
	private tables;
	private views;
	private Current_Query:string = '';
	private PGdataType = PGdataType;

	constructor(
		public loginService: LoginService,
		private http: HttpClient,
		private util: UtilService
	) { }

	ngOnInit() 
	{
		this.Current_Query = "Select * from customers;";

		let q = {query : `select * from information_schema.tables
										where table_schema = 'public'
										and table_type = 'BASE TABLE';`};
		this.http.post<any>('http://localhost:3200/api/run/sql', q).subscribe( 
			data => this.tables = data.rows,
			err => this.util.handleError(err)
		);
		
		q = {query : `select * from information_schema.tables
										where table_schema = 'public'
										and table_type = 'VIEW'
										and table_name not like 'pg%';`};
		this.http.post<any>('http://localhost:3200/api/run/sql', q).subscribe( 
			data => this.views = data.rows,
			err => this.util.handleError(err)
		);
		
		
  }//onInit
	
	writeSelect(t){
		this.Current_Query = `SELECT * FROM ${t} WHERE 1=1;`
	}

	jsonPritty(json)
	{
		// The code snippet you want to highlight, as a string
		return JSON.stringify(json, null, 2);
	}

	onSubmit(frm: NgForm)
	{
		if( this.isJSON(frm.value.query) ){
			this.submitFinder(frm);
			this.metaData = null;
		}else{
			this.submitSQL(frm);
			this.jsonAsHTML = null;
		}

	}

	isJSON(jsonStr):boolean
	{
		try{
			JSON.parse (jsonStr);
			return true;
		}catch(e){
			return false;
		}
		
	}
	
	submitFinder(frm: NgForm)
	{
		let qry = JSON.parse(frm.value.query);
		this.http.post<any>(`${environment.baseURL}api/run/finder`, qry).subscribe( 
			data => {				
				console.log(data);
				console.table(data);
				let tableify = require('tableify');
				this.jsonAsHTML = tableify(data);

			},
			err => this.util.handleError(err)
		);
	}
	
	submitSQL(frm: NgForm)
	{
		this.http.post<any>(`${environment.baseURL}api/run/sql`, frm.value).subscribe( 
			data => {
				this.metaData = data;
				console.log(this.metaData);
			},
			err => this.util.handleError(err)
		);
	}

}//end class

export enum PGdataType{
	DATE = 1184,
	JSON = 114,
	LIST = 1007,
	LIST_OF_JSON = 199,
	
}