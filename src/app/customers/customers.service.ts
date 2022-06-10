import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { CUSTOMERS } from '../mock/customers';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

/** this is responsible to bring the data from 
 * database using http request
 * 
 * currently we will use mock.
 */

@Injectable()
export class CustomerService 
{

	title = 'List of Users';
	
	//TODO: replace with http requst;
	
	
	constructor(private http: HttpClient) { }

	
	getCustomers(): Observable<Customer[]>{
		return this.http
							.get<Customer[]>(`${environment.baseURL}api/customers`);
	}

	insertCustomer(cus: Customer): Observable<Customer> {
		return this.http
						.post<Customer>(`${environment.baseURL}api/customers`, cus);
	}

	updateCustomer(cus: Customer) {
		return this.http
						.put(`${environment.baseURL}api/customers/` + cus.id, cus);
	}

	deleteCustomer(cus: Customer) {
		return this.http
						.delete(`${environment.baseURL}api/customers/` + cus.id);
	}

}
