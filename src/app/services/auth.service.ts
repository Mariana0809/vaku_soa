import { inject, Injectable } from '@angular/core';
import { Auth, UserCredential } from '@angular/fire/auth';
import { Firestore, addDoc, collection, serverTimestamp } from '@angular/fire/firestore';
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private firestore = inject(Firestore);

  constructor(private auth: Auth) {}

  private async guardarHistorialAcceso(user: any, provider: string) {
    if (!user) return;
    try {
      const userData: any = {
        uid: user.uid || '',
        email: user.email ? user.email : 'No disponible',
        displayName: user.displayName ? user.displayName : 'No disponible',
        photoURL: user.photoURL || '',
        provider,
        fechaAcceso: serverTimestamp(),
      };
      await addDoc(collection(this.firestore, 'historial_de_acceso'), userData);
      console.log('[HISTORIAL] Acceso guardado:', userData);
    } catch (e: any) {
      console.error('[HISTORIAL] Error guardando acceso:', e);
      alert('[HISTORIAL] Error guardando acceso: ' + (e && e.message ? e.message : e));
    }
  }

  async loginWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  const result = await signInWithPopup(this.auth, provider);
  console.log('RESULT USER:', result.user);
  this.guardarHistorialAcceso(result.user, 'google');
  return result;
}

  async loginWithFacebook(): Promise<UserCredential> {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    this.guardarHistorialAcceso(result.user, 'facebook');
    return result;
  }

  async loginWithGithub(): Promise<UserCredential> {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    this.guardarHistorialAcceso(result.user, 'github');
    return result;
  }

  async loginWithEmail(email: string, password: string): Promise<UserCredential> {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    this.guardarHistorialAcceso(result.user, 'email');
    return result;
  }

  async resetPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(this.auth, email);
  }
}