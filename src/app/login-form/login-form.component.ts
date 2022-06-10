import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LoginService } from '../login-form/login.service';
import { User } from '../users/user';
import { UsersService } from '../users/users.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit 
{
	public activeForm = 'login';
	public isLogin(){ return this.activeForm == 'login'}
	public isRegister(){ return this.activeForm == 'register'}
	public WrongAuthintication:boolean = false;

	constructor(public loginService:LoginService,
							private userService: UsersService,
							private toastr: ToastrService,
							private util: UtilService)
	{	}

  ngOnInit(){	}

	loginUser(frm: NgForm)
	{
		this.loginService.loginNowAndNavigateToDashboard(frm.value);

		this.WrongAuthintication = !this.loginService.isUserLoggedIn;

	}//end loginUser
	
	RegisterUser(form: NgForm)
	{
		event.preventDefault();
		
		let us:User = form.value;
		us.permissions = User.getSimpleRole();

		this.userService.insertUser(us).subscribe( 
			savedUser => {
				this.toastr.success(`${savedUser.name} Added Succefully`, 'OK');
			},
			err => this.util.handleError(err)
		);

	}
	
	}//end class
