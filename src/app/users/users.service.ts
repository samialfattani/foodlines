import { Injectable } from '@angular/core';
import { User } from './user';
import { USERS } from '../mock/users';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

/** this is responsible to bring the data from 
 * database using http request
 * 
 * currently we will use mock.
 */

@Injectable()
export class UsersService 
{

	title = 'List of Users';
	
	constructor(private http:HttpClient) { }

	getUsers():Observable<Object[]> {
		//{'Content-Type':  'application/json'}
		return this.http
				.get<Object[]>(`${environment.baseURL}api/users`);
	}

	getAUser(name):Observable<Object>
	{
		return this.http
					 .get(`${environment.baseURL}api/users/` + name );
	}

	insertUser(us: User)
	{
		const headers = new HttpHeaders({
				'Content-Type':  'application/json',
				//'Authorization': 'my-auth-token'
		});
		
		return this.http
				.post<User>(`${environment.baseURL}api/users/`, us, {headers: headers});

	}//end Insertuser

	updateUser(u)
	{
		return this.http
			.put(`${environment.baseURL}api/users/` + u.name, u);
	}

	
}//end class
