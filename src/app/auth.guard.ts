import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login-form/login.service';

@Injectable()
export class AuthGuard implements CanActivate 
{
	constructor(private login: LoginService){ }

  canActivate(
    next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
	{
    return this.login.isUserLoggedIn;
  }
}
