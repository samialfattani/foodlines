import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class SettingService {

	constructor(
		private http: HttpClient) { }


	getCategories() {
		return this.http
			.get<any[]>(`${environment.baseURL}api/categories`);
	}

	getCategoriesByType(t): Observable<any[]> {
		return this.http
			.get<any[]>(`${environment.baseURL}api/categories/type/` + t);
	}

	insertCategory(cat):Observable<any> {
		return this.http
			.post(`${environment.baseURL}api/categories`, cat)
	}

	deleteCategory(cat) 
	{
		return this.http
			.delete(`${environment.baseURL}api/categories/` + cat.id);
	}
}//end class
