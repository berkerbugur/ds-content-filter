import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {DbStoreService} from './shared/db-store.service';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /*loadedFeature = 'recipe';*/

  ngOnInit () {
    firebase.initializeApp({
      apiKey: "AIzaSyC61XvAOAMJLGrs5tvjf-QWoPf-2cZ5U78",
      authDomain: "rcpbook-be9bb.firebaseapp.com"
    });
  }

/*  onNavigate(sectionName: string) {
    this.loadedFeature = sectionName;
  }*/
}
