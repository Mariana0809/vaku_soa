import { Component } from '@angular/core';

import {Router} from '@angular/router';

import { FormsModule } from '@angular/forms';
import { Credenciales } from './credencialesEmployee';
import { LoginEmployeeService } from '../../login-employee.service';


@Component({
  selector: 'app-login-employee',
  imports: [FormsModule],
  templateUrl: './login-employee.component.html',
  styleUrl: './login-employee.component.css',
})
export class LoginEmployeeComponent {
  credenciales: Credenciales = new Credenciales();

  constructor(private router: Router) {}

  navigateToLoginchildren() {
    this.router.navigate(['/login-children']);
  }

  constructor(private loginEmployeeService: LoginEmployeeService) {}

  onSubmit() {
    console.log("Se hizo clic en el botón de login");
    this.logeearse();
  }
  

  logeearse() {
    console.log('Botón presionado');
    this.loginEmployeeService.login(this.credenciales).subscribe({
      next: (datos) => {
        console.log('Respuesta completa del backend:', datos);
      },
      error: (error: any) => {
        console.log('Error en la petición:', error);
      },
    });
  }  
}
