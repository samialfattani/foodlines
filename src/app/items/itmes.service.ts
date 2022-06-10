import { Injectable } from '@angular/core';
import { ITEMS } from '../mock/items';
import { Item } from './item';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../services/util.service';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login-form/login.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ItmesService {
	
	constructor(
		private http: HttpClient,
		private util: UtilService,
		private loginService: LoginService)
	{	}

	getAllCategories(){
		//let qry = { distinct: "items", key: "category" };
		return this.http
				.get<any[]>(`${environment.baseURL}api/categories/type/item`);
	}
	
	/** get all items in the database */
	getItems() {
		return this.http
				.get<Item[]>(`${environment.baseURL}api/items`);
	}

	getAnItem(barcode) {
		return this.http
				.get<Item>(`${environment.baseURL}api/items/` + barcode);
	}

	getItemsByCategory(c):Observable<Item[]>
	{
		return this.http
			.get<Item[]>(`${environment.baseURL}api/items/category/` + c);
	}

	insertItem(itm: Item): Observable<Item> {
		return this.http
				.post<Item>(`${environment.baseURL}api/items/` , itm);
	}

	updateItem(itm: Item): any
	{
		return this.http
				.put<any>(`${environment.baseURL}api/items/` + itm.barcode, itm);
	}

	deleteItem(itm: Item): any
	{
		return this.http
				.delete<any>(`${environment.baseURL}api/items/` + itm.barcode);
	}

	//db.getCollection('items').distinct('category')
}//end class
