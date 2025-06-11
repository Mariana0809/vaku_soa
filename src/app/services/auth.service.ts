import { inject, Injectable } from '@angular/core';
import { Auth, UserCredential } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private auth: Auth) {}

  async loginWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  const result = await signInWithPopup(this.auth, provider);
  return result;
}

  async loginWithFacebook(): Promise<UserCredential> {
    const provider = new FacebookAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  async loginWithGithub(): Promise<UserCredential> {
    const provider = new GithubAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  async loginWithEmail(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async resetPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(this.auth, email);
  }
}