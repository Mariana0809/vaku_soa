import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-auth-google',
  imports: [],
  templateUrl: './auth-google.component.html',
  styleUrl: './auth-google.component.css'
})
export class AuthGoogleComponent {

  constructor(private authService: AuthService, private router: Router) {}
// Iniciar sesión con Google
  loginGoogle() {
    this.authService.loginWithGoogle().then(cred => {
      console.log("Google login exitoso", cred);
        this.router.navigate(['/home']);
    }).catch(err => {
      console.error("Error en login con Google:", err);
    });
  }
}
