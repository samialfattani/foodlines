import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
//import { clone } from 'clone';
import clone = require('clone');
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UtilService 
{

	public dateFormat: string = 'dd-MM-yyyy'
	public ICON_MARKER: string = ` `

	constructor(private toast: ToastrService) 
	{ 	}

	isMail(text){
		return /^\w([\w%+-]*\.?)*@([\w-]+\.){1,60}[a-zA-Z]+/.test(text);
	}
	
	isDate(d: Date):boolean {
		if ( Object.prototype.toString.call(d) === "[object Date]" )
			return true
		else
			return false;
	}

	handleInserted(rec: string)
	{
		this.toast.success(
			`<b>${rec}</b> has been inserted successfully ` , 
			'Inserted !',
			{ enableHtml	: true });
	}

	handleUpdated(dbAnswer, recName) 
	{
		if(dbAnswer.updated[0] == 0)
			this.toast.error(`Database respond but nothing was updated.` , "Didn't Updated");
		else
			this.toast.success(`<b>${recName}<b> has been updated successfully ` , 'Updated', { enableHtml	: true });
	}

	handleDeleted(dbAnswer)
	{
		if(dbAnswer.deleted == 0)
			this.toast.error(`Database respond but nothing was Deleted` , "Didn't Deleted");
		else
			this.toast.warning(`${dbAnswer.deleted} records has been Deleted` , 'Deleted');
	}
	
	handleError(err: HttpErrorResponse | any, submittedObject?: any)
	{
		if(submittedObject)
			console.log(submittedObject);

		console.log(err);
		if(err.status == 0 )
			this.toast.error(` Server is not responding at all `, 'Server Error');
		else if(err.status >= 400 && err.status <= 499 ){
			if(err.error.original){
				this.toast.error(
					`${this.getRepresentableMsg(err)}`, 'Databse Error',
					{ enableHtml	: true });
			}
			else if (err.error.errors)
			{
				this.toast.error(
					`<ul>${err.error.errors.map( e => '<li>'+e.message+'</li>').join('')}</ul>`, 
					'Sequelize Error', { enableHtml	: true });					
			}else{
				this.toast.error(
					`${err.error.errmsg}`, 'User Mistake', { enableHtml	: true });
			}
	}
		else
		{
			// console.log(err);
			this.toast.error(
						`${err.error.errmsg}`, 
						'Server Error',
						{ enableHtml	: true });
		}

	}//handle

	getRepresentableMsg(err)
	{
			
		let res = '';
		switch(err.error.original.code){
			case 11000:
				//E11000 duplicate key error index: samidb.customers.$name_1 dup key: { : "ss" }
				let found = /dup key: {.*?"(.*?)".*}/.exec(err.error.errmsg);

				res += `the <b>${found[1]}</b> is already exists in the database, plaese put another value.`;
			break;
			case "23502":
				res += `the <b>'${err.error.original.column}'</b> has missing data.`;
			break;
			case "23503":
				res += `${err.error.original.detail}`;
			break;
			case "23505":
				let errList = `<ul>${err.error.errors.map( e => '<li>' + e.message + '</li>').join('')}</ul>`;
				res += `<b>${errList}</b>`;
			break;
			default:
				res = err.error.errmsg? err.error.errmsg : err.error;
				console.log(err);
			break;
		}
		return res;
	}
	/**
	 * this function returns the same passed object after turning any setter and 
	 * getter functions into normal property.
	 * notice that setter and getter MUST use a private field having the SAME name and 
	 * starting with under score "_", like this:-
	 * {
	 * 		_permissions: Set([1,2,3]);
	 * 		get permissions(){...}
	 * 		set permissions(o: number[]){...}
	 * }
	 * 
	 * it will be converted into :
	 * {
	 * 		permissions: [1,2,3]
	 * }
	 * @param obj any object from a Typescript class contains Setter/Getter property.
	 */
	toJsonAfterWrappingSetterAndGetter(x:any):any
	{
		
		let obj = clone(x);
		//let obj = Object.assign({}, x);
		//let obj = Object.create( x );

		// let _property = property
		Object.keys(obj).filter(key => key[0] === "_").forEach(key => {		
			obj[key] = obj[key.substring(1)];
			delete obj[key.substring(1)]
		});

		let json = JSON.stringify(obj);

		//remove the underscore _ from all keys.
		Object.keys(obj).filter(key => key[0] === "_").forEach(key => 
		{
			json = json.replace(key, key.substring(1));
		});

		return JSON.parse(json);
	}

	addExtraRowAfterThis(row: HTMLTableRowElement): HTMLTableRowElement
	{
		let table = <HTMLTableElement> row.offsetParent;
		let newrow = table.insertRow( row.rowIndex + 1  );
		newrow.setAttribute('class', 'Extra');
		return newrow;
	}
	
	removeExtraElements() 
	{
		
		let els = document.getElementsByClassName('Extra');
		for (let i=0; i<els.length ; i++) {
			els[i].parentNode.removeChild(els[i]);
		}
	}

}//end class


