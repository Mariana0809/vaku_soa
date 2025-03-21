import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-employee',
  imports: [],
  templateUrl: './login-employee.component.html',
  styleUrl: './login-employee.component.css'
})
export class LoginEmployeeComponent {

  constructor(private router: Router) {}

  navigateToLoginchildren() {
    this.router.navigate(['/login-children']);
  }
}
