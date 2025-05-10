import {RouterModule, Routes} from '@angular/router';
import {LoginEmployeeComponent} from './component/login-employee/login-employee.component';
import {NgModule} from '@angular/core';
import { HomeComponent } from './component/home/home.component';
import { CreateUserComponent } from './component/create-user/create-user.component';

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
      { path: '', redirectTo: 'list-user', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
