import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Credenciales } from './credencialesEmployee';
import { LoginEmployeeService } from '../../login-employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-employee',
  imports: [FormsModule],
  templateUrl: './login-employee.component.html',
  styleUrl: './login-employee.component.css',
})
export class LoginEmployeeComponent {
  credenciales: Credenciales = new Credenciales();

  constructor(private loginEmployeeService: LoginEmployeeService, private router: Router) {}


  logeearse() {
    this.loginEmployeeService.login(this.credenciales).subscribe({
      next: (dato) => {
        console.log('Respuesta completa del backend:', dato);
        localStorage.setItem('token',dato.token);
        this.router.navigate(['/user-list']);
      },
      error: (error: any) => {
        console.log('Error en la petición:', error);
      },
    });
  }

  navigateToLoginchildren() {
    this.router.navigate(['/login-children']);
  }
}
