import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GithubAuthProvider } from 'firebase/auth';
import { SocialLoginService } from '../../services/social-login.service';

@Component({
  selector: 'app-auth-github',
  standalone: true,
  imports: [],
  templateUrl: './auth-github.component.html',
  styleUrl: './auth-github.component.css',
})
export class AuthGithubComponent {
  constructor(private socialLoginService: SocialLoginService) {}

  async loginWithGithub() {
    await this.socialLoginService.loginSocial(new GithubAuthProvider());
  }
}