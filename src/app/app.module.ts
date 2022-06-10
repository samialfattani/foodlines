import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//toastr
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginService } from './login-form/login.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users/users.service';
import { ProfileComponent } from './profile/profile.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerService } from './customers/customers.service';
import { UtilService } from './services/util.service';
import { ItemsComponent } from './items/items.component';
import { SettingComponent } from './setting/setting.component';
import { VisitsComponent } from './visits/visits.component';
import { SqlComponent } from './sql/sql.component';
import { VisitDetailComponent } from './visits/visit-detail/visit-detail.component';
import { LineDetailComponent } from './visits/visit-detail/line-detail/line-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginFormComponent,
    DashboardComponent,
    NotFoundComponent,
    UsersComponent,
    ProfileComponent,
    CustomersComponent,
    ItemsComponent,
    SettingComponent,
    VisitsComponent,
    SqlComponent,
    VisitDetailComponent,
    LineDetailComponent,
  ],
  imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		
		CommonModule,
    BrowserAnimationsModule, // required animations module
		ToastrModule.forRoot(), // ToastrModule added
	],
  providers: [
		UsersService,
		LoginService,
		CustomerService,
		UtilService,
		AuthGuard
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
