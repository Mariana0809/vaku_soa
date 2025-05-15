import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-auth-github',
  imports: [],
  templateUrl: './auth-github.component.html',
  styleUrl: './auth-github.component.css'
})
export class AuthGithubComponent {
  
 constructor(private authService: AuthService, private router: Router) {}
    // Iniciar sesión con GitHub
 loginGithub() {
    this.authService.loginWithGithub().then(cred => {
      console.log("GitHub login exitoso", cred);
        this.router.navigate(['/home']);
    }).catch(err => {
      console.error("Error en login con GitHub:", err);
    });
  }
}
