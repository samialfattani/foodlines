import { Injectable } from '@angular/core';
import { UsersService } from '../users/users.service';
import { User, Permission } from '../users/user';
import { UtilService } from '../services/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { USERS } from '../mock/users';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService 
{

	public isUserLoggedIn:boolean = false;
	public user:User; 
	private Permission = Permission;
	private routedUser: string = 'f';

	constructor(
		private router:Router,
		private usersService:UsersService,
		private util: UtilService,
		private http:HttpClient,
		private rout: ActivatedRoute
	)
	{
	}

	loginNowAndNavigateToDashboard(usrNameAndPass)
	{
		this.http.post<User>(`${environment.baseURL}api/users/qry/login`, usrNameAndPass)
		.subscribe( 
			u => {
				this.user =  new User( u );
				this.isUserLoggedIn=true;
				//this.router.navigate(['dashboard']);
				this.router.navigate([`/users/${u.name}/visits/2`]);
			},
			err => {
				this.isUserLoggedIn=false;
				this.user = null;
				this.util.handleError(err);
			}
		);
	}
	

	checkUserPermission(p:Permission, routedUser?: string)
	{
		//console.log(this.routedUser);
		if(this.user == undefined || !p || this.user == null)
			return false;
		else if(routedUser){

			return this.user.isHasPermission(p) &&
						 routedUser == this.user.name;
		}else
			return this.user.isHasPermission(p);
	}


}//end class
