import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth-facebook',
  imports: [],
  templateUrl: './auth-facebook.component.html',
  styleUrl: './auth-facebook.component.css'
})
export class AuthFacebookComponent {
  constructor(private authService: AuthService, private router: Router) {}
// Iniciar sesión con Facebook
  loginFacebook() {
    this.authService.loginWithFacebook().then(cred => {
      console.log("Facebook login exitoso", cred);
      this.router.navigate(['/home']);
    }).catch(err => {
      console.error("Error en login con Facebook:", err);
    });
  }
}
