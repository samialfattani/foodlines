import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { User, Permission } from './user';
import { LoginService } from '../login-form/login.service';
import { UtilService } from '../services/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
	styles: []
})
export class UsersComponent implements OnInit {

	@ViewChild('ShowPermissions') ShowPermissions: TemplateRef<any>;
	@ViewChild('UpdatePermissions') UpdatePermissions: TemplateRef<any>;
	public title = "List of Users";
	public users:User[];
	public search = '';
	public selected:User;
	public getAllPermissions = User.getAllPermissions;
	public Permission = Permission;

	private backupUsers:User[];
	
	constructor(
		private util: UtilService,
		public userService :UsersService,
		public loginService: LoginService,
		private toast: ToastrService) 
	{
		this.bringData();
		this.backupUsers  = Object.assign([], this.users);
		
	}

	ngOnInit() {  }
	
	bringData()
	{
		//for mocking: replace with this.users = USERS 

		this.userService.getUsers().subscribe( 
			data => {
				this.users = data.map( u => new User( u )  );
			}, 
				err => this.util.handleError(err)
		);
	}

	/** search in all peroperties of the whole list (case-insensitive) */
	searchNow(){
		//clone before filter, so that it will be reset after every new filter.
		this.users  = Object.assign([], this.backupUsers);
		this.users = 	this.users.filter(usr => {
			let props = Object.getOwnPropertyNames( new User({}) );
			var regex = new RegExp(`${this.search}`, 'i');
			for(let p of props)
			{
				if( regex.test( usr[p]) )
					return true;
			}
			return false;
		});
	}
	
	getTemplate(usr){
		if(this.selected && this.selected.name == usr.name)
			return  this.UpdatePermissions;
		else
			 return this.ShowPermissions;
	}

	edit_click(usr:User)
	{
			this.selected = usr;
	}

	savePermissions(n){
		let rawObject = this.util.toJsonAfterWrappingSetterAndGetter(this.selected);
		this.userService.updateUser(rawObject)
				.subscribe( 
					usr => {
						this.toast.success(`${this.selected.name} has been updated`, 'Updated')
						this.bringData();
						this.selected = null; //close edit form if it is opened
					},
					err => this.util.handleError(err)
				);
	}

	public selectedPermissions: number[]=[] ;
	allowSelected()
	{
		this.selectedPermissions.forEach (p => {
			this.selected.addPermission(p);
		});
	}

	rejectSelected()
	{
		this.selectedPermissions.forEach (p => {
			this.selected.deletePermission(p);
		});
	}

}//end class
