import {RouterModule, Routes} from '@angular/router';
import {LoginEmployeeComponent} from './component/login-employee/login-employee.component';
import {NgModule} from '@angular/core';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginEmployeeComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
