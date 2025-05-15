import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SocialLoginService {
  constructor(private authService: AuthService, private router: Router) {}

  async loginSocial(provider: any) {
    try {
      const cred = await this.authService.loginWithProvider(provider);
      console.log('Login exitoso con proveedor', cred);
      this.router.navigate(['/home']);
    } catch (error: any) {
      if (error.email && error.pendingCred && error.methods && error.provider) {
        if (error.methods.includes('password')) {
          const password = prompt(
            `Ya existe una cuenta con el correo ${error.email}. Ingresa la contraseña para continuar:`
          );
          if (!password) {
            alert('Debes ingresar la contraseña para continuar.');
            return;
          }

          this.authService
            .loginWithEmail(error.email, password)
            .then((userCred) => {
              return this.authService.linkProvider(
                userCred.user,
                error.provider
              );
            })
            .then(() => {
              alert('Proveedor vinculado exitosamente.');
              this.router.navigate(['/home']);
            })
            .catch((linkError) => {
              alert('Error al vincular proveedor: ' + linkError.message);
            });
        } else {
          alert(error.message);
        }
      } else {
        alert(error.message || 'Error en login con proveedor');
        console.error(error);
      }
    }
  }
}
