import { Component } from '@angular/core';
import { LoginService } from './login-form/login.service';
import { Permission } from './users/user';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
	title = 'Sami Application';
	Permission = Permission;
	routedUser:string = '';
	apikey: string = '';
	
	constructor(
		public loginService:LoginService,
		private rout: ActivatedRoute)
	{
		rout.paramMap.subscribe (p => this.routedUser = p.get('') );

		this.title = 'my Appko';
		//this.apikey = process.env.MYAPIKEY;
		loginService.loginNowAndNavigateToDashboard({name:'admin', pw:'admin'});
	}
}
