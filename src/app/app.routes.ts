import {RouterModule, Routes} from '@angular/router';
import {LoginEmployeeComponent} from './component/login-employee/login-employee.component';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: LoginEmployeeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
