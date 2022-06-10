import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Permission } from '../users/user';
import { LoginService } from '../login-form/login.service';
import { UsersService } from '../users/users.service';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../services/util.service';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
	styles: [],
	providers:[DatePipe]
})
export class DashboardComponent implements OnInit 
{
	public Permission = Permission;

	constructor(
		public loginService:LoginService,
		private http:HttpClient,
		private util: UtilService,
		private datePipe: DatePipe) 
	{
		
	}//end constructor
	
	
	ngOnInit() 
	{ 

		this.getUsersCount();
		this.calculateTarget();

	}

	public counters = [];

	getUsersCount()
	{
		let today = this.datePipe.transform(new Date() ,'yyyy-MM-dd');
		let qry = { 
			"query": `
					SELECT 'users' item, 	'fas fa-user text-primary' af_icon, 'CAN_READ_ALL_USERS' permission, count(*) count, '1' sorting FROM users
				UNION(
					SELECT 'customers', 	'fas fa-warehouse text-primary', 'CAN_READ_ALL_CUSTOMERS', count(*) count, '2' sorting FROM customers) 
				UNION(
					SELECT 'items', 			'far fa-list-alt text-primary', 'CAN_READ_ALL_ITEMS', count(*) count, '3' sorting FROM items) 
				UNION(
					SELECT 'visits', 			'fas fa-clipboard-check text-primary', 'CAN_READ_HIS_VISITS', count(*) count, '4' sorting FROM visits)
				UNION(
					SELECT 'visits_today','fas fa-clipboard-list text-primary', 'CAN_READ_HIS_VISITS', count(*) count, '5' sorting  FROM visits WHERE date = '${today}')
				ORDER BY sorting
				`
		};

		this.http.post<any>(`${environment.baseURL}api/run/sql`, qry)
			.subscribe( 
				data => { 
					this.counters = data.rows;
					//filters with only premitted rows.
					this.counters = this.counters.filter(e => {
						return this.loginService.checkUserPermission( Permission[ `${e.permission}` ] );
					} );
				},
				err => { err => this.util.handleError(err); }
			);
			
	}//count

	total_sales_today = 0;	
	total_sales_this_month = 0;
	today_percent = 0;
	this_month_percent = 0;

	calculateTarget()
	{
		let today = this.datePipe.transform(new Date() ,'yyyy-MM-dd');
		let thisMonth = this.datePipe.transform(new Date() ,'MM');
		let qry = { 
			"query": `
				SELECT '1' sorting, sum(total_sales) total 
				FROM visits 
				WHERE date = '${today}' 
			UNION (
				SELECT '2' sorting, sum(v.total_sales) 
				FROM visits v 
				WHERE EXTRACT(MONTH FROM v.date) = ${thisMonth} )
			ORDER BY sorting`
		};

		this.http.post<any>(`${environment.baseURL}api/run/sql`, qry)
			.subscribe( 
				data => { 
					this.total_sales_today = data.rows[0].total ;
					this.total_sales_this_month = data.rows[1].total ;
					
					this.today_percent = (this.total_sales_today / this.loginService.user.daily_target)*100;
					this.this_month_percent = (this.total_sales_this_month / this.loginService.user.monthly_target)*100;
					
				},
				err => { err => this.util.handleError(err); }
			);
	
	}

}//end class


	/**
	 * https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJfa9rNjDXwxURfxUowpprIgw&key=${apikey} 
	 * https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=21.6260546,39.183241&radius=100&type=restaurant&keyword=cruise&key=${apikey}
	 */
	// let apikey = 'AIzaSyDARHqG2jf9A3qSKg45UbVS8uqJWNSl8sU';
	// let placeID = 'ChIJfa9rNjDXwxURfxUowpprIgw';
	// this.http.get<any>(
	// 	`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=21.6260546,39.183241&radius=100&type=atm&key=${apikey}`,
	// 	{ responseType: "json"}
	// 	).subscribe( 
	// 	result => console.log(result),
	// 	err => console.error(err),
	// 	() => console.log('Completed !!')
	// );
