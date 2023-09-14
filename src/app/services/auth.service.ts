import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from '../services/user';
import { LoginData } from '../interfaces/login-data.interface';
import { RegisterData } from '../interfaces/register-data.interface';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userData: any;
  now = new Date();
  isLogin = false;    

  constructor(private auth: Auth,
              public afAuth: AngularFireAuth,
              public afs: AngularFirestore
    ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);        
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  register({ email, user, password }: RegisterData) {
    console.log(email, user, password);
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(credential => {
      credential.user?.updateProfile({
        displayName: user,
     })
      this.SetUserData(credential.user);
    })
  }

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password)
    .then((result) => {      
      this.SetUserData(result.user);
      this.isLogin = true;
      localStorage.setItem('STATE', 'true');
      return of({ success: this.isLogin });
    })
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
    .then((result) => {
      this.SetUserData(result.user);
      this.isLogin = true;
      localStorage.setItem('STATE', 'true');
      return of({ success: this.isLogin });
    })
  }

  logout() {
    return signOut(this.auth)
    .then((result) => {
      localStorage.removeItem('user');
      this.isLogin = false;
      localStorage.setItem('STATE', 'false');
      return of({ success: this.isLogin });
    })
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users-registry/${user.uid}`
    );

    const userLog: AngularFirestoreDocument<any> = this.afs.doc(
      `users-log/${this.now}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };

    const userDataLog: any = {
      displayName: user.displayName,
      email: user.email,
      loginDate : this.now.toLocaleString()
    };

    userLog.set(userDataLog, {
      merge: false,
    });
    
    return userRef.set(userData, {
      merge: true,
    });
  }

  getAuth() {
    return this.afAuth.authState;
  }

  SetScore(game: any, score: any) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `scores/${this.now + '-' + this.userData.displayName}`
    );

    const userScore: any = {
      game: game,
      score: score,
      date: this.now.toLocaleString(),
      user: this.userData.displayName
    };

    userRef.set(userScore, {
      merge: false,
    });
  }
}