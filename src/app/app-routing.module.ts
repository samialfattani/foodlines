import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { CustomersComponent } from './customers/customers.component';
import { ItemsComponent } from './items/items.component';
import { SettingComponent } from './setting/setting.component';
import { VisitsComponent } from './visits/visits.component';
import { SqlComponent } from './sql/sql.component';
import { VisitDetailComponent } from './visits/visit-detail/visit-detail.component';
import { environment } from '../environments/environment.prod';
import { LineDetailComponent } from './visits/visit-detail/line-detail/line-detail.component';


export const allRoutes: Routes  = [
	{path: 'login', component: LoginFormComponent},
	{path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], pathMatch:'prefix',
			children:[]
	},
	
	{path: 'users/:name', component:ProfileComponent, pathMatch:'full'},	
	{path: 'users', component: UsersComponent, canActivate: [AuthGuard] }, //, pathMatch:'full'	
	{path: 'users/:name/visits', component: VisitsComponent, canActivate: [AuthGuard] }, //, pathMatch:'full'	
	{path: 'users/:name/visits/:id', component: VisitDetailComponent, canActivate: [AuthGuard] ,
		children:[
			{path: 'moves/qry/bybarcode/:barcode', component: LineDetailComponent, canActivate: [AuthGuard] } ,
			]
	}, 
	{path: 'customers', component:CustomersComponent},
	{path: 'items', component:ItemsComponent},
	{path: 'about', component: AboutComponent},	
	{path: 'setting', component: SettingComponent, canActivate: [AuthGuard]},	

	{path: 'sql', component: SqlComponent, canActivate: [AuthGuard] }, //, pathMatch:'full'	
	{path: 'api', redirectTo: `${environment.baseURL}api`, pathMatch: 'prefix'},
	{path: '', redirectTo: '/login', pathMatch: 'full'},
	{path: '**', component: NotFoundComponent}
]

@NgModule({
	imports: [ RouterModule.forRoot(allRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
