import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthFacebookComponent } from '../auth-facebook/auth-facebook.component';
import { AuthGithubComponent } from '../auth-github/auth-github.component';
import { AuthGoogleComponent } from '../auth-google/auth-google.component';
import { SocialLoginService } from '../../services/social-login.service';

@Component({
  selector: 'app-login-employee',
  standalone: true,
  imports: [
    FormsModule,
    AuthFacebookComponent,
    AuthGithubComponent,
    AuthGoogleComponent,
  ],
  templateUrl: './login-employee.component.html',
  styleUrl: './login-employee.component.css',
})
export class LoginEmployeeComponent {
  credenciales = { persEmail: '', persPassword: '' };

  constructor(private authService: AuthService, private router: Router, private socialLoginService: SocialLoginService) {}

  // Iniciar sesión con correo
  logeearse(email: string, password: string) {
    this.authService
      .loginWithEmail(email, password)
      .then((cred) => {
        console.log('Inicio con correo exitoso', cred);
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        console.error('Error en login con correo:', err);
      });
  }

  resetearContrasena(email: string) {
    this.authService
      .resetPassword(email)
      .then(() => {
        alert('Se ha enviado un correo para restablecer tu contraseña.');
      })
      .catch((error) => {
        console.error('Error al enviar correo de restablecimiento:', error);
        alert(
          'No se pudo enviar el correo. Asegúrate de que el correo esté registrado.'
        );
      });
  }
}
