import { Component } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { UserServiceService } from './user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: any[];
  Msg;
  constructor(public user: UserServiceService,
    private db: AngularFireDatabase) {

     this.db.list(`/log`).valueChanges()
     .subscribe(log => {
       this.items = log;
     });
  }
  sendMsg() {
    this.user.chatSend(this.Msg);
    this.Msg = '';
  }
}
