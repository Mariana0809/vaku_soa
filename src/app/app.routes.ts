import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginChildrenComponent} from './component/login-children/login-children.component';
import {LoginEmployeeComponent} from './component/login-employee/login-employee.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginChildrenComponent
  },
  {
    path: 'login-children',
    component: LoginChildrenComponent
  },
  {
    path: 'login-employee',
    component: LoginEmployeeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
