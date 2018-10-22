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
  constructor(public user: UserServiceService) {
    /*
    db.list('/item').valueChanges()
    .subscribe(item => {
      this.items = item;
      console.log(this.items);
    });
      */
  }
  title = 'AngularXFirebase';
}
