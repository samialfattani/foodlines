import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, Permission } from '../users/user';
import { UsersService } from '../users/users.service';
import { UtilService } from '../services/util.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login-form/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit 
{
	user = new User({});
	Permission  = Permission;
	routedUser:string = '';

	constructor(private rout:ActivatedRoute,
							private usersService: UsersService,
							private util:UtilService,
							public loginService: LoginService,
							private toast: ToastrService,
							private http:HttpClient) 
	{ 
		this.bringData();
	}//end constructor

	ngOnInit(){ }

	getPermissions(){
		return this.user.permissions.map(p => Permission[p]).sort();
	}

	bringData()
	{
		this.routedUser = this.rout.snapshot.params['name'];

		this.usersService.getAUser(this.routedUser)
			.subscribe( 						
				u => this.user = new User(u) ,
				err => this.util.handleError(err)
		);

	}//end bringData()
	
	SubmitForChangingPass(frm: NgForm)
	{
		if(frm.value.pw == this.user.pw){
			this.usersService.updateUser({name: this.user.name, pw: frm.value.newPass1})
				.subscribe(
					usr =>{
						this.bringData();
						this.toast.success('Password has been updated to the new one, NO need to login again', 'Password is Changed');
					},
					err => this.util.handleError(err)
				);
		}else{
			this.toast.error('Current Password is Wrong', 'Error')
		}
	}
}//end class
