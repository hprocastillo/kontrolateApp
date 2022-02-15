import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import firebase from "firebase/app";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User | null>;
  today = new Date();

  constructor(public afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  async loginGoogle() {
    try {
      await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log(error);
    }
  }

  // async loginGoogle() {
  //   try {
  //     await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  //       .then(() => {
  //         const user = firebase.auth().currentUser;
  //         let userRef = firebase.firestore().collection('users').doc(user?.uid);
  //         userRef.set({
  //           id: user?.uid,
  //           displayName: user?.displayName,
  //           email: user?.email,
  //           photoUrl: user?.photoURL,
  //           createdBy: user?.uid,
  //           createdAt: this.today,
  //         }).then(function () {
  //         })
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
}
