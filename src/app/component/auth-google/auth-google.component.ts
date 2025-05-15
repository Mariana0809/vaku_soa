import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GoogleAuthProvider } from 'firebase/auth';
import { SocialLoginService } from '../../services/social-login.service';

@Component({
  selector: 'app-auth-google',
  standalone: true,
  imports: [],
  templateUrl: './auth-google.component.html',
  styleUrl: './auth-google.component.css'
})
export class AuthGoogleComponent {
  constructor(private socialLoginService: SocialLoginService) {}

  async loginWithGoogle() {
    await this.socialLoginService.loginSocial(new GoogleAuthProvider());
  }
}