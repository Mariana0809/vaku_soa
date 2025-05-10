import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-employee',
  imports: [FormsModule],
  templateUrl: './login-employee.component.html',
  styleUrl: './login-employee.component.css',
})
export class LoginEmployeeComponent {
  credenciales = { persEmail: '', persPassword: '' };

  constructor(private authService: AuthService, private router: Router) {}

  // Iniciar sesión con correo
  logeearse(email: string, password: string) {
    this.authService.loginWithEmail(email, password).then(cred => {
      console.log("Inicio con correo exitoso", cred);
      this.router.navigate(['/home']);
    }).catch(err => {
      console.error("Error en login con correo:", err);
    });
  }
}
