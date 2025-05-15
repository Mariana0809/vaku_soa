import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  linkWithPopup,
  fetchSignInMethodsForEmail,
  User,
  AuthProvider,
} from '@angular/fire/auth';
import { signOut } from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth) {}

  loginWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  async linkProvider(user: User, provider: AuthProvider) {
    return linkWithPopup(user, provider);
  }

  async loginWithProvider(provider: AuthProvider) {
    if (this.auth.currentUser) {
      try {
        const result = await linkWithPopup(this.auth.currentUser, provider);
        return result;
      } catch (error: any) {
        if (error.code === 'auth/credential-already-in-use') {
          // Ya el credential está en uso, retornamos el usuario actual para evitar error
          return this.auth.currentUser;
        }
        throw error;
      }
    } else {
      try {
        const result = await signInWithPopup(this.auth, provider);
        return result;
      } catch (error: any) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          const email = error.customData.email;
          const pendingCred = error.credential;
          const methods = await fetchSignInMethodsForEmail(this.auth, email);

          // Intentar login con el primer método registrado para ese email
          if (methods.length > 0) {
            const firstMethod = methods[0];
            let userCredential;

            if (firstMethod === 'password') {
              // Aquí se debe pedir la contraseña para login
              // Pero como no hay UI en servicio, lanzamos error con info para manejar en componente
              const customError: any = new Error(
                'Ingresa la contraseña para el correo ' + email
              );
              customError.email = email;
              customError.pendingCred = pendingCred;
              customError.methods = methods;
              customError.provider = provider;
              throw customError;
            } else {
              // Login con proveedor social (Google, Facebook, Github)
              let providerToUse: AuthProvider;
              switch (firstMethod) {
                case 'google.com':
                  providerToUse = new GoogleAuthProvider();
                  break;
                case 'facebook.com':
                  providerToUse = new FacebookAuthProvider();
                  break;
                case 'github.com':
                  providerToUse = new GithubAuthProvider();
                  break;
                default:
                  throw new Error('Método no soportado: ' + firstMethod);
              }
              // Login con el proveedor original
              userCredential = await signInWithPopup(this.auth, providerToUse);

              // Opcional: vincular el nuevo proveedor
              if (pendingCred) {
                await linkWithPopup(userCredential.user, provider);
              }

              return userCredential;
            }
          } else {
            throw new Error('No se encontraron métodos para el correo ' + email);
          }
        }
        throw error;
      }
    }
  }

  loginWithGoogle() {
    return this.loginWithProvider(new GoogleAuthProvider());
  }

  loginWithFacebook() {
    return this.loginWithProvider(new FacebookAuthProvider());
  }

  loginWithGithub() {
    return this.loginWithProvider(new GithubAuthProvider());
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
}
