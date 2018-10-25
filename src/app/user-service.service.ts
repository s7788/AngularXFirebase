import { Injectable } from '@angular/core';

import { of as observaleOf, from } from 'rxjs';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { ILog } from './Log';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  items: ILog[];
  name;
  Logs: AngularFireList<ILog[]>;
  uid = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
        return null;
      } else {
        return authState.uid;
      }
    }),
  );
  isAdmin = observaleOf(true);
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {

    this.db.list(`/log`).valueChanges()
      .subscribe(log => {
        this.items = log;
      });

    this.afAuth.authState.subscribe(_auth => {
      if (_auth) {
        this.name = _auth.displayName;
        console.log('已登入');
      }
    });
  }
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
    this.name = undefined;
    console.log('log success');
  }
  chatSend(Msg: string) {

    this.db.list('log').push({
      Message: Msg,
      Name: this.name
    });
    /*
      const Ref = this.db.database.ref().child('log');
      Ref.push({
        Message: Msg,
        Name: this.name
      });*/
  }
  signOut() {
    this.afAuth.auth.signOut();
  }
}
