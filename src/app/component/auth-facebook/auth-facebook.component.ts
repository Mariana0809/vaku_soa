import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FacebookAuthProvider } from 'firebase/auth';
import { SocialLoginService } from '../../services/social-login.service';

@Component({
  selector: 'app-auth-facebook',
  standalone: true,
  imports: [],
  templateUrl: './auth-facebook.component.html',
  styleUrl: './auth-facebook.component.css',
})
export class AuthFacebookComponent {
  constructor(private socialLoginService: SocialLoginService) {}

  async loginWithGoogle() {
    await this.socialLoginService.loginSocial(new FacebookAuthProvider());
  }
}