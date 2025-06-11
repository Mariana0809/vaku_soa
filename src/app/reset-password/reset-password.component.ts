import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { confirmPasswordReset } from 'firebase/auth';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  oobCode: string = ''; // Firebase token enviado en el enlace

  constructor(private route: ActivatedRoute, private auth: Auth) {
    this.route.queryParams.subscribe(params => {
      this.oobCode = params['oobCode'];
    });
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    confirmPasswordReset(this.auth, this.oobCode, this.newPassword)
      .then(() => {
        alert('Contraseña restablecida exitosamente');
        // Redirigir al login
      })
      .catch((error) => {
        console.error('Error al restablecer:', error);
        alert('Error al restablecer la contraseña');
      });
  }
}