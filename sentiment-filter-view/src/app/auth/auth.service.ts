import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class AuthService {
  token: string;

  constructor(private route: Router) {}

  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      response => {
        this.route.navigate(['/signIn']);
      }
    ).catch(
      error => console.log(error)
    );
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      response => {
        console.log(response);
        this.route.navigate(['/recipes']);
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => this.token = token
          );
      }
    )
      .catch(
      error => console.log(error)
      );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => this.token = token
  );
    return this.token;
  }

  isAuth() {
    return this.token != null;
  }

  onLogOut() {
    firebase.auth().signOut();
    this.token = null;
    this.route.navigate(['/signIn']);
  }

}
