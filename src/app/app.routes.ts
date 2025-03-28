import {RouterModule, Routes} from '@angular/router';
import {LoginChildrenComponent} from './component/login-children/login-children.component';
import {LoginEmployeeComponent} from './component/login-employee/login-employee.component';
import {NgModule} from '@angular/core';
import {UserListComponent} from './component/user-list/user-list.component';

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
  {
    path: 'user-list',
    component: UserListComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
