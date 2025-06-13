import {RouterModule, Routes} from '@angular/router';
import { LoginEmployeeComponent } from './login-employee/login-employee.component';
import { HomeComponent } from './home/home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccessHistoryComponent } from './access-history/access-history.component';


export const routes: Routes = [
  {
    path: '',
    component: LoginEmployeeComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'create-user', component: CreateUserComponent },
      { path: 'list-user', component: ListUserComponent },
      { path: 'access-history', component: AccessHistoryComponent },
      { path: '', redirectTo: 'list-user', pathMatch: 'full'}
    ]
  },
  { path: 'reset-password', component: ResetPasswordComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
