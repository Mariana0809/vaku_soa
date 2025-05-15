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

  // Iniciar sesión con Google
  loginGoogle() {
    this.authService.loginWithGoogle().then(cred => {
      console.log("Google login exitoso", cred);
        this.router.navigate(['/home']);
    }).catch(err => {
      console.error("Error en login con Google:", err);
    });
  }
  // Iniciar sesión con GitHub
  loginGithub() {
    this.authService.loginWithGithub().then(cred => {
      console.log("GitHub login exitoso", cred);
        this.router.navigate(['/home']);
    }).catch(err => {
      console.error("Error en login con GitHub:", err);
    });
  }
  // Iniciar sesión con Facebook
  loginFacebook() {
    this.authService.loginWithFacebook().then(cred => {
      console.log("Facebook login exitoso", cred);
      this.router.navigate(['/home']);
    }).catch(err => {
      console.error("Error en login con Facebook:", err);
    });
  }
  resetearContrasena(email: string) {
  this.authService.resetPassword(email).then(() => {
    alert('Se ha enviado un correo para restablecer tu contraseña.');
  }).catch(error => {
    console.error('Error al enviar correo de restablecimiento:', error);
    alert('No se pudo enviar el correo. Asegúrate de que el correo esté registrado.');
  });
}
}
